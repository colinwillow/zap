# ZAP — roadmap

Fresh start (Oct 22 2026), stripped down from `colinwillow/weirdport` (which stays untouched as the archive).
**The model is LEVELS, not a continuous world** (Mario Sunshine style: each level a finished, polished mix of
acrobatics, a little puzzle and fighting). The story (Zap & Clancy, Earth act -> alien worlds act) threads through the
levels later. **Keep the scope narrow: one sandbox at a time, tuned until it feels great, before anything is combined.**

## STEER
- Two worlds only: **WEIRDPORT** (`tkit`, PLAIN: the breakable kit city, the hydrant, the repair crew -- no story) and
  **WHITE BOX** (`test`). `?story=1` still builds the old story layer for reference until it is cut.
- Style: big heads, big hands, stubby, LOUD. Shots kick the shooter back; armour flies off; chunks off everything; never gory.
- Characters and armour come from the pipeline in `colinwillow/blender-addons` (armoured model -> Tripo segment ->
  bare body -> rig + weapon bones -> `armorfit.py`). The arena in `colinwillow/culture_war` (`duel.html`) is the fight lab.

## SANDBOX (in order -- ONE open at a time; see the WHOLE-PIECE RULE in CLAUDE.md)
- [x] **m893 ARENA** (`?w=arena`): the stadium, SPAWN > WARBOSS > Brute Warboss / Skullback beams down, chest thump, armour
      flies off, KO slow-mo, beam out, CLEAR. This is the STAGE for the duel, not the duel.
- [ ] **DUEL -- OPEN.** Spec and DONE WHEN: `DUEL.md` (the triangle: shield beats shot, melee breaks shield, a shot
      interrupts a wind-up). Builds, in order:
  - [x] a. **m896** his SHIELD (stand-in mesh on `weapon_root_left` until his GLB) + shield state: blocks frontal bolts (spark, clang,
        no damage), raised at a shot after a difficulty-set reaction time; armour only from hits that land.
  - [ ] b. the WIND-UP: a held, glowing, grunting raise before every swing; a bolt during it interrupts (stagger, shield
        down, armour off). He closes the distance fast enough to be a threat (a lunge / charge, not a 1 m/s walk).
  - [ ] c. the GUARD BREAK: Zap's charged hammer on a raised shield knocks it wide; a stagger window. His SHIELD BASH.
  - [ ] d. size: `sizeK` damage + knockback both ways, hitstop on every blow, kickback on the attacker.
  - [ ] e. EXPOSED / desperate phase + the finisher; EASY / MEDIUM / HARD on the arena menu.
  - [ ] f. tune on his phone until he signs it off.
- [ ] **WHITE BOX HUB**: the arena is the one sandbox world; a MODE switch on its menu (DUEL / TRANSFORM / ...), so
      every sandbox lives in one place. (Small; can ride with the DUEL's first build.)
- [ ] **TRANSFORMATION** (next, after DUEL is signed): `TRANSFORM.md` -- a civilian turns into his alien region by
      region from the wound (veins, bulge, green, armour bursts out, the cry); triggers: drink, alien syringe/beacon, Zap's
      stab/dart, debug toggle; a speed slider.
- [ ] WEAPON FEEL: big kickback that shoves the shooter, dramatic blaster sound, exaggerated impacts.
- [ ] DESTRUCTION: buses and cars whose shell panels come off (buildings already break).
- [ ] SCALE: grunts against a big guy.

## CUT (dead code from the story, one system per pass, `npm run check` + a tkit boot after each)
- [ ] the POLICE / heat / stars system (`HEAT`, `COPS`, `copAI`, `heatHit`): switched OFF at m895 (`COPS.on = 0`), delete it.
- [ ] remove the PLAIN-skipped builders and their data (farm, islands, gorge, waterfront, ferry, factory, underneath,
      Pearl, ship, camp, carts, site...) and the quest/chapter/save system; then the toon/kit/alien/plaza/weirdport
      world branches; then their notes.
