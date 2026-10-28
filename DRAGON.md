# THE DRAGON RIDE -- his blue dragon, a sandbox of its own

> *"I really wanna build the blue dragon: build some armor for it and a mount, and put it in a little zone where I can mount it and ride it,
> for the part in the game when I tame it, and then play with flying it and controlling it on the ground and making it shoot an attack and
> all that."* (Oct 28 2026)

KORAJIN > **The Dragon Ride** (`?w=forge&zone=dragon`, `DRAGZ` in `index.html`). The zone is a meadow island over a sea of cloud at sunset.
His dragon (`models/creatures/blue_dragon.glb`, x1.8 of its arena size, about 5.8 m) stands on a stone dais at the far end, facing you as you
arrive. Stepping stones climb to a high crag (the take-off perch). Six islands are spread out below, level, above and high above, and five
Jinra hoops hang through the tiers to fly through. Step off the edge and you are put back at the start.

Story: KORAJIN.md, THE BLUE DRAGON (the first mount). This is where the TAMING and the RIDING are built and tuned, before anything takes the
dragon into a level (the WHOLE-PIECE RULE).

## DONE WHEN

- [ ] **1. The zone, and the dragon armoured in it** (m1610): the island, the dais, the climb, the tiers. Pass 2 of the dressing: CAPTURED
      (red lacquer and gold: head plate, bridle, live reins, cantle and saddle lames, pauldrons, a chest plate with our crest, neck and
      tail plates, tail rings and a crescent blade) and EVIL (blackened iron: mask with horns, spiked plates, spiked collar and chain,
      shackles, stolen red Jinra, his hide darkened). TOOLS > DRAGON switches CAPTURED / EVIL / BARE live. *Open: his look at it.*
- [ ] **2. Mount / dismount** (mDRG): a mint ring at his left flank; stand on it and tap the right pad: an arc up into the saddle
      (`in_air`), Grumbo seated in his `driving` clip (no riding clip in his file), the seat pinned to the dragon's Spine1; tap again to hop
      off onto the ring. CAPTURED only. The lens follows behind and pulls back. *Open: his look at it.*
- [ ] **3. Ground riding**: the left pad steers him (his `run` / `idle` clips by speed), the camera behind and above, sized to him.
- [ ] **4. Flying**: take off (from the ground or off the perch), glide and flap with RollerGirl's wingsuit feel (`WING`: lift from speed,
      bank to turn, dive for speed), land. **There is no fly clip in his file**: the wings are posed in code on their bones until he
      makes one.
- [ ] **5. Attacks**: the right pad breathes the fireball (m1096) from his head (`attack_ground` on the ground, `attack_air` in flight), Grumbo's
      gun from the saddle, targets in the zone to hit.
- [ ] **6. Taming**: he starts WILD (the EVIL look, will not be mounted); give him good Jinra and he goes `dizzy`, `wake_up`, turns CAPTURED and
      kneels to be mounted.
- [ ] **He played it on his phone and signed it off.**

## Needs from him

- A **fly cycle** for the dragon (a flap and a glide) -- the GLB has `attack_air, attack_ground, casual, death, dizzy, entrance, hit, idle,
  run, wake_up` and nothing that flies.
- Any **riding clips** for Grumbo (seated, holding the reins, leaning into a turn).

## Facts (measured off his file)

- 1 skinned mesh, 1 material (`blue_dragon_texture`), Bip001 biped rig. He faces **+Z** (head z +0.024 against pelvis -0.007 in the bind
  pose), `+X` is his left, like everything else here.
- The wings hang off the forearms: `bone22..bone27` (the leading edge) and the finger chains `Bone001..`, `Bone008..`, `Bone013..`,
  `Bone020..`, `Bone025..`, `Bone030..`. The tail is `bone01..bone06` off the pelvis; `bone08` / `bone10` are on the head (the jaw).
