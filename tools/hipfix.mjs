// THE PIVOT GOES UNDER HIS HIPS (m987). A character with a backpack comes out of the pipeline with its origin at the back of
// the pack: orient/ARP centre the WHOLE shell, pack included, so the body stands forward of (0,0,0) and the game turns him
// about a point behind him ("he rotates like a boat"). The samurai: body z .005..332, Hips at z .183, origin at the pack.
//   node tools/hipfix.mjs <file.glb> [...]          report: where the Hips sit in plan, per file
// The FIX is `tools/hipshift.mjs <in.glb> <out.glb>`: vertices, inverse binds, the Hips node and every Hips key, together, so the
// bind pose (the x-ray, the transform, the Forge all read it) and the drawn body agree. Moving only the Hips node would move
// the drawn body and leave the bind matrices 0.18 m behind it. It needs gltf-transform + draco (run it where those are
// installed: `npm i @gltf-transform/core @gltf-transform/extensions draco3dgltf` in a scratch folder, then node that copy).
// Re-run after any Forge re-bake of a character with a pack.
import fs from 'fs';
const files = process.argv.slice(2);
const TOL = .03;     // metres (authored units) off centre that counts as fine
for (const f of files) {
  const b = fs.readFileSync(f); const jl = b.readUInt32LE(12); const J = JSON.parse(b.slice(20, 20 + jl).toString());
  const binOff = 20 + jl + 8;
  const hi = J.nodes.findIndex(n => /(^|:|_)Hips$/.test(n.name || ''));
  if (hi < 0) { console.log(f, 'no Hips'); continue; }
  const H = J.nodes[hi], t = H.translation || [0, 0, 0], dx = t[0], dz = t[2];
  // WHERE IT IS IN THE WORLD, from its bind matrix (a Mixamo rig sits under a 0.01 armature, so the local number is centimetres)
  const sk = (J.skins || []).find(s => s.joints.includes(hi)); let w = null, hgt = 0;
  if (sk && sk.inverseBindMatrices != null) {
    const A = J.accessors[sk.inverseBindMatrices], V = J.bufferViews[A.bufferView], o = binOff + (V.byteOffset || 0) + (A.byteOffset || 0) + sk.joints.indexOf(hi) * 64;
    const m = [...Array(16)].map((_, k) => b.readFloatLE(o + k * 4)), R = [[m[0], m[4], m[8]], [m[1], m[5], m[9]], [m[2], m[6], m[10]]], T = [m[12], m[13], m[14]];
    const c = (i, j) => { const r = [0, 1, 2].filter(x => x !== i), q = [0, 1, 2].filter(x => x !== j); return ((i + j) % 2 ? -1 : 1) * (R[r[0]][q[0]] * R[r[1]][q[1]] - R[r[0]][q[1]] * R[r[1]][q[0]]); };
    const det = R[0][0] * c(0, 0) + R[0][1] * c(0, 1) + R[0][2] * c(0, 2), I = [0, 1, 2].map(i => [0, 1, 2].map(j => c(j, i) / det));
    w = I.map(r => -(r[0] * T[0] + r[1] * T[1] + r[2] * T[2])); hgt = w[1];
  }
  const parents = []; for (let n = hi; ;) { const p = J.nodes.findIndex(x => (x.children || []).includes(n)); if (p < 0) break; parents.push(J.nodes[p]); n = p; }
  const plain = parents.every(n => !n.rotation && !n.scale && !n.matrix && !(n.translation && (n.translation[0] || n.translation[2])));
  const off = w ? Math.hypot(w[0], w[2]) / Math.max(.01, hgt) : 0;     // as a fraction of the hip height, so any authored size reads alike
  console.log(f.padEnd(52), w ? 'Hips world ' + w.map(v => v.toFixed(3)).join(' ') + '  off ' + (off * 100).toFixed(0) + '% of hip height' : 'no bind', off > TOL * 4 ? '<- OFF CENTRE' : 'ok', plain ? '' : '(parent transformed)');
}
