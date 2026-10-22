# The stun zap — the x-ray electrocution

**Status: DESIGN, assets first.** A sandbox after the duel and the transformation (one sandbox open at a time), but its
ASSET can be made now, beside the duel. He owns this file.

*"One of the weapons in Zap's arsenal will be his stun blaster -- his name is Zap. When he zaps someone we flash the mesh
between the NPC and a skeleton and back, so it looks like he's being electrocuted, with effects on top. Then he's stunned
afterwards. You zap them, run up, and if you want to turn into them, a DNA claw melee thing clips their DNA, you stick it in
your own machine, and you turn into whatever."*

## The asset: ONE human skeleton on the universal Mixamo rig

- He draws / picks the skeleton image -> Tripo -> rig it on the **same Mixamo skeleton every human NPC uses** (the pipeline's
  `run_rig.sh`). Because the bones match by name, the skeleton can be driven by ANY human's pose: one file serves every
  civilian, scaled to each one's height.
- `models/characters/xray_skeleton.glb`, no clips needed (it copies the victim's bones every frame).

## How the zap works

1. **The shot**: Zap's STUN mode (a slot beside CHARGE / AUTO on the blaster's wheel, or its own weapon): a crackling arc
   rather than a ball.
2. **The flash**: on a hit, the victim strobes between his own mesh and the skeleton (driven by his skeleton, so it is in his
   exact pose), cartoon x-ray style: a few hard cuts, 8-12 a second, white-blue arcs crawling over him (`spkCling`), a buzz.
3. **Stunned**: then he stands twitching / dazed for a few seconds (`daze`), arms out, sparks dripping. He cannot run or
   fight.
4. **The DNA claw**: walk up to a stunned body and the melee becomes the DNA CLAW: a clip of his DNA (a vial fills on Zap's
   HUD). Later, the machine turns the DNA into a form (the story's real way to get a form; the DNA gun stays debug only).

## DONE WHEN

- [ ] (asset made at m899: `models/characters/xray_skeleton.glb`, 52->22 bones, no fingers) The skeleton GLB on the universal rig, following any human's pose with nothing popping (every civilian checked).
- [ ] A zap strobes him between body and skeleton, with arcs and a buzz, and it reads as electrocution with no words.
- [ ] Stunned for a beat afterwards, visibly.
- [ ] The DNA claw takes a sample from a stunned body (the form use comes with the transformation work).
- [ ] **He played it and signed it off.**
