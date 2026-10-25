// THE FIX FOR `tools/hipfix.mjs` (m987): node tools/hipshift.mjs <in.glb> <out.glb> -- needs @gltf-transform/core, /extensions, draco3dgltf
// shift a skinned character so its Hips sit over (0,0): vertices, inverse binds, the Hips node and every Hips key
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
const [src, out] = process.argv.slice(2);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'draco3d.decoder': await draco3d.createDecoderModule(), 'draco3d.encoder': await draco3d.createEncoderModule() });
const doc = await io.read(src), R = doc.getRoot();
const hips = R.listNodes().find(n => /Hips$/.test(n.getName()));
const t = hips.getTranslation(), dx = t[0], dz = t[2];
console.log('Hips', t.map(v => v.toFixed(4)));
// every parent of the Hips must be plain for the arithmetic below
for (let p = hips.getParentNode(); p; p = p.getParentNode()) { const r = p.getRotation(), s = p.getScale(), q = p.getTranslation(); if (r[3] < .99999 || Math.abs(s[0] - 1) > 1e-6 || q[0] || q[2]) throw new Error('parent ' + p.getName() + ' is transformed'); }
hips.setTranslation([0, t[1], 0]);
const done = new Set();
for (const m of R.listMeshes()) for (const pr of m.listPrimitives()) { const a = pr.getAttribute('POSITION'); if (done.has(a)) continue; done.add(a);
  const v = [0, 0, 0]; for (let i = 0; i < a.getCount(); i++) { a.getElement(i, v); v[0] -= dx; v[2] -= dz; a.setElement(i, v); } }
for (const s of R.listSkins()) { const A = s.getInverseBindMatrices(); const m = new Array(16);
  // IBM' = IBM * T(+d): a vertex moved by -d binds exactly as before
  for (let i = 0; i < A.getCount(); i++) { A.getElement(i, m); m[12] += m[0] * dx + m[8] * dz; m[13] += m[1] * dx + m[9] * dz; m[14] += m[2] * dx + m[10] * dz; A.setElement(i, m); } }
const seen = new Set(); let k = 0;
for (const an of R.listAnimations()) for (const c of an.listChannels()) { if (c.getTargetNode() !== hips || c.getTargetPath() !== 'translation') continue;
  const o = c.getSampler().getOutput(); if (seen.has(o)) continue; seen.add(o); const v = [0, 0, 0];
  for (let i = 0; i < o.getCount(); i++) { o.getElement(i, v); v[0] -= dx; v[2] -= dz; o.setElement(i, v); k++; } }
console.log('moved', -dx, -dz, '| verts', [...done].reduce((s, a) => s + a.getCount(), 0), '| keys', k);
const dr = doc.getRoot().listExtensionsUsed().find(e => e.extensionName === 'KHR_draco_mesh_compression');
if (dr) dr.setRequired(true).setEncoderOptions({ method: 'edgebreaker', encodeSpeed: 5, decodeSpeed: 5 });
await io.write(out, doc);
