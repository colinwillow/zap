// FORGE -- the app around forge/core.js. Load a body, pick library clips into his pack, preview them through the layers, save
// his profile, export. `window.forge` is the same thing for the command line (tools/forge.cjs).
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { DRACOLoader } from '../vendor/DRACOLoader.js';
import { FBXLoader } from '../vendor/FBXLoader.js';
import { GLTFExporter } from '../vendor/GLTFExporter.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { clone as skClone } from '../vendor/SkeletonUtils.js';
import * as F from './core.js';

const $ = id => document.getElementById(id);
const Q = new URLSearchParams(location.search);
const CHARS = [
  ['zap_02', 'Zap 2'], ['zap', 'Zap (old)'], ['hick_skinny', 'Hick'], ['hobo_01', 'Hobo'], ['clancy', 'Clancy'],
  ['alien_warrior', 'Warrior'], ['ceo_alien', 'CEO (alien)'], ['ceo_human', 'CEO (human)'], ['alien_rollerskate_blue', 'Roller girl'],
  ['alien_female_purple', 'Purple alien'], ['alien_grey_medium', 'Grey'], ['fat_biker_02', 'Biker'], ['contruction_worker', 'Construction worker'],
  ['dummy_officer', 'Officer'], ['firefighter', 'Firefighter'], ['jack', 'Jack'], ['moussa', 'Moussa'],
];

// ---------------------------------------------------------------- the stage
const view = $('view');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.outputColorSpace = THREE.SRGBColorSpace;
view.prepend(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x1a2029);
const cam = new THREE.PerspectiveCamera(40, 1, .05, 200); cam.position.set(2.2, 1.4, 3.4);
const orbit = new OrbitControls(cam, renderer.domElement); orbit.target.set(0, .8, 0); orbit.enableDamping = true;
scene.add(new THREE.HemisphereLight(0xdde8ff, 0x3a3328, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(3, 6, 4); scene.add(sun);
const grid = new THREE.GridHelper(20, 40, 0x3cd6ff, 0x2a323d); grid.material.opacity = .5; grid.material.transparent = true; scene.add(grid);
const floor = new THREE.Mesh(new THREE.CircleGeometry(3, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x0c0f13, transparent: true, opacity: .5 }));
floor.position.y = -.002; scene.add(floor);
function size() { const r = view.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.updateProjectionMatrix(); }
new ResizeObserver(size).observe(view); size();

// ---------------------------------------------------------------- loaders
const draco = new DRACOLoader().setDecoderPath('./vendor/draco/');
const gl = new GLTFLoader().setDRACOLoader(draco);
const parseGLB = buf => new Promise((ok, no) => gl.parse(buf, '', ok, no));
async function loadCharBuf(buf, name) {
  if (/\.fbx$/i.test(name)) { const g = new FBXLoader().parse(buf, ''); return { scene: g, animations: g.animations || [] }; }
  return parseGLB(buf);
}

// ---------------------------------------------------------------- state
const ST = { tg: null, file: '', P: F.newProfile(), cur: null, act: null, ghost: null, ghostMix: null, playing: true, speed: 1, srcCache: new Map() };
const busy = on => { $('busy').style.display = on ? 'flex' : 'none'; };
const chip = t => { $('chip').textContent = t; };
const profKey = f => 'forge.profile.' + f;

// fit a loaded body: stand it on the floor at the origin, metres. An FBX from Mixamo arrives in centimetres.
function normalise(model) {
  model.updateMatrixWorld(true);
  const b = new THREE.Box3(); const v = new THREE.Vector3();
  model.traverse(o => { if (o.isSkinnedMesh) { o.skeleton.update(); const p = o.geometry.attributes.position; for (let i = 0; i < p.count; i += 7) { v.fromBufferAttribute(p, i); o.applyBoneTransform(i, v); v.applyMatrix4(o.matrixWorld); b.expandByPoint(v); } } });
  if (b.isEmpty()) return;
  const h = b.max.y - b.min.y; if (h > 20) model.scale.multiplyScalar(.01);
}

async function setCharacter(buf, name) {
  busy(true);
  try {
    const g = await loadCharBuf(buf, name);
    if (ST.tg) { scene.remove(ST.tg.model); ST.tg.mixer.stopAllAction(); }
    const model = g.scene; normalise(model);
    model.traverse(o => { if (o.isMesh) { o.frustumCulled = false; const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(m => { if (m) m.side = THREE.FrontSide; }); } });
    ST.file = name;
    const saved = localStorage.getItem(profKey(name));
    ST.P = saved ? JSON.parse(saved) : F.newProfile(name);
    ST.tg = F.prepTarget(model, { exclude: ST.P.exclude });
    ST.own = g.animations || [];
    scene.add(model);
    const H = ST.tg.hipH * 2.2; orbit.target.set(-H * .25, H * .42, 0); cam.position.set(H * .9, H * .55, H * 1.9);
    $('who').textContent = name.split('/').pop();
    $('lFeet').checked = !!ST.P.layers.feet; $('lGround').value = ST.P.layers.ground; $('lGroundV').textContent = (+ST.P.layers.ground).toFixed(2);
    const I = ST.tg.info, nb = Object.keys(ST.tg.rig.bones).length;
    $('charNote').innerHTML = `${nb} Mixamo bones · hips ${ST.tg.hipH.toFixed(2)} m above his soles · ${ST.tg.rig.skinned.length} skinned mesh${ST.tg.rig.skinned.length === 1 ? '' : 'es'}` + (I.kept ? '' : ' · <span class="bad">no skin found: ground contact is off</span>');
    $('exNote').textContent = I.excluded.length ? I.excluded.join(', ') + ` (${I.dropped} sampled vertices)` : 'nothing: every vertex belongs to the body';
    renderPack();
    if (ST.P.clips.length) await preview(ST.P.clips[0].role); else chip('pick clips in LIBRARY');
  } catch (e) { console.error(e); chip('could not load ' + name + ': ' + e.message); }
  busy(false);
}

// ---------------------------------------------------------------- the library: a GitHub repo (token), a local folder, or a URL
const LIB = { kind: '', base: '', files: null, gh: null, index: null };
async function libGet(name, as = 'buf') {
  let r;
  if (LIB.kind === 'url') r = await fetch(LIB.base + name);
  else if (LIB.kind === 'dir') { const f = LIB.files.get(name); if (!f) throw new Error(name + ' is not in that folder'); return as === 'json' ? JSON.parse(await f.text()) : f.arrayBuffer(); }
  else if (LIB.kind === 'gh') {
    const url = `https://api.github.com/repos/${LIB.gh.repo}/contents/${LIB.gh.path}/${encodeURIComponent(name)}`;
    let c = null; try { c = await caches.open('forge-lib'); const hit = await c.match(url); if (hit) return as === 'json' ? hit.json() : hit.arrayBuffer(); } catch (e) { c = null; }
    r = await fetch(url, { headers: { Authorization: 'Bearer ' + LIB.gh.tok, Accept: 'application/vnd.github.raw' } });
    if (r.ok && c) try { await c.put(url, r.clone()); } catch (e) {}
  } else throw new Error('no library');
  if (!r.ok) throw new Error(r.status + ' for ' + name);
  return as === 'json' ? r.json() : r.arrayBuffer();
}
async function libConnect(kind, opt) {
  LIB.kind = kind; Object.assign(LIB, opt);
  $('libNote').textContent = 'connecting…';
  try {
    const I = await libGet('_index.json', 'json'); LIB.index = I.motions || I;
    $('libNote').innerHTML = `<span class="ok">${LIB.index.length} motions</span> · ` + (kind === 'gh' ? LIB.gh.repo + '/' + LIB.gh.path : kind === 'dir' ? 'local folder' : LIB.base);
    $('libSetup').hidden = true; $('libBrowse').hidden = false; buildTags(); search();
    if (kind === 'gh') localStorage.setItem('forge.gh', JSON.stringify(LIB.gh));
    return true;
  } catch (e) { $('libNote').innerHTML = '<span class="bad">' + e.message + '</span>'; LIB.kind = ''; return false; }
}
let tagOn = '';
function buildTags() {
  const n = {}; for (const m of LIB.index) for (const t of m.tags || []) n[t] = (n[t] || 0) + 1;
  const top = Object.keys(n).sort((a, b) => n[b] - n[a]).slice(0, 24);
  $('tagRow').innerHTML = top.map(t => `<button class="tag" data-t="${t}">${t} ${n[t]}</button>`).join('');
  $('tagRow').onclick = e => { const t = e.target.dataset.t; if (t === undefined) return; tagOn = tagOn === t ? '' : t; [...$('tagRow').children].forEach(b => b.classList.toggle('on', b.dataset.t === tagOn)); search(); };
}
function search() {
  const q = $('q').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const hits = LIB.index.filter(m => (!tagOn || (m.tags || []).includes(tagOn)) && q.every(w => (m.name + ' ' + (m.description || '') + ' ' + (m.tags || []).join(' ') + ' ' + (m.props || []).join(' ')).toLowerCase().includes(w)));
  $('hits').textContent = hits.length + ' match' + (hits.length === 1 ? '' : 'es') + (hits.length > 150 ? ' (first 150)' : '');
  // a shared name ("Idle" x18) is told apart by Mixamo's own description and the length: that is what is on the row
  $('libList').innerHTML = hits.slice(0, 150).map(m => `<div class="item" data-s="${m.stem}"><div class="nm">${m.name} <small>${m.description || ''} · ${(+m.duration).toFixed(1)} s${m.loopDiff < 15 ? ' · loops' : ''}</small></div><button class="btn" data-add="${m.stem}">+</button></div>`).join('');
}
$('q').oninput = () => search();
$('libList').onclick = async e => {
  const add = e.target.dataset.add, row = e.target.closest('.item'); if (!row || !ST.tg) return;
  const st = add || row.dataset.s, m = LIB.index.find(x => x.stem === st);
  if (add) { let role = st.toLowerCase(); while (ST.P.clips.some(c => c.role === role)) role += '_2';
    ST.P.clips.push({ role, stem: st, name: m.name }); saveProf(); renderPack(); e.target.textContent = '✓'; }
  [...$('libList').children].forEach(r => r.classList.toggle('on', r === row));
  await previewStem(st, st);
};
$('ghGo').onclick = () => libConnect('gh', { gh: { repo: $('ghRepo').value.trim(), path: $('ghPath').value.trim().replace(/^\/|\/$/g, ''), tok: $('ghTok').value.trim() } });
$('dirBtn').onclick = () => $('dirIn').click();
$('dirIn').onchange = () => { const m = new Map(); for (const f of $('dirIn').files) m.set(f.name, f); libConnect('dir', { files: m }); };
$('libReset').onclick = () => { $('libSetup').hidden = false; $('libBrowse').hidden = true; localStorage.removeItem('forge.gh'); };

// ---------------------------------------------------------------- carrying and previewing
async function source(stem) {
  if (ST.srcCache.has(stem)) return ST.srcCache.get(stem);
  const g = await parseGLB(await libGet(stem + '.glb'));
  const s = F.prepSource(g.scene, g.animations[0]); s.stem = stem;
  ST.srcCache.set(stem, s); if (ST.srcCache.size > 40) ST.srcCache.delete(ST.srcCache.keys().next().value);
  return s;
}
async function bake(role, stem) {
  const src = await source(stem);
  return { src, ...F.carry(ST.tg, src, role, ST.P) };
}
async function previewStem(role, stem) {
  if (!ST.tg) return; busy(true);
  try {
    const { src, clip, rep } = await bake(role, stem);
    play(clip, src);
    const m = LIB.index && LIB.index.find(x => x.stem === stem);
    chip(`${role}${m && m.name !== role ? '  ←  ' + m.name : ''}  ${clip.duration.toFixed(2)} s\n` +
      `stance ×${(rep.hipW / rep.leg).toFixed(2)} of the library's, for his leg length` + (rep.groundMax !== undefined ? ` · ground moved him up to ${(rep.groundMax * 100).toFixed(0)} cm (mean ${(rep.groundMean * 100).toFixed(0)})` : ' · ground off'));
    ST.cur = { role, stem };
  } catch (e) { console.error(e); chip('could not carry ' + stem + ': ' + e.message); }
  busy(false);
}
const preview = role => { const c = ST.P.clips.find(x => x.role === role); return c ? previewStem(role, c.stem) : null; };
function play(clip, src) {
  const mx = ST.tg.mixer; mx.stopAllAction(); if (ST.act) mx.uncacheAction(ST.act.getClip());
  ST.act = mx.clipAction(clip); ST.act.play(); ST.act.time = 0;
  if (ST.ghost) { scene.remove(ST.ghost.root); ST.ghost = null; }
  if ($('ghost').checked && src) {
    // the library body, at his hip height, a body-width to his right: what he is being asked to do
    const root = new THREE.Group(), copy = skClone(src.scene); root.add(copy); copy.traverse(o => { if (/^mixamorig_/.test(o.name)) o.isBone = true; });
    const k = ST.tg.hipH / (src.hipH || 1); root.scale.setScalar(k); root.position.set(-ST.tg.hipH * 1.4, -src.restLow * k, 0);
    const help = new THREE.SkeletonHelper(copy); help.material.linewidth = 2; root.add(help);
    const mix = new THREE.AnimationMixer(copy); mix.clipAction(src.clip).play();
    scene.add(root); ST.ghost = { root, mix, help };
  }
}

// ---------------------------------------------------------------- the pack
function saveProf() { if (ST.file) localStorage.setItem(profKey(ST.file), JSON.stringify(ST.P)); }
function renderPack() {
  $('packList').innerHTML = ST.P.clips.length ? ST.P.clips.map((c, i) => `<div class="item${ST.cur && ST.cur.role === c.role ? ' on' : ''}" data-i="${i}"><input type="text" value="${c.role}" data-role="${i}" style="width:42%;flex:none"><div class="nm"><small>${c.name || c.stem}</small></div><button class="btn" data-del="${i}">✕</button></div>`).join('')
    : '<div class="item"><div class="nm"><small>empty -- add clips from LIBRARY with +</small></div></div>';
}
$('packList').onclick = e => {
  const d = e.target.dataset.del; if (d !== undefined) { ST.P.clips.splice(+d, 1); saveProf(); renderPack(); return; }
  if (e.target.dataset.role !== undefined) return;
  const row = e.target.closest('.item'); if (!row || row.dataset.i === undefined) return;
  const c = ST.P.clips[+row.dataset.i]; previewStem(c.role, c.stem).then(renderPack);
};
$('packList').onchange = e => { const i = e.target.dataset.role; if (i === undefined) return; ST.P.clips[+i].role = e.target.value.trim() || ST.P.clips[+i].role; saveProf(); };
const dl = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
const stemOf = f => f.split('/').pop().replace(/\.(glb|gltf|fbx)$/i, '');
$('profSave').onclick = () => dl(new Blob([JSON.stringify(ST.P, null, 1)], { type: 'application/json' }), stemOf(ST.file) + '.profile.json');
$('profLoadBtn').onclick = () => $('profLoad').click();
$('profLoad').onchange = async () => { const f = $('profLoad').files[0]; if (!f) return; ST.P = JSON.parse(await f.text()); saveProf(); await reprep(); renderPack(); };
async function reprep() { if (!ST.tg) return; const m = ST.tg.model; ST.tg.mixer.stopAllAction(); m.traverse(o => { if (o.isSkinnedMesh) o.skeleton.pose(); }); ST.tg = F.prepTarget(m, { exclude: ST.P.exclude }); }

// ---------------------------------------------------------------- layers
const relayer = () => { saveProf(); if (ST.cur) previewStem(ST.cur.role, ST.cur.stem); };
$('lFeet').onchange = () => { ST.P.layers.feet = $('lFeet').checked ? 1 : 0; relayer(); };
$('lGround').oninput = () => { $('lGroundV').textContent = (+$('lGround').value).toFixed(2); };
$('lGround').onchange = () => { ST.P.layers.ground = +$('lGround').value; relayer(); };
$('ghost').onchange = () => relayer();

// ---------------------------------------------------------------- export
async function bakeAll(onStep) {
  const clips = [];
  for (const [i, c] of ST.P.clips.entries()) { onStep && onStep(i, c); const { clip } = await bake(c.role, c.stem); clip.name = c.role; clips.push(clip); }
  return clips;
}
async function exportGLB(withMesh) {
  if (!ST.tg || !ST.P.clips.length) return null;
  ST.tg.mixer.stopAllAction();
  const clips = await bakeAll((i, c) => { $('expNote').textContent = `baking ${i + 1}/${ST.P.clips.length}: ${c.role}`; });
  const m = ST.tg.model, hid = [];
  m.traverse(o => { o.updateMatrix(); });
  m.traverse(o => { if (o.isSkinnedMesh) o.skeleton.pose(); });
  if (!withMesh) m.traverse(o => { if (o.isMesh && o.visible) { o.visible = false; hid.push(o); } });
  const out = await new GLTFExporter().parseAsync(m, { binary: true, animations: clips, onlyVisible: true });
  hid.forEach(o => { o.visible = true; });
  if (ST.act) ST.act.play();
  $('expNote').textContent = `${clips.length} clips · ${(out.byteLength / 1e6).toFixed(2)} MB`;
  return out;
}
$('expClips').onclick = async () => { busy(true); const b = await exportGLB(false); busy(false); if (b) dl(new Blob([b]), stemOf(ST.file) + '_clips.glb'); };
$('expFull').onclick = async () => { busy(true); const b = await exportGLB(true); busy(false); if (b) dl(new Blob([b]), stemOf(ST.file) + '_forged.glb'); };

// ---------------------------------------------------------------- characters
$('charSel').innerHTML = '<option value="">— pick a character —</option>' + CHARS.map(([f, n]) => `<option value="models/characters/${f}.glb">${n}</option>`).join('');
$('charSel').onchange = async () => { const f = $('charSel').value; if (!f) return; busy(true); const r = await fetch(f); await setCharacter(await r.arrayBuffer(), f); };
$('charFileBtn').onclick = () => $('charFile').click();
$('charFile').onchange = async () => { const f = $('charFile').files[0]; if (f) await setCharacter(await f.arrayBuffer(), f.name); };

// ---------------------------------------------------------------- tabs, time, loop
$('tabs').onclick = e => { const p = e.target.dataset.p; if (!p) return; [...$('tabs').children].forEach(b => b.classList.toggle('on', b === e.target)); document.querySelectorAll('.pane').forEach(x => x.classList.toggle('on', x.id === 'p-' + p)); };
$('play').onclick = () => { ST.playing = !ST.playing; $('play').textContent = ST.playing ? '❚❚' : '▶'; };
$('speed').onchange = () => { ST.speed = +$('speed').value; };
let scrubbing = false;
$('scrub').oninput = () => { scrubbing = true; if (!ST.act) return; const d = ST.act.getClip().duration; ST.act.time = d * $('scrub').value / 1000; };
$('scrub').onchange = () => { scrubbing = false; };
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(.05, clock.getDelta()) * (ST.playing && !scrubbing ? ST.speed : 0);
  if (ST.tg && ST.act) {
    ST.tg.mixer.update(dt);
    const d = ST.act.getClip().duration, t = ST.act.time % d;
    if (ST.ghost) { const ga = ST.ghost.mix._actions[0]; if (ga) { ga.time = t; ST.ghost.mix.update(0); } }
    if (!scrubbing) $('scrub').value = Math.round(t / d * 1000);
    $('tlab').textContent = t.toFixed(2) + ' / ' + d.toFixed(2);
  }
  orbit.update(); renderer.render(scene, cam);
});

// ---------------------------------------------------------------- start
(async () => {
  if (Q.get('lib')) await libConnect('url', { base: Q.get('lib').replace(/\/?$/, '/') });
  else { const g = localStorage.getItem('forge.gh'); if (g) { const o = JSON.parse(g); $('ghRepo').value = o.repo; $('ghPath').value = o.path; $('ghTok').value = o.tok; await libConnect('gh', { gh: o }); } }
  const c = Q.get('char'); if (c) { $('charSel').value = c; const r = await fetch(c); await setCharacter(await r.arrayBuffer(), c); }
  else chip('pick a character in BODY, connect the library in LIBRARY');
})();

// the command line drives exactly this
window.forge = {
  THREE, F, ST, LIB,
  async character(path) { const r = await fetch(path); await setCharacter(await r.arrayBuffer(), path); return { hipH: ST.tg.hipH, excluded: ST.tg.info.excluded }; },
  library: (base) => libConnect('url', { base: base.replace(/\/?$/, '/') }),
  profile(P) { ST.P = P; return reprep(); },
  preview: (role, stem) => previewStem(role, stem || role),
  async export(withMesh) { const b = await exportGLB(withMesh); let s = ''; const u = new Uint8Array(b); for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); },
  chip: () => $('chip').textContent,
  seek(t) { ST.playing = false; if (ST.act) { ST.act.time = t; ST.tg.mixer.update(0); } },
  set(k, v) { ST.P.layers[k] = v; },
};
