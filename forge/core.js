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
export { bindPose, retargetW };

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
  return { model, rig, T, info, hipH: hp.y - restLow, restLow, up, mixer };
}
// ---- a source: one library clip (skeleton only)
export function prepSource(scene, clip) {
  scene.updateMatrixWorld(true);
  const rig = rigOf(scene); scene.updateMatrixWorld(true);
  const S = bindPose(rig.bones, scene);
  if (!S) throw new Error('library clip has no mixamorig_Hips');
  const hp = rig.bones[MHIPS].getWorldPosition(new THREE.Vector3()), restLow = lowestJoint(rig.bones);
  return { scene, rig, S, clip, hipH: hp.y - restLow, restLow, mixer: new THREE.AnimationMixer(scene) };
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
export function carry(tg, src, role, P) {
  RTW.feet = P.layers.feet ? 1 : 0;
  const r = retargetW(src.S, tg.T, { [role]: src.clip }, tg.rig.bones);
  if (!r || !r.clips[role]) throw new Error('nothing carried for ' + role);
  let clip = r.clips[role]; const rep = { hipW: RTW.hr, leg: RTW.lr, ms: RTW.ms };
  if (P.layers.ground) { const g = groundLayer(tg, src, clip, P.layers.ground); clip = g.clip; rep.groundMax = g.max; rep.groundMean = g.mean; }
  return { clip, rep };
}

// ---- a profile, empty
export function newProfile(file) {
  return { v: 1, character: file || '', exclude: [], layers: { feet: 1, ground: 1 }, clips: [] };
}
