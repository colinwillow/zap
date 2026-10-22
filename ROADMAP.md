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

## SANDBOX (in order)
- [x] **m893 ARENA** (`?w=arena`, first on the menu): a little stadium; SPAWN > WARBOSS > Brute Warboss / Skullback beams
      down on the far pad (column + expanding ring of particles), chest thump, then the warrior's brain (`foeAI`) fights you.
      Armour chips and flies off; at zero he is KO'd in slow motion, lies there, beams back up. Armour stays until CLEAR.
- [ ] BRAWL, the rest: Zap (existing controls) vs the armoured Warboss + Skullback. Port from culture_war
      `src/duel/duel.js`: MELEE/GUN AI, RULE, block/parry/guard break, sizeK, ARMOR/armorHit/armorOff/stepDebris.
      Models: culture_war `models/characters/brute_warboss_armor.glb`, `rept_heavy_armor.glb` (armor_<bone> pieces,
      weapon_root/weapon_tip/gun_tip bones), weapons `models/gen/w_brute_cleaver.glb`, `w_rept_maul.glb`.
      Zap's blaster, rocket and hammer all knock armour off.
- [ ] WEAPON FEEL: big kickback that shoves the shooter, dramatic blaster sound, exaggerated impacts.
- [ ] DESTRUCTION: buses and cars whose shell panels come off (buildings already break).
- [ ] TRANSFORMATION: one universal base mesh (Character Creator) wrapped onto every character (headless wrap in the
      pipeline), so human <-> alien <-> Zap disguises are true blend-shape morphs.
- [ ] SCALE: grunts against a big guy.

## CUT (dead code from the story, one system per pass, `npm run check` + a tkit boot after each)
- [ ] remove the PLAIN-skipped builders and their data (farm, islands, gorge, waterfront, ferry, factory, underneath,
      Pearl, ship, camp, carts, site...) and the quest/chapter/save system; then the toon/kit/alien/plaza/weirdport
      world branches; then their notes.
