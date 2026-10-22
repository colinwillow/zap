# ZAP — roadmap

Fresh start (Oct 22 2026), stripped down from `colinwillow/weirdport` (which stays untouched as the archive).
**The model is LEVELS, not a continuous world** (Mario Sunshine style: each level a finished, polished mix of
acrobatics, a little puzzle and fighting). The story (Zap & Clancy, Earth act -> alien worlds act) threads through the
levels later. **Each sandbox is tuned until it feels great on its own before anything is combined** (several can be open at once).

## STEER
- Two worlds only: **WEIRDPORT** (`tkit`, PLAIN: the breakable kit city, the hydrant, the repair crew -- no story) and
  **WHITE BOX** (`test`). `?story=1` still builds the old story layer for reference until it is cut.
- Style: big heads, big hands, stubby, LOUD. Shots kick the shooter back; armour flies off; chunks off everything; never gory.
- Characters and armour come from the pipeline in `colinwillow/blender-addons` (armoured model -> Tripo segment ->
  bare body -> rig + weapon bones -> `armorfit.py`). The arena in `colinwillow/culture_war` (`duel.html`) is the fight lab.

## SANDBOX (several may be open at once; see the WHOLE-PIECE RULE in CLAUDE.md)
- [x] **m893 ARENA** (`?w=arena`): the stadium, SPAWN > WARBOSS > Brute Warboss / Skullback beams down, chest thump, armour
      flies off, KO slow-mo, beam out, CLEAR. This is the STAGE for the duel, not the duel.
- [ ] **DUEL -- OPEN.** Spec and DONE WHEN: `DUEL.md` (the triangle: shield beats shot, melee breaks shield, a shot
      interrupts a wind-up). Builds, in order:
  - [x] a. **m896** his SHIELD (stand-in mesh on `weapon_root_left` until his GLB) + shield state: blocks frontal bolts (spark, clang,
        no damage), raised at a shot after a difficulty-set reaction time; armour only from hits that land.
  - [x] b. **m898** the WIND-UP: a held, glowing, grunting raise before every swing; a bolt during it interrupts (stagger, shield
        down, armour off). He closes the distance fast enough to be a threat (a lunge / charge, not a 1 m/s walk).
  - [x] c. **m896/m898** the GUARD BREAK: Zap's charged hammer on a raised shield knocks it wide; a stagger window. His SHIELD BASH.
  - [x] d. **m898** size: `sizeK` damage + knockback both ways, hitstop on every blow, kickback on the attacker.
  - [x] e. **m898** EXPOSED / desperate phase + the finisher; EASY / MEDIUM / HARD on the arena menu.
  - [ ] f. tune on his phone until he signs it off.
- [ ] **WHITE BOX HUB**: the arena is the one sandbox world; a MODE switch on its menu (DUEL / TRANSFORM / ...), so
      every sandbox lives in one place. (Small; can ride with the DUEL's first build.)
- [ ] **TRANSFORMATION** : `TRANSFORM.md` -- a civilian turns into his alien region by
      region from the wound (veins, bulge, green, armour bursts out, the cry); triggers: drink, alien syringe/beacon, Zap's
      stab/dart, debug toggle; a speed slider.
- [ ] **STUN ZAP**: `STUN.md` -- Zap's stun shot strobes the victim between his body and an x-ray
      SKELETON (one skeleton on the universal Mixamo rig, driven by the victim's pose), then he is stunned; the DNA CLAW
      clips a sample from a stunned body.
- [ ] WEAPON FEEL: big kickback that shoves the shooter, dramatic blaster sound, exaggerated impacts.
- [ ] DESTRUCTION: buses and cars whose shell panels come off (buildings already break).
- [ ] SCALE: grunts against a big guy.

## ASSETS (may run beside the open sandbox)
- [x] **m897** a procedural brute SHIELD (`blender-addons/pipeline/shield.py` -> `models/weapons/shield_brute.glb`, his
      convention: `weapon_root_left` -> `weapon_tip`). A generated one replaces it later.
- [x] **m899** the x-ray SKELETON for the stun zap (`models/characters/xray_skeleton.glb`): his image -> Tripo -> ARP rig ->
      Mixamo names + root. NO FINGER BONES (the finger AI found none: rigid hands). Not used in the game yet (STUN sandbox).
- [ ] generated shields + weapons, **batched**: stack 3-4 weapon images in one picture and generate them in ONE Tripo task
      (he: "you can change the polygon slider so you can generate like four weapons at once"), then split the pieces
      apart in Blender (loose parts) and give each its mount bones. Saves credits.

## CUT (dead code from the story, one system per pass, `npm run check` + a tkit boot after each)
- [ ] the POLICE / heat / stars system (`HEAT`, `COPS`, `copAI`, `heatHit`): switched OFF at m895 (`COPS.on = 0`), delete it.
- [ ] remove the PLAIN-skipped builders and their data (farm, islands, gorge, waterfront, ferry, factory, underneath,
      Pearl, ship, camp, carts, site...) and the quest/chapter/save system; then the toon/kit/alien/plaza/weirdport
      world branches; then their notes.
