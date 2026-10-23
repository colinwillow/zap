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
    const H = ST.tg.hipH * 2.2; orbit.target.set(-H * .45, H * .45, 0); cam.position.set(H * .6, H * .6, H * 3.1);
    $('who').textContent = name.split('/').pop();
    $('lFeet').checked = !!ST.P.layers.feet; $('lGround').value = ST.P.layers.ground; $('lGroundV').textContent = (+ST.P.layers.ground).toFixed(2);
    const I = ST.tg.info, nb = Object.keys(ST.tg.rig.bones).length;
    $('charNote').innerHTML = `${nb} Mixamo bones · hips ${ST.tg.hipH.toFixed(2)} m above his soles · ${ST.tg.rig.skinned.length} skinned mesh${ST.tg.rig.skinned.length === 1 ? '' : 'es'}` + (I.kept ? '' : ' · <span class="bad">no skin found: ground contact is off</span>');
    $('exNote').textContent = I.excluded.length ? I.excluded.join(', ') + ` (${I.dropped} sampled vertices)` : 'nothing: every vertex belongs to the body';
    renderPack();
    syncSliders(); if (ST.P.clips.length) await previewEntry(ST.P.clips[0]); else chip('pick clips in LIBRARY');
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
    const en = { role, stem: st, name: m.name }; ST.P.clips.push(en); saveProf(); renderPack(); e.target.textContent = '✓';
    [...$('libList').children].forEach(r => r.classList.toggle('on', r === row)); return previewEntry(en); }
  [...$('libList').children].forEach(r => r.classList.toggle('on', r === row));
  await previewStem(st, st);
};
$('ghGo').onclick = () => libConnect('gh', { gh: { repo: $('ghRepo').value.trim(), path: $('ghPath').value.trim().replace(/^\/|\/$/g, ''), tok: $('ghTok').value.trim() } });
$('dirBtn').onclick = () => $('dirIn').click();
$('dirIn').onchange = () => { const m = new Map(); for (const f of $('dirIn').files) m.set(f.name, f); libConnect('dir', { files: m }); };
$('libReset').onclick = () => { $('libSetup').hidden = false; $('libBrowse').hidden = true; localStorage.removeItem('forge.gh'); };

// ---------------------------------------------------------------- donors: any character's own clips (the cast, or an upload)
const DON = { cur: '', list: new Map() };   // name -> [src per clip]
const idb = () => new Promise((ok, no) => { const r = indexedDB.open('forge', 1); r.onupgradeneeded = () => r.result.createObjectStore('files'); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
const idbPut = async (k, v) => { const db = await idb(); return new Promise(ok => { const t = db.transaction('files', 'readwrite'); t.objectStore('files').put(v, k); t.oncomplete = ok; t.onerror = ok; }); };
const idbGet = async k => { const db = await idb(); return new Promise(ok => { const q = db.transaction('files').objectStore('files').get(k); q.onsuccess = () => ok(q.result); q.onerror = () => ok(null); }); };
const idbKeys = async () => { try { const db = await idb(); return await new Promise(ok => { const q = db.transaction('files').objectStore('files').getAllKeys(); q.onsuccess = () => ok(q.result); q.onerror = () => ok([]); }); } catch (e) { return []; } };
async function donor(name) {
  if (DON.list.has(name)) return DON.list.get(name);
  let buf, file = name;
  if (name.startsWith('idb:')) { buf = await idbGet(name); file = name.slice(4); if (!buf) throw new Error(file + ' is no longer in this browser'); }
  else buf = await (await fetch(name)).arrayBuffer();
  const g = await loadCharBuf(buf, file);
  const clips = (g.animations || []).filter(c => c.tracks.length && !/CINEMA_4D|^Take 001$|mixamo\.com$/.test(c.name) || (g.animations || []).length === 1);
  if (!clips.length) throw new Error('no animations in ' + file);
  normalise(g.scene);
  const srcs = F.prepDonor(g.scene, clips); srcs.forEach(s => { s.donor = name; });
  DON.list.set(name, srcs); return srcs;
}
async function donorMenu() {
  const up = (await idbKeys()).filter(k => String(k).startsWith('idb:'));
  $('donSel').innerHTML = '<option value="">— pick a character to take clips from —</option>' + CHARS.map(([f, n]) => `<option value="models/characters/${f}.glb">${n}</option>`).join('') + up.map(k => `<option value="${k}">${k.slice(4)} (uploaded)</option>`).join('');
}
async function showDonor(name) {
  DON.cur = name; $('donNote').textContent = 'loading…'; $('donList').innerHTML = ''; $('donAll').hidden = true;
  try { const srcs = await donor(name);
    $('donNote').textContent = srcs.length + ' clips';
    $('donList').innerHTML = srcs.map((s, i) => `<div class="item" data-i="${i}"><div class="nm">${s.clip.name} <small>${s.clip.duration.toFixed(2)} s</small></div><button class="btn" data-add="${i}">+</button></div>`).join('');
    $('donAll').hidden = false;
  } catch (e) { $('donNote').innerHTML = '<span class="bad">' + e.message + '</span>'; }
}
function addEntry(en) { let r = en.role; while (ST.P.clips.some(c => c.role === r)) r += '_2'; en.role = r; ST.P.clips.push(en); }
$('donSel').onchange = () => { if ($('donSel').value) showDonor($('donSel').value); };
$('donFileBtn').onclick = () => $('donFile').click();
$('donFile').onchange = async () => { const f = $('donFile').files[0]; if (!f) return; const k = 'idb:' + f.name; await idbPut(k, await f.arrayBuffer()); DON.list.delete(k); await donorMenu(); $('donSel').value = k; showDonor(k); };
$('donList').onclick = async e => {
  const row = e.target.closest('.item'); if (!row || !ST.tg) return; const srcs = DON.list.get(DON.cur), i = +(e.target.dataset.add ?? row.dataset.i), s = srcs[i];
  const en = { role: s.clip.name, donor: DON.cur, clip: s.clip.name, name: stemOf(DON.cur) + ': ' + s.clip.name };
  if (e.target.dataset.add !== undefined) { addEntry(en); saveProf(); renderPack(); e.target.textContent = '✓'; }
  [...$('donList').children].forEach(r => r.classList.toggle('on', r === row));
  await previewEntry(en);
};
$('donAll').onclick = () => { const srcs = DON.list.get(DON.cur); let n = 0;
  for (const s of srcs) if (!ST.P.clips.some(c => c.donor === DON.cur && c.clip === s.clip.name)) { addEntry({ role: s.clip.name, donor: DON.cur, clip: s.clip.name, name: stemOf(DON.cur) + ': ' + s.clip.name }); n++; }
  saveProf(); renderPack(); $('donNote').textContent = n + ' added to his pack -- flip through them with ◀ ▶'; };
$('srcSw').onclick = e => { const k = e.target.dataset.s; if (!k) return; [...$('srcSw').children].forEach(b => b.classList.toggle('ac', b === e.target)); $('donPane').hidden = k !== 'don'; $('libPane').hidden = k === 'don'; };

// ---------------------------------------------------------------- carrying and previewing
async function source(en) {
  if (en.donor) { const s = (await donor(en.donor)).find(x => x.clip.name === en.clip); if (!s) throw new Error(en.clip + ' is not in ' + en.donor); return s; }
  const stem = en.stem;
  if (ST.srcCache.has(stem)) return ST.srcCache.get(stem);
  const g = await parseGLB(await libGet(stem + '.glb'));
  const s = F.prepSource(g.scene, g.animations[0]); s.stem = stem;
  ST.srcCache.set(stem, s); if (ST.srcCache.size > 40) ST.srcCache.delete(ST.srcCache.keys().next().value);
  return s;
}
async function bake(en) {
  const src = await source(en), r = F.carry(ST.tg, src, en.role, ST.P);
  return { src, rep: r.rep, clip: F.editLayer(r.clip, en.edit) };
}
async function previewEntry(en) {
  if (!ST.tg) return; busy(true);
  try {
    const { src, clip, rep } = await bake(en);
    play(clip, src, en.edit);
    const from = en.donor ? stemOf(en.donor) + ': ' + en.clip : ((LIB.index && LIB.index.find(x => x.stem === en.stem)) || {}).name || en.stem;
    chip(`${en.role}  ←  ${from}  ${clip.duration.toFixed(2)} s\n` +
      `stance ×${(rep.hipW / rep.leg).toFixed(2)} of the source's, for his leg length` + (rep.groundMax !== undefined ? ` · ground moved him up to ${(rep.groundMax * 100).toFixed(0)} cm (mean ${(rep.groundMean * 100).toFixed(0)})` : ' · ground off'));
    ST.cur = en; ST.curSrcDur = src.clip.duration; renderPack(); showEdit();
  } catch (e) { console.error(e); chip('could not carry ' + (en.clip || en.stem) + ': ' + e.message); }
  busy(false);
}
const previewStem = (role, stem) => previewEntry({ role, stem });
function play(clip, src, edit) {
  const mx = ST.tg.mixer; mx.stopAllAction(); if (ST.act) mx.uncacheAction(ST.act.getClip());
  ST.act = mx.clipAction(clip); ST.act.play(); ST.act.time = 0;
  if (ST.ghost) { scene.remove(ST.ghost.root); ST.ghost = null; }
  if ($('ghost').checked && src) {
    // the source body, at his hip height, a body-width to his right: what he is being asked to do
    const root = new THREE.Group(), copy = skClone(src.scene); root.add(copy); copy.traverse(o => { if (/^mixamorig_/.test(o.name)) o.isBone = true; });
    const k = ST.tg.hipH / (src.hipH || 1); root.scale.multiplyScalar(k); root.position.set(-ST.tg.hipH * 2.1, -src.restLow * k, 0);
    const help = new THREE.SkeletonHelper(copy); root.add(help);
    const mix = new THREE.AnimationMixer(copy); mix.clipAction(src.clip).play();
    scene.add(root); ST.ghost = { root, mix, help, a: (edit && edit.trim && +edit.trim[0]) || 0, sp: (edit && +edit.speed) || 1 };
  }
}

// ---------------------------------------------------------------- the pack
function saveProf() { if (ST.file) localStorage.setItem(profKey(ST.file), JSON.stringify(ST.P)); }
function renderPack() {
  $('packList').innerHTML = ST.P.clips.length ? ST.P.clips.map((c, i) => `<div class="item${ST.cur === c ? ' on' : ''}" data-i="${i}"><input type="text" value="${c.role}" data-role="${i}" style="width:42%;flex:none"><div class="nm"><small>${c.name || c.stem}${c.edit ? ' · edited' : ''}</small></div><button class="btn" data-del="${i}">✕</button></div>`).join('')
    : '<div class="item"><div class="nm"><small>empty -- add clips from LIBRARY with +</small></div></div>';
}
$('packList').onclick = e => {
  const d = e.target.dataset.del; if (d !== undefined) { ST.P.clips.splice(+d, 1); saveProf(); renderPack(); return; }
  if (e.target.dataset.role !== undefined) return;
  const row = e.target.closest('.item'); if (!row || row.dataset.i === undefined) return;
  previewEntry(ST.P.clips[+row.dataset.i]);
};
$('packList').onchange = e => { const i = e.target.dataset.role; if (i === undefined) return; ST.P.clips[+i].role = e.target.value.trim() || ST.P.clips[+i].role; saveProf(); };
const step = d => { const L = ST.P.clips; if (!L.length) return; const i = L.indexOf(ST.cur); previewEntry(L[((i < 0 ? -1 : i) + d + L.length) % L.length]); };
$('prev').onclick = () => step(-1); $('next').onclick = () => step(1);
// this clip's trim and speed -- only for a clip that is IN the pack (a library row being browsed has nowhere to keep them)
function showEdit() {
  const en = ST.cur, inPack = en && ST.P.clips.includes(en); $('edit').hidden = !inPack; if (!inPack) return;
  const d = ST.curSrcDur || 1, E = en.edit || {};
  $('editH').textContent = 'This clip: ' + en.role;
  for (const id of ['eA', 'eB']) $(id).max = d.toFixed(2);
  $('eA').value = (E.trim && E.trim[0]) || 0; $('eB').value = (E.trim && E.trim[1]) || d; $('eS').value = E.speed || 1;
  $('eAV').textContent = (+$('eA').value).toFixed(2); $('eBV').textContent = (+$('eB').value).toFixed(2); $('eSV').textContent = (+$('eS').value).toFixed(2);
}
for (const id of ['eA', 'eB', 'eS']) {
  $(id).oninput = () => { $(id + 'V').textContent = (+$(id).value).toFixed(2); };
  $(id).onchange = () => { const en = ST.cur; if (!en) return; const d = ST.curSrcDur || 1, a = +$('eA').value, b = Math.max(a + .05, +$('eB').value), sp = +$('eS').value;
    en.edit = (a > 0.001 || b < d - .001 || sp !== 1) ? { trim: [a, b], speed: sp } : undefined; saveProf(); previewEntry(en); };
}
const dl = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
const stemOf = f => f.split('/').pop().replace(/\.(glb|gltf|fbx)$/i, '');
$('profSave').onclick = () => dl(new Blob([JSON.stringify(ST.P, null, 1)], { type: 'application/json' }), stemOf(ST.file) + '.profile.json');
$('profLoadBtn').onclick = () => $('profLoad').click();
$('profLoad').onchange = async () => { const f = $('profLoad').files[0]; if (!f) return; ST.P = JSON.parse(await f.text()); saveProf(); await reprep(); renderPack(); };
async function reprep() { if (!ST.tg) return; const m = ST.tg.model; ST.tg.mixer.stopAllAction(); m.traverse(o => { if (o.isSkinnedMesh) o.skeleton.pose(); }); ST.tg = F.prepTarget(m, { exclude: ST.P.exclude }); syncSliders(); }

// ---------------------------------------------------------------- layers and his sliders
const relayer = () => { saveProf(); if (ST.cur) previewEntry(ST.cur); };
$('lFeet').onchange = () => { ST.P.layers.feet = $('lFeet').checked ? 1 : 0; relayer(); };
$('lGround').oninput = () => { $('lGroundV').textContent = (+$('lGround').value).toFixed(2); };
$('lGround').onchange = () => { ST.P.layers.ground = +$('lGround').value; relayer(); };
$('ghost').onchange = () => relayer();
const SL = { aStance: ['stance', 2], aArms: ['arms', 0], aLean: ['lean', 0] };
function syncSliders() { ST.P.adjust = Object.assign({ stance: 1, arms: 0, lean: 0 }, ST.P.adjust || {});
  for (const id in SL) { $(id).value = ST.P.adjust[SL[id][0]]; $(id + 'V').textContent = (+$(id).value).toFixed(SL[id][1]); } }
for (const id in SL) {
  $(id).oninput = () => { $(id + 'V').textContent = (+$(id).value).toFixed(SL[id][1]); };
  $(id).onchange = () => { ST.P.adjust = ST.P.adjust || {}; ST.P.adjust[SL[id][0]] = +$(id).value; relayer(); };
}

// ---------------------------------------------------------------- export
async function bakeAll(onStep) {
  const clips = [];
  for (const [i, c] of ST.P.clips.entries()) { onStep && onStep(i, c); try { const { clip } = await bake(c); clip.name = c.role; clips.push(clip); } catch (e) { console.warn('skipped ' + c.role + ': ' + e.message); } }
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
    if (ST.ghost) { const ga = ST.ghost.mix._actions[0]; if (ga) { ga.time = ST.ghost.a + t * ST.ghost.sp; ST.ghost.mix.update(0); } }
    if (!scrubbing) $('scrub').value = Math.round(t / d * 1000);
    $('tlab').textContent = t.toFixed(2) + ' / ' + d.toFixed(2);
  }
  orbit.update(); renderer.render(scene, cam);
});

// ---------------------------------------------------------------- start
(async () => {
  donorMenu();
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
  previewEntry: en => previewEntry(en),
  donor: async name => (await donor(name)).map(s => s.clip.name),
  adjust(a) { ST.P.adjust = Object.assign(ST.P.adjust || {}, a); syncSliders(); },
  async export(withMesh) { const b = await exportGLB(withMesh); let s = ''; const u = new Uint8Array(b); for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); },
  chip: () => $('chip').textContent,
  seek(t) { ST.playing = false; if (ST.act) { ST.act.time = t; ST.tg.mixer.update(0); } },
  set(k, v) { ST.P.layers[k] = v; },
};
