# THE STONE GUARDIAN -- the four-armed temple boss (his drawings, Oct 29 2026)

> *"He's got four arms, so I don't know if the auto rigger is gonna have that under control... a boss, pretty big. We might have to elongate
> some of his arms, maybe make his head bigger. Maybe he throws boulders. Make him in pieces, so we can knock off his arms and pieces of his
> armour."*

## How he is made (re-run after any change to the source)
    blender-addons/pipeline:  tripo.py out/guardian_3d front left back right --faces 9000     (120 credits)
                              orient.py textured.fbx in.glb -90                                 (faces -Y, grounded)
                              guardian_rig.py in.glb rig.glb                                    (the SCRIPTED rig: Auto-Rig Pro has no second arm pair)
    gltf-transform resize 2048 -> webp -> draco  ->  zap/models/creatures/stone_guardian.glb   (6.8 MB -> 0.9 MB; Tripo's map was 4K)
    zap: node tools/forge.cjs models/creatures/stone_guardian.glb tools/guardian_forge_prof.json models/characters/forged/stone_guardian.glb --lib ../retarget-anims/library/clips
- **The rig:** Mixamo names for hips, spine, neck, head, legs and the UPPER arms (so library clips drive him); a second chain per side for the
  LOWER arms (`mixamorig_LeftArm2` / `LeftForeArm2` / `LeftHand2`, off `Spine1`). No clip touches those: in the game they ECHO the upper pair a
  beat behind (`GUARD.echo`, `GUARD.lag`). Bone positions were MEASURED off the mesh (cross-sections of the arm bands, legs, torso).
- **The weights are RIGID** (each vertex to its nearest bone segment, a short blend only at elbows and knees): he is stone, and one owner per
  vertex is what lets an arm or the head lift out of the skin as a clean piece (`guardTris`, `limbBake`).
- **15 clips** (Mutant idle / walk / run / roar / swipe / punch / jump attack / flex / turns, Throw Object, Stomp, Smash, a hit, a death).

## DONE WHEN (the boss on a white floor, alone)
- [x] He exists as his stone twin first (STATUES.md): grey, still; a blow WAKES him (cracks, dust, a roar). (m15xx)
- [x] Swipe (close), Smash (a ring: jump it), Throw (a boulder at your lead: roll it, or cut it out of the air). (m15xx)
- [x] Four arms come off one by one, each to its own stone; all four gone or no hp and he bursts. A full katana charge takes an arm. (m15xx)
- [ ] Armour plates as their own pieces (today the shoulder plates leave WITH their arm; a plate of its own needs the mesh split by part).
- [ ] The lower arms with moves of their own (a grab, a clap) -- hand-keyed or procedural, since no Mixamo clip has a second pair.
- [ ] A disarmed phase: with no arms he stomps and charges.
- [ ] His arena (a temple floor with height -- the VERTICALITY rule) and the chalice that wakes him.
- [ ] His sign-off on his phone.

## Dials (`GUARD`)
`h` 4.4 m tall · `headK` 1.22 (his bigger head) · `arm2K` 1.12 (the lower arms a little longer) · `hp` 48 · `armHp` 7 · hit frames measured
(the right hand's fastest frame): swipe .48, smash .34, throw .50.
