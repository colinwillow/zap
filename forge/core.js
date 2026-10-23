// FORGE CORE -- the character-profile engine: carry a library clip onto a body, then the layers on top.
// Used by forge.html (the app) and tools/forge.cjs (the command line, headless). No DOM in here.
// `bindPose` and `retargetW` are the GAME's own text, lifted verbatim between the SHIPPED markers by `node tools/forgesync.mjs
// --write` (and `npm run check` fails if they drift): a tool must run the shipped text, never a copy of the rule.
import * as THREE from 'three';

export const MHIPS = 'mixamorig_Hips';
export const RTW = { fps: 30, feet: 1 };

// SHIPPED:bindPose
function bindPose(bones, model) {
  const h = bones && bones[MHIPS];
  if (!h || !h.parent) return null;
  const rest = {};
  for (const n in bones) { const q = bones[n].quaternion; rest[n] = [q.x, q.y, q.z, q.w]; }
  // THE HIPS' PARENT's rotation, which is the frame BOTH its local rotation and its local
  // translation are expressed in -- see `mphBorrow`.
  // **COMPOSED UP TO THE MODEL, NOT TO THE SCENE.** `getWorldQuaternion` folds in whatever the
  // model happens to be parented to, and the two sides of this are not parented alike: zap's is
  // already under `rig.root`, whose yaw is written every frame, while a freshly cloned skin is
  // under nothing at all. Measuring the two in different frames is exactly the fault this delta
  // exists to remove, and it would have been silent -- today `rig.root` is at yaw 0 when this
  // runs and it is only true by accident of ordering.
  const pq = new THREE.Quaternion();
  for (let o = h.parent; o && o !== model; o = o.parent) pq.premultiply(o.quaternion);
  // m924: what `retargetW` needs -- each bone's PARENT bone, its rest local POSITION, and its rest WORLD rotation (composed up to
  // the model), in parent-first ORDER. Positions are in the rig's own units (the armature's scale sits above and cancels in ratios).
  const par = {}, pos = {}, wq = {}, order = Object.keys(bones).sort((a, b) => depth(bones[a]) - depth(bones[b]));
  function depth(o) { let d = 0; for (let x = o.parent; x && x.isBone; x = x.parent) d++; return d; }
  for (const n of order) { const b = bones[n]; par[n] = b.parent && b.parent.isBone && bones[b.parent.name] ? b.parent.name : null; pos[n] = b.position.clone();
    const top = new THREE.Quaternion(); if (!par[n]) for (let o = b.parent; o && o !== model; o = o.parent) top.premultiply(o.quaternion);
    wq[n] = (par[n] ? wq[par[n]].clone() : top).multiply(b.quaternion); }
  return { pq, t: h.position.clone(), rest, par, pos, wq, order };
}
// /SHIPPED:bindPose

// SHIPPED:retargetW
function retargetW(S, T, srcClips, bones) {
  if (!S || !T || !S.order || !T.order) return null;
  const Q = () => new THREE.Quaternion(), V = () => new THREE.Vector3();
  const has = n => !!T.wq[n] && !!bones[n];
  const top = (B, n) => B.wq[n].clone().multiply(Q().fromArray(B.rest[n]).invert());     // the rotation above a top bone
  const restP = B => { const P = {}; for (const n of B.order) { const p = B.pos[n].clone(); P[n] = B.par[n] ? p.applyQuaternion(B.wq[B.par[n]]).add(P[B.par[n]]) : p.applyQuaternion(top(B, n)); } return P; };
  const LEG = ['Left', 'Right'].map(sd => ({ up: 'mixamorig_' + sd + 'UpLeg', kn: 'mixamorig_' + sd + 'Leg', ft: 'mixamorig_' + sd + 'Foot' }));
  const legsOK = LEG.every(L => [L.up, L.kn, L.ft].every(n => S.wq[n] && has(n)));
  let hr = 1, lr = 1, Ls = new THREE.Vector3(1, 0, 0);
  if (legsOK) { const SP = restP(S), TP = restP(T);
    const hw = P => P[LEG[0].up].distanceTo(P[LEG[1].up]), ll = P => P[LEG[0].up].distanceTo(P[LEG[0].kn]) + P[LEG[0].kn].distanceTo(P[LEG[0].ft]);
    hr = hw(TP) / (hw(SP) || 1); lr = ll(TP) / (ll(SP) || 1); Ls = SP[LEG[0].up].clone().sub(SP[LEG[1].up]).normalize(); }
  const D0 = T.pq.clone().invert().multiply(S.pq), k0 = T.t.length() / (S.t.length() || 1);
  const topS = {}, topT = {}; for (const n of S.order) if (!S.par[n]) topS[n] = top(S, n); for (const n of T.order) if (!T.par[n]) topT[n] = top(T, n);
  const iS = {}; for (const n of S.order) iS[n] = S.wq[n].clone().invert();
  const restQS = {}, restQT = {}; for (const n of S.order) restQS[n] = Q().fromArray(S.rest[n]); for (const n of T.order) restQT[n] = Q().fromArray(T.rest[n]);
  const clips = {}; let shared = 0; for (const n of T.order) if (S.wq[n]) shared++;
  const t0 = performance.now();
  for (const nm in srcClips) {
    const c = srcClips[nm], tq = {}; let hp = null;
    for (const tr of c.tracks) { const dot = tr.name.lastIndexOf('.'), bn = tr.name.slice(0, dot), pr = tr.name.slice(dot + 1);
      if (!tr.times || !tr.times.length) continue;
      if (pr === 'quaternion' && S.wq[bn]) tq[bn] = tr.createInterpolant(); else if (pr === 'position' && bn === MHIPS) hp = tr.createInterpolant(); }
    const keyed = Object.keys(tq).filter(has);
    if (!keyed.length && !hp) continue;
    const feet = RTW.feet && legsOK && LEG.some(L => tq[L.up] || tq[L.kn]);
    const outN = new Set(keyed); if (feet) for (const L of LEG) for (const n of [L.up, L.kn, L.ft]) outN.add(n);
    const nf = Math.max(2, Math.round(c.duration * RTW.fps) + 1), times = new Float32Array(nf), oq = {}, op = hp && has(MHIPS) ? new Float32Array(nf * 3) : null;
    for (const n of outN) oq[n] = new Float32Array(nf * 4);
    const SW = {}, SP = {}, TW = {}, TL = {}, TP = {};
    for (let f = 0; f < nf; f++) {
      const t = Math.min(c.duration, f / RTW.fps); times[f] = t;
      for (const n of S.order) { const pn = S.par[n], q = tq[n] ? Q().fromArray(tq[n].evaluate(t)) : restQS[n];
        SW[n] = (pn ? SW[pn].clone() : topS[n].clone()).multiply(q);
        const lp = n === MHIPS && hp ? V().fromArray(hp.evaluate(t)) : S.pos[n].clone();
        SP[n] = pn ? lp.applyQuaternion(SW[pn]).add(SP[pn]) : lp.applyQuaternion(topS[n]); }
      let hl = T.pos[MHIPS] ? T.pos[MHIPS].clone() : V();
      if (hp) hl = V().fromArray(hp.evaluate(t)).sub(S.t).applyQuaternion(D0).multiplyScalar(k0).add(T.t);
      for (const n of T.order) { const pn = T.par[n], Pq = pn ? TW[pn] : topT[n];
        TW[n] = tq[n] ? SW[n].clone().multiply(iS[n]).multiply(T.wq[n]) : Pq.clone().multiply(restQT[n]);
        TL[n] = Pq.clone().invert().multiply(TW[n]);
        const lp = n === MHIPS ? hl.clone() : T.pos[n].clone();
        TP[n] = pn ? lp.applyQuaternion(TW[pn]).add(TP[pn]) : lp.applyQuaternion(topT[n]); }
      if (feet) {
        const Dq = SW[MHIPS].clone().multiply(iS[MHIPS]), Di = Dq.clone().invert();
        const Cs = SP[LEG[0].up].clone().add(SP[LEG[1].up]).multiplyScalar(.5), Ct = TP[LEG[0].up].clone().add(TP[LEG[1].up]).multiplyScalar(.5);
        const map = p => { const q = p.clone().sub(Cs).applyQuaternion(Di), lat = Ls.clone().multiplyScalar(q.dot(Ls)); return q.sub(lat).multiplyScalar(lr).add(lat.multiplyScalar(hr)).applyQuaternion(Dq).add(Ct); };
        for (const L of LEG) {
          const H = TP[L.up], Tg = map(SP[L.ft]), K0 = map(SP[L.kn]), a = T.pos[L.kn].length(), b = T.pos[L.ft].length();
          const d = Tg.clone().sub(H), dl = Math.max(1e-6, Math.min(d.length(), (a + b) * .999)), nn = d.normalize();
          const x = (a * a - b * b + dl * dl) / (2 * dl), h = Math.sqrt(Math.max(0, a * a - x * x));
          let pole = K0.clone().sub(H); pole.addScaledVector(nn, -pole.dot(nn));
          if (pole.lengthSq() < 1e-10) { pole = V().set(0, 0, 1).applyQuaternion(Dq); pole.addScaledVector(nn, -pole.dot(nn)); }
          const K = H.clone().addScaledVector(nn, x).addScaledVector(pole.normalize(), h), Tf = H.clone().addScaledVector(nn, dl);
          const footW = TW[L.ft].clone(), Pup = T.par[L.up] ? TW[T.par[L.up]] : topT[L.up];
          TW[L.up] = Q().setFromUnitVectors(TP[L.kn].clone().sub(H).normalize(), K.clone().sub(H).normalize()).multiply(TW[L.up]);
          TL[L.up] = Pup.clone().invert().multiply(TW[L.up]);
          const Kp = T.pos[L.kn].clone().applyQuaternion(TW[L.up]).add(H), legW = TW[L.up].clone().multiply(TL[L.kn]);
          TW[L.kn] = Q().setFromUnitVectors(T.pos[L.ft].clone().applyQuaternion(legW).normalize(), Tf.clone().sub(Kp).normalize()).multiply(legW);
          TL[L.kn] = TW[L.up].clone().invert().multiply(TW[L.kn]);
          TL[L.ft] = TW[L.kn].clone().invert().multiply(footW); TW[L.ft] = footW;
        }
      }
      for (const n of outN) { const q = TL[n]; oq[n].set([q.x, q.y, q.z, q.w], f * 4); }
      if (op) op.set([hl.x, hl.y, hl.z], f * 3);
    }
    const tracks = [];
    for (const n of outN) tracks.push(new THREE.QuaternionKeyframeTrack(n + '.quaternion', times, oq[n]));
    if (op) tracks.push(new THREE.VectorKeyframeTrack(MHIPS + '.position', times, op));
    clips[nm] = new THREE.AnimationClip(nm, c.duration, tracks);
  }
  RTW.ms = Math.round(performance.now() - t0); RTW.hr = hr; RTW.lr = lr;
  return { clips, shared, k: k0, worst: 0, worstN: '', hips: 2 * Math.acos(Math.min(1, Math.abs(D0.w))) * 180 / Math.PI };
}
// /SHIPPED:retargetW

// SHIPPED:ZAP_MOUNT
const ZAP_MOUNT = {
  weapon_root_right: { side: 'Right', q: [.1361, .98742, -.04709, .06534], o: [1.12363, -.13667, -.37014], tip: 'weapon_tip_2', dir: [-1, 0, 0], k: 1.8955 },
  weapon_root_left: { side: 'Left', q: [-.04708, -.06533, .13611, -.98741], o: [.98914, -.30095, .27493], tip: 'weapon_tip', dir: [1, 0, 0], k: 2.5069 } };
// /SHIPPED:ZAP_MOUNT

// SHIPPED:handFrame
function handFrame(hand, side) {
  const ch = nm => hand.children.find(c => c.isBone && c.name.endsWith(side + 'Hand' + nm));
  const m = ch('Middle1'), i = ch('Index1'), p = ch('Pinky1'); if (!m || !i || !p) return null;
  const len = m.position.length(), f = m.position.clone().normalize(), t = i.position.clone().sub(p.position);
  t.addScaledVector(f, -t.dot(f)).normalize();
  return { q: new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(f, t, new THREE.Vector3().crossVectors(f, t))), len };
}
// /SHIPPED:handFrame

// SHIPPED:mountPlace
function mountPlace(hand, name, m) {
  const Z = ZAP_MOUNT[name], F = Z && hand && handFrame(hand, Z.side); if (!F) return false;
  m.quaternion.copy(F.q).multiply(new THREE.Quaternion(...Z.q)); m.position.set(...Z.o).multiplyScalar(F.len).applyQuaternion(F.q); m.scale.set(1, 1, 1);
  let tip = m.children.find(c => c.name === Z.tip); if (!tip) { tip = new THREE.Object3D(); tip.name = Z.tip; m.add(tip); }
  tip.position.set(...Z.dir).multiplyScalar(Z.k * F.len); tip.quaternion.identity(); m.userData.zapConf = 1;
  return true;
}
// /SHIPPED:mountPlace

// SHIPPED:SOCKET_BASIS
const SOCKET_BASIS = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)));
// /SHIPPED:SOCKET_BASIS

// SHIPPED:socketAuto
function socketAuto(hand, side) {
  const F = hand && handFrame(hand, side), Z = ZAP_MOUNT['weapon_root_' + side.toLowerCase()]; if (!F || !Z) return null;
  return { p: new THREE.Vector3(...Z.o).multiplyScalar(F.len).applyQuaternion(F.q), q: F.q.clone().multiply(SOCKET_BASIS), len: F.len };
}
// /SHIPPED:socketAuto

export { bindPose, retargetW, ZAP_MOUNT, handFrame, mountPlace, SOCKET_BASIS, socketAuto };

// ---- names: one spelling for every Mixamo rig. FBX gives `mixamorig:Hips`, GLTFLoader's sanitiser `mixamorigHips`, Blender's
// glTF `mixamorig_Hips`; a second rig in a scene can be `mixamorig1:`. All become `mixamorig_Hips`, written ON the node, so the
// clips this makes name the same bones the game asks for.
export function canonName(n) { const m = /^mixamorig\d*[:_]?([A-Z].*)$/.exec(n || ''); return m ? 'mixamorig_' + m[1] : n; }
export function rigOf(root) {
  const bones = {}, skinned = [];
  root.traverse(o => { if (o.isSkinnedMesh) skinned.push(o); const c = canonName(o.name); if (c !== o.name) o.name = c;
    if (/^mixamorig_/.test(o.name)) { o.isBone = true; bones[o.name] = o; } });
  return { root, bones, skinned };
}

// ---- THE BODY, read off the skin. Every sampled vertex knows its strongest bone; a vertex whose strongest bone is not part of
// the Mixamo body (a tail, a weapon marker) or is in the profile's `exclude` list never counts as "his lowest point" -- that is
// the whole fix for "lands on his back five feet up because his tail is considered his back".
export function skinInfo(rig, opts = {}) {
  const ex = new Set(opts.exclude || []), step = opts.step || 3, meshes = [];
  let kept = 0, dropped = 0; const exNames = new Set();
  for (const m of rig.skinned) {
    const g = m.geometry, sw = g.attributes.skinWeight, si = g.attributes.skinIndex, n = g.attributes.position.count, idx = [];
    for (let i = 0; i < n; i += step) { let bw = -1, bi = 0;
      for (let k = 0; k < 4; k++) { const w = sw.getComponent(i, k); if (w > bw) { bw = w; bi = si.getComponent(i, k); } }
      const b = m.skeleton.bones[bi], nm = b ? b.name : '';
      if (!/^mixamorig_/.test(nm) || ex.has(nm)) { dropped++; exNames.add(nm); continue; }
      idx.push(i); kept++; }
    meshes.push({ m, idx });
  }
  return { meshes, kept, dropped, excluded: [...exNames].filter(Boolean).sort() };
}
const _v = new THREE.Vector3();
export function lowestY(info) {
  let lo = Infinity;
  for (const { m, idx } of info.meshes) { m.skeleton.update();
    for (const i of idx) { _v.fromBufferAttribute(m.geometry.attributes.position, i); m.applyBoneTransform(i, _v); _v.applyMatrix4(m.matrixWorld); if (_v.y < lo) lo = _v.y; } }
  return lo;
}
// the lowest JOINT of a skeleton in world space (the library's Y Bot has no skin, only joints)
export function lowestJoint(bones) { let lo = Infinity; for (const n in bones) { bones[n].getWorldPosition(_v); if (_v.y < lo) lo = _v.y; } return lo; }

// ---- a target: the model as loaded, measured BEFORE any mixer touches it (a mixer overwrites the bind pose for good)
export function prepTarget(model, opts = {}) {
  model.updateMatrixWorld(true);
  const rig = rigOf(model); model.updateMatrixWorld(true);
  const T = bindPose(rig.bones, model);
  if (!T) throw new Error('no mixamorig_Hips on this character');
  const info = skinInfo(rig, opts);
  const hips = rig.bones[MHIPS], hp = hips.getWorldPosition(new THREE.Vector3());
  const restLow = info.kept ? lowestY(info) : 0;
  // one world metre up, said in the hips' parent's space (its scale and turn): how a world lift becomes a hips-track value
  const par = hips.parent, o = par.getWorldPosition(new THREE.Vector3());
  const up = par.worldToLocal(o.clone().add(new THREE.Vector3(0, 1, 0))).sub(par.worldToLocal(o.clone()));
  const mixer = new THREE.AnimationMixer(model);
  // his rest pose, every node, as LOCAL transforms -- `skeleton.pose()` cannot give it back: it treats a root bone's world matrix
  // as its local one, which collapses any rig whose armature carries a scale (the 0.01 most of the cast has)
  // (not what the Forge hangs on him itself -- sockets, mounts, a prop: those keep whatever they were last set to)
  const mine = o => { for (let x = o; x; x = x.parent) if (x.userData.forgeMade || /^forge_/.test(x.name)) return true; return false; };
  const snap = []; model.traverse(o => { if (!mine(o)) snap.push([o, o.position.clone(), o.quaternion.clone(), o.scale.clone()]); });
  const restore = () => { mixer.stopAllAction(); for (const [o, p, q, sc] of snap) { o.position.copy(p); o.quaternion.copy(q); o.scale.copy(sc); } model.updateMatrixWorld(true); };
  return { model, rig, T, info, hipH: hp.y - restLow, restLow, up, mixer, restore, snap };
}
// ---- SOCKETS on his hands (`socket_hand_r` / `_l`, the game's convention -- see `socketAuto`). A rig that already carries one
// keeps it; otherwise it is placed by his hand's own frame, or where his profile says (an adjusted one is marked `forged`, which
// is what the game reads back out of a bake). Made AFTER the rest snapshot, so `restore` never moves them.
export const SOCKETS = { Right: 'socket_hand_r', Left: 'socket_hand_l' };
export function socketsOf(tg, saved) {
  const out = {};
  for (const sd of ['Right', 'Left']) {
    const hand = tg.rig.bones['mixamorig_' + sd + 'Hand']; if (!hand) continue;
    let s = tg.model.getObjectByName(SOCKETS[sd]); const own = !!s && !s.userData.forgeMade;
    if (!s) { s = new THREE.Object3D(); s.name = SOCKETS[sd]; s.userData.forgeMade = 1; hand.add(s); }
    const A = socketAuto(hand, sd), sv = saved && saved[sd];
    if (sv) { s.position.fromArray(sv.p); s.quaternion.fromArray(sv.q); s.userData.forged = 1; }
    else if (!own && A) { s.position.copy(A.p); s.quaternion.copy(A.q); s.userData.forged = 0; }
    out[sd] = { node: s, hand, auto: A, own };
  }
  return out;
}

// ---- a source: one library clip (skeleton only), or a DONOR -- any character with clips of his own (old Zap, an FBX of takes).
// A donor's bind pose is read ONCE, at load, before any mixer has touched him; every clip of his then shares it.
export function prepSource(scene, clip) { return prepDonor(scene, [clip])[0]; }
export function prepDonor(scene, clips) {
  scene.updateMatrixWorld(true);
  const rig = rigOf(scene); scene.updateMatrixWorld(true);
  const S = bindPose(rig.bones, scene);
  if (!S) throw new Error('no mixamorig_Hips in that file');
  const hp = rig.bones[MHIPS].getWorldPosition(new THREE.Vector3()), restLow = lowestJoint(rig.bones);
  const mixer = new THREE.AnimationMixer(scene);
  for (const c of clips) for (const t of c.tracks) { const d = t.name.lastIndexOf('.'), c2 = canonName(t.name.slice(0, d)); t.name = c2 + t.name.slice(d); }
  return clips.map(clip => ({ scene, rig, S, clip, hipH: hp.y - restLow, restLow, mixer }));
}

// ---- LAYER 4, HIS SLIDERS -- whole character, every clip, before the ground (so contact is still right after them).
//   stance  x hip width: each foot moved sideways from the hips' centre line, the leg re-solved (two bones, knee kept in its plane)
//   arms    degrees: both upper arms opened out about his forward axis -- the penguin fix
//   lean    degrees: the spine tipped forward (+) or back about his left axis
// Done on the POSED body frame by frame, so it is the same adjustment whatever the clip is doing. +X is his left: forward is
// left x up.
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _a = new THREE.Vector3(), _b = new THREE.Vector3();
function setWorldQ(bone, wq) { bone.parent.getWorldQuaternion(_q2); bone.quaternion.copy(_q2.invert().multiply(wq)); bone.updateMatrixWorld(true); }
function legTo(B, up, kn, ft, target, keepEnd = true) {
  const H = B[up].getWorldPosition(new THREE.Vector3()), K = B[kn].getWorldPosition(new THREE.Vector3()), F = B[ft].getWorldPosition(new THREE.Vector3());
  const footW = B[ft].getWorldQuaternion(new THREE.Quaternion());
  const a = K.distanceTo(H), b = F.distanceTo(K), d = target.clone().sub(H), dl = Math.max(1e-6, Math.min(d.length(), (a + b) * .999)), n = d.normalize();
  const x = (a * a - b * b + dl * dl) / (2 * dl), h = Math.sqrt(Math.max(0, a * a - x * x));
  const pole = K.clone().sub(H); pole.addScaledVector(n, -pole.dot(n)); if (pole.lengthSq() < 1e-12) return;
  const K2 = H.clone().addScaledVector(n, x).addScaledVector(pole.normalize(), h), F2 = H.clone().addScaledVector(n, dl);
  const uw = B[up].getWorldQuaternion(new THREE.Quaternion());
  setWorldQ(B[up], _q.setFromUnitVectors(K.clone().sub(H).normalize(), K2.clone().sub(H).normalize()).multiply(uw));
  const Kn = B[kn].getWorldPosition(new THREE.Vector3()), Fn = B[ft].getWorldPosition(new THREE.Vector3()), kw = B[kn].getWorldQuaternion(new THREE.Quaternion());
  setWorldQ(B[kn], _q.setFromUnitVectors(Fn.sub(Kn).normalize(), F2.clone().sub(Kn).normalize()).multiply(kw));
  if (keepEnd) setWorldQ(B[ft], footW);
}
export function adjustLayer(tg, clip, A) {
  const st = +A.stance || 1, arms = (+A.arms || 0) * Math.PI / 180, lean = (+A.lean || 0) * Math.PI / 180;
  if (st === 1 && !arms && !lean) return clip;
  const B = tg.rig.bones, M = 'mixamorig_', has = n => !!B[M + n];
  const touched = [];
  if (st !== 1 && ['LeftUpLeg', 'LeftLeg', 'LeftFoot', 'RightUpLeg', 'RightLeg', 'RightFoot'].every(has)) touched.push('LeftUpLeg', 'LeftLeg', 'LeftFoot', 'RightUpLeg', 'RightLeg', 'RightFoot');
  if (arms && has('LeftArm') && has('RightArm')) touched.push('LeftArm', 'RightArm');
  const spine = has('Spine') ? 'Spine' : null; if (lean && spine) touched.push(spine);
  if (!touched.length) return clip;
  const hipTr = clip.tracks.find(t => t.name === MHIPS + '.position') || clip.tracks[0], times = hipTr.times, n = times.length;
  const out = {}; for (const b of new Set(touched)) out[b] = new Float32Array(n * 4);
  tg.mixer.stopAllAction(); const ta = tg.mixer.clipAction(clip); ta.play();
  const UP = new THREE.Vector3(0, 1, 0);
  for (let f = 0; f < n; f++) {
    ta.time = times[f]; tg.mixer.update(0); tg.model.updateMatrixWorld(true);
    const lh = B[M + 'LeftUpLeg'].getWorldPosition(new THREE.Vector3()), rh = B[M + 'RightUpLeg'].getWorldPosition(new THREE.Vector3());
    const L = lh.clone().sub(rh); L.y = 0; const hw = L.length(); L.normalize(); const fwd = L.clone().cross(UP).normalize();
    if (lean && spine) { const w = B[M + spine].getWorldQuaternion(new THREE.Quaternion()); setWorldQ(B[M + spine], _q.setFromAxisAngle(L, lean).multiply(w)); }
    if (arms) for (const [side, sg] of [['Left', 1], ['Right', -1]]) { const bn = B[M + side + 'Arm'], w = bn.getWorldQuaternion(new THREE.Quaternion()); setWorldQ(bn, _q.setFromAxisAngle(fwd, sg * arms).multiply(w)); }
    if (st !== 1 && out.LeftUpLeg) {
      const d = (st - 1) * hw / 2;
      for (const [side, sg] of [['Left', 1], ['Right', -1]]) {
        const F = B[M + side + 'Foot'].getWorldPosition(new THREE.Vector3()).addScaledVector(L, sg * d);
        legTo(B, M + side + 'UpLeg', M + side + 'Leg', M + side + 'Foot', F);
      }
    }
    for (const b in out) { const q = B[M + b].quaternion; out[b].set([q.x, q.y, q.z, q.w], f * 4); }
  }
  ta.stop(); tg.mixer.uncacheClip(clip);
  const names = new Set(Object.keys(out).map(b => M + b + '.quaternion'));
  const tracks = clip.tracks.filter(t => !names.has(t.name)).concat(Object.keys(out).map(b => new THREE.QuaternionKeyframeTrack(M + b + '.quaternion', times, out[b])));
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// ---- LAYER 6, THE FK LAYER -- his hand on a bone. `fk` is { boneName: [{ t, q:[x,y,z,w] }, ...] }: at each key, a rotation ADDED
// on top of the clip, in the bone's PARENT frame (so "lift the arm" stays a lift whatever the shoulder is doing). Between keys it
// eases (smoothstep + slerp); before the first and after the last it holds. One key is the whole clip.
export function fkAt(keys, t, out = new THREE.Quaternion()) {
  if (!keys || !keys.length) return out.identity();
  const k = keys; if (t <= k[0].t) return out.fromArray(k[0].q); if (t >= k[k.length - 1].t) return out.fromArray(k[k.length - 1].q);
  let i = 0; while (k[i + 1].t < t) i++;
  const a = k[i], b = k[i + 1], u = (t - a.t) / Math.max(1e-6, b.t - a.t), e = u * u * (3 - 2 * u);
  return out.fromArray(a.q).slerp(_q2.fromArray(b.q), e);
}
export function fkLayer(tg, clip, fk) {
  if (!fk || !Object.keys(fk).length) return clip;
  const ref = clip.tracks.find(t => t.name === MHIPS + '.position') || clip.tracks[0], times = ref.times, D = new THREE.Quaternion(), L = new THREE.Quaternion();
  let tracks = clip.tracks.slice();
  for (const bn in fk) { const keys = (fk[bn] || []).slice().sort((a, b) => a.t - b.t); if (!keys.length || !tg.rig.bones[bn]) continue;
    const nm = bn + '.quaternion', old = tracks.find(t => t.name === nm), rest = tg.T.rest[bn] || [0, 0, 0, 1];
    const tt = old ? old.times : times, vals = new Float32Array(tt.length * 4);
    for (let f = 0; f < tt.length; f++) {
      if (old) L.fromArray(old.values, f * 4); else L.fromArray(rest);
      fkAt(keys, tt[f], D); L.premultiply(D); vals.set([L.x, L.y, L.z, L.w], f * 4); }
    tracks = tracks.filter(t => t !== old); tracks.push(new THREE.QuaternionKeyframeTrack(nm, tt, vals)); }
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// ---- LAYER 5, THE OTHER HAND ON THE PROP. `grip` = { bone: the mount the prop hangs from (weapon_root_right, or the hand),
// M: the prop's placement under it (16 numbers), off: the grip point in the prop's own space, side: 'Left'|'Right', reach 0..1 }.
// Per frame the grip point is found in the world -- it rides the carrying hand, FK and all -- and the other arm is re-solved onto
// it (two bones, the elbow kept in its plane, the hand following its forearm). Reach 0.5 is halfway there.
export function gripLayer(tg, clip, grip) {
  if (!grip || !(+grip.reach > 0)) return clip;
  const mount = tg.model.getObjectByName(grip.bone), sd = grip.side || 'Left', B = tg.rig.bones, M = 'mixamorig_';
  const up = M + sd + 'Arm', kn = M + sd + 'ForeArm', ft = M + sd + 'Hand';
  if (!mount || !B[up] || !B[kn] || !B[ft]) return clip;
  const PM = new THREE.Matrix4().fromArray(grip.M), off = new THREE.Vector3().fromArray(grip.off), reach = Math.min(1, +grip.reach);
  const ref = clip.tracks.find(t => t.name === MHIPS + '.position') || clip.tracks[0], times = ref.times, n = times.length;
  const out = { [up]: new Float32Array(n * 4), [kn]: new Float32Array(n * 4), [ft]: new Float32Array(n * 4) };
  tg.mixer.stopAllAction(); const ta = tg.mixer.clipAction(clip); ta.play();
  const W = new THREE.Matrix4(), tgt = new THREE.Vector3(), cur = new THREE.Vector3();
  for (let f = 0; f < n; f++) {
    ta.time = times[f]; tg.mixer.update(0); tg.model.updateMatrixWorld(true);
    tgt.copy(off).applyMatrix4(W.multiplyMatrices(mount.matrixWorld, PM));
    B[ft].getWorldPosition(cur); tgt.lerp(cur, 1 - reach);
    legTo(B, up, kn, ft, tgt, false);
    for (const b in out) { const q = B[b].quaternion; out[b].set([q.x, q.y, q.z, q.w], f * 4); }
  }
  ta.stop(); tg.mixer.uncacheClip(clip);
  const tracks = clip.tracks.filter(t => !out[t.name.slice(0, t.name.lastIndexOf('.'))] || !t.name.endsWith('.quaternion')).concat(Object.keys(out).map(b => new THREE.QuaternionKeyframeTrack(b + '.quaternion', times, out[b])));
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// ---- LAYER 7, CLIP EDITS: trim (seconds in the source) and speed
export function editLayer(clip, E) {
  if (!E) return clip;
  let c = clip; const a = Math.max(0, +(E.trim && E.trim[0]) || 0), b = Math.min(c.duration, E.trim && E.trim[1] > 0 ? +E.trim[1] : c.duration);
  if (a > 0 || b < c.duration) {
    const tracks = c.tracks.map(t => { const ts = t.times, sz = t.getValueSize(), keep = [];
      for (let i = 0; i < ts.length; i++) if (ts[i] >= a - 1e-4 && ts[i] <= b + 1e-4) keep.push(i);
      if (!keep.length) keep.push(0);
      const nt = new Float32Array(keep.length), nv = new Float32Array(keep.length * sz);
      keep.forEach((i, j) => { nt[j] = ts[i] - a; for (let k = 0; k < sz; k++) nv[j * sz + k] = t.values[i * sz + k]; });
      return new t.constructor(t.name, nt, nv); });
    c = new THREE.AnimationClip(c.name, b - a, tracks);
  }
  const sp = +E.speed || 1;
  if (sp !== 1) c = new THREE.AnimationClip(c.name, c.duration / sp, c.tracks.map(t => new t.constructor(t.name, t.times.map(x => x / sp), t.values)));
  return c;
}

// ---- LAYER 3, GROUND CONTACT. Per frame: how far the library body's lowest joint is above where it is standing at rest, scaled
// by hip height, is how far THIS body's lowest skin point should be above the floor. The difference lifts or drops the hips.
// It catches a stride that floats, a back that lies on a tail, a crouch that sinks -- and leaves a jump a jump, because the
// library body is off the ground too. `amt` 0..1 is the A/B.
export function groundLayer(tg, src, clip, amt = 1) {
  const hipTr = clip.tracks.find(t => t.name === MHIPS + '.position');
  if (!hipTr || !tg.info.kept || amt <= 0) return { clip, max: 0, mean: 0 };
  const k = tg.hipH / (src.hipH || 1), times = hipTr.times, n = times.length, off = new Float32Array(n);
  src.mixer.stopAllAction(); tg.mixer.stopAllAction();     // nothing else may blend into what is measured
  const sa = src.mixer.clipAction(src.clip); sa.play();
  const ta = tg.mixer.clipAction(clip); ta.play();
  for (let f = 0; f < n; f++) {
    sa.time = Math.min(src.clip.duration, times[f]); src.mixer.update(0); src.scene.updateMatrixWorld(true);
    const want = tg.restLow + Math.max(0, lowestJoint(src.rig.bones) - src.restLow) * k;
    ta.time = times[f]; tg.mixer.update(0); tg.model.updateMatrixWorld(true);
    off[f] = (want - lowestY(tg.info)) * amt;
  }
  sa.stop(); ta.stop(); src.mixer.uncacheClip(src.clip); tg.mixer.uncacheClip(clip);
  // a 3-tap smooth: the lowest point can hop between two vertices from one frame to the next
  const sm = off.map((v, f) => (off[Math.max(0, f - 1)] + 2 * v + off[Math.min(n - 1, f + 1)]) / 4);
  const vals = hipTr.values.slice(); let max = 0, sum = 0;
  for (let f = 0; f < n; f++) { vals[f * 3] += tg.up.x * sm[f]; vals[f * 3 + 1] += tg.up.y * sm[f]; vals[f * 3 + 2] += tg.up.z * sm[f]; max = Math.max(max, Math.abs(sm[f])); sum += Math.abs(sm[f]); }
  const tracks = clip.tracks.map(t => t === hipTr ? new THREE.VectorKeyframeTrack(t.name, times, vals) : t);
  return { clip: new THREE.AnimationClip(clip.name, clip.duration, tracks), max, mean: sum / n };
}

// ---- one clip through every layer. `P` is the profile (see forge.html); returns the clip and what each layer did.
export function carry(tg, src, role, P, opt) {
  RTW.feet = P.layers.feet ? 1 : 0;
  const r = retargetW(src.S, tg.T, { [role]: src.clip }, tg.rig.bones);
  if (!r || !r.clips[role]) throw new Error('nothing carried for ' + role);
  let clip = r.clips[role]; const rep = { hipW: RTW.hr, leg: RTW.lr, ms: RTW.ms };
  if (P.adjust) clip = adjustLayer(tg, clip, P.adjust);
  if (opt && opt.fk) clip = fkLayer(tg, clip, opt.fk);
  if (opt && opt.grip) clip = gripLayer(tg, clip, opt.grip);
  if (P.layers.ground) { const g = groundLayer(tg, src, clip, P.layers.ground); clip = g.clip; rep.groundMax = g.max; rep.groundMean = g.mean; }
  return { clip, rep };
}

// ---- a profile, empty
export function newProfile(file) {
  return { v: 1, character: file || '', exclude: [], layers: { feet: 1, ground: 1 }, adjust: { stance: 1, arms: 0, lean: 0 }, clips: [] };
}
