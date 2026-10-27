# BUILDINGS -- the Building Forge queue (KORAJIN)

His brief (Oct 27 2026): *"Build retro-Japanese-inspired alien cyberpunk buildings. Each building gets 3 passes. I want them to be great.
Every time you complete the third pass on a building, add it to the inventory I can spawn into the Building Forge, so I can check it out,
run on it, swing on it, blow it up and repair it. Make various TYPES of buildings that are modular and will eventually fit together, with
different functions: bars and ramps, interior and exterior, turrets, ballistae, beams -- floating flying ship buildings, zeppelins, towers."*

## The rules of the loop

- **ONE pass per build.** Pull, read this file, take the first building whose pass count is under 3, do its NEXT pass, `npm run bump`,
  `npm run check`, push to main, tick the pass here with the build number, NOTES.md entry, end the turn. **Shipped unverified** -- no
  headless runs (his rule: he tests, the loop does not).
- **A building is DONE at pass 3**: set its `pass: 3` in `BLDG.list` (index.html) and it shows as done in SPAWN > BUILDINGS.
- **The style** (KORAJIN.md, the Red Hollows): ancient, organic, a little primitive, with mysterious technology embedded -- weathered
  sandstone and plaster, dark timber, red banners with the white diamond spiral, bronze machinery (gears, pipes, lamps), curved roofs with
  upturned eaves, lanterns, cyber accents (a few neon lines, glowing panels), and the turret's goblin-samurai-cyber look.
- **HIS STYLE NOTE (after m1119):** *"Take reference from this dojo white scene and these floating drone things. Wires mixed with future
  drones mixed with ancient shrines mixed with alien tech mixed with off-world gizmos mixed with a zen mountain samurai lodge."* So: the
  arena's clean white-and-grey surfaces and soft light; FLOATING DRONE ORBS (a white egg with a dark ring round it, hovering, bobbing);
  CABLES and WIRES strung between things (sagging, with little lamps or tags on them); shrine pieces (ropes, paper streamers, stone);
  alien gizmos (glowing cores, antennas, dishes); and the zen lodge: dark timber, deep eaves, stone, calm. Ref:
  `images/korajin/ref/forge_style_dojo_drones.webp`. Every building from here gets some of each.
- **AND (his, during m1120):** *"Sentry guns and snowy white-capped mountains with robotic turrets and spider robots and robotic samurai
  guards with bow and arrow on the watchtowers."* So: buildings are MANNED where it fits -- the red ARCHERS (m1103) posted on lookouts and
  walls, the TURRET (m1011) as sentry guns on decks and gates; SPIDER ROBOTS (to build: a six-legged bot that patrols and climbs); and the
  forge's horizon gets a ring of SNOWY WHITE-CAPPED MOUNTAINS (the Refuge's low-poly peaks, whiter). Watchtower pass 2 posts an archer on
  the lookout and a sentry gun on the second deck.
- **AND (his, after m1120):** *"Big fire pits, guard towers and katana masks. And large scale -- everything is big, lots of things that
  are climbable, lots of drawbridges and cross beams, Japanese architecture, perches and different levels, a lot of VERTICALITY."* So from
  here: BUILD BIG (storeys 4 m+, towers 15-25 m, halls you can lose yourself in); every building has MORE THAN ONE LEVEL and more than one
  way up (ramps, ladders, ledges you can climb, bars, beams to run along); CROSS BEAMS and PERCHES jutting out (things to stand on high);
  DRAWBRIDGES (a span that lowers and rises -- the Gatehouse's, the Rampart's); FIRE PITS (big bronze braziers with real flames and
  smoke); KATANA MASKS (giant samurai mask-faces (mempo/oni) on walls and gates, crossed katanas). Later buildings are linked to each other
  by bridges and beams at height, so the courtyard reads as one climbable whole.
- **Every building is PLAYABLE**: breakable walls (`cwallBuild`, they repair), things to swing on (`hbarMake`), things to climb or run up
  (ramps: walkable `triAdd` surfaces, rise <= .32 m a step), an inside and an outside, and where it fits a function (a turret, a ballista,
  a balance beam, a lookout). Code-built and merged per material (draw calls matter on his phone).
- **MODULAR**: each building stands in its own spot in the forge (`at`), on a grid of 4 m units, its doors on its sides' centres, so
  later they can be set side by side into a courtyard.
- **WHEN THE QUEUE RUNS OUT (his, after m1123):** *"If you run out of things to make tonight do another brainstorm pass of another set, and
  then again later if you run out again after that, etc."* So: when every row below is done, spend ONE pass brainstorming the NEXT SET
  (8-12 new buildings / props / moves in his style notes, each with a function and a spot in the forge), append it as a new table here,
  and carry on building. Repeat every time a set runs out. The loop never stops for lack of a queue.
- **AND EXTRA PASSES (his, after m1124):** *"You can also continue with detail passes -- you can do an additional 3 passes on things
  already completed."* So a DONE building may get passes 4-6 (more detail, more function, more delight) -- mark them in its row as
  `4 (mNNNN)` etc. Order of work: new buildings in the queue first; when the queue is out, alternate between brainstorming a new set and
  giving the done buildings their extra passes (oldest first), so the forge gets both new things and better old ones.
- **EVERYTHING THAT SHOOTS CAN BE KILLED (his, during m1128):** *"Don't forget to make the turrets and stuff destroyable -- I could kill
  it."* Every turret, ballista, cannon, spider bot or gizmo that attacks takes katana hits, his shots and its own shots parried back
  (`bldHit` is the hook: add the new weapon there), breaks visibly (sparks, smoke, slumps), stops, and is REPAIRED after a while.
- **Pass meaning**: 1 = the building stands, playable (shell, roof, doors, the main feature). 2 = the details and the function (interior,
  the moving parts, lights, the special feature working). 3 = the polish (proportions, colour, silhouette, one more delight).

## THE 10-PASS EXPERIMENT (his, after m1260)

*"I'm curious to see what 10 passes makes a building look like... go back through what we already have and refine them. A lot of the stuff
-- the spiral blocky stairs -- they're fine, but functionally they're not that functional. I'm looking for much more visually interesting and
much more functional."* He is sending a reference image of a tower. When it lands, it becomes the first 10-pass building (a pass per build,
each pass a real step up in silhouette, material, detail and things to DO), and that result decides whether the rest get the same.

**The image landed (m1262): `images/korajin/ref/red_pagoda_tower.webp`** -- a slender five-storey red pagoda, a railed balcony round
every storey, deep flared roofs with gold edges stepping in as it rises, a spire of rings, a roofed pavilion at its foot, a red fence with
gold flame finials. **The loop takes X rows FIRST, before the R rows, a pass per build, to 10. ORDER: X1, then C1 (the courtyard, which uses X1), then X2, then X3.**

| # | building | the plan, pass by pass | spot | passes |
|---|---|---|---|---|
| X1 | **Great Red Pagoda** | 1 the stack: 5 hollow storeys, a room each, ladders up through hatches (corners turning), a door onto every balcony, deep flared roofs, the spire · 2 the reference's detail: bracket clusters under every eave, lattice panels and railings in the right rhythm, the upturned corner tips, tile ribs · 3 the PAVILION at its foot (the side hall with its own roof) and the red FENCE with gold flame finials round the court · 4 function: the climb OUTSIDE -- eave tips you can catch, bars between balconies, a rope from the spire · 5 the rooms: a different room every storey (shrine, armoury, library, bell room, the lookout) · 6 guardians: archers on the balconies, a sentry in the bell room, killable · 7 the light: lanterns that glow at dusk, a beacon in the spire, the windows lit · 8 motion: wind chimes, streamers, the bell, birds off the roofs · 9 a set piece: ring the bell at the top and the whole tower answers (lanterns run up, the spire flares, a gate opens) · 10 the polish: proportions against the reference, colour, silhouette, draw calls | (90, 0) | 1 (m1262) · 2 (m1266) · 3 (m1267) · 4 · 5 · 6 · 7 · 8 · 9 · 10 |
| X2 | **White Heron Castle** (his second reference, `images/korajin/ref/white_castle_keep.jpg`: a Himeji-style castle) | 1 the mass: a battered (sloped, inward-leaning) dressed-stone BASE 6-8 m tall, the MAIN KEEP on it -- five white-plaster storeys under layered grey roofs, the storeys stepping in, a smaller connected tower and a long white gallery wing on the left, all on the stone · 2 the roofs: chidori-hafu triangular gables and curved kara-hafu gables breaking every roof line, ridge ornaments (shachi fish) at the peaks, the roof edges' rhythm · 3 the walls: small square windows in rows, dark timber window frames, the white plaster with the faint stone shadow, gun/arrow ports · 4 the stone base CLIMBABLE: the battered wall is a giant ramp you can run up (no-tap run-up, m1251) to the first roof, handholds in the stone courses · 5 inside the keep: stacked halls joined by steep stairs (walkable ramps), the great pillar, a lookout at the top · 6 the gallery wing: a long corridor you can run, its roof a path, the corner tower · 7 defenders: archers at the windows, a ballista on the gallery roof, a sentry gate in the stone, all killable · 8 the approach: a winding walled ramp up to a gate in the base (the castle's maze), a drawbridge · 9 the light and life: pines round it (the dressing kit), lanterns, the white catching the sun, flags · 10 the polish: proportions against the reference, silhouette, colour, draw calls | (-108, 45) (big: about 40 x 30 m with its base; clear of the mill spot (-72, 40) -- checked again at pass 1) | · · · · · · · · · · |
| X3 | **Timber Siege Fort** (his third reference, `images/korajin/ref/timber_siege_fort.webp`: a scaffold fortress on a cyclopean stone base) | 1 the mass: a big battered base of ROUGH fitted boulders (irregular stones, not courses) with a dark tunnel GATE through it; on top a tall open TIMBER LATTICE fortress -- three tiers of posts and X-braced frames stepping back, decks at every tier, a small pagoda-roofed watch house crowning it · 2 the lattice detail: every bay X-braced, rails, ladders lashed between tiers, rough-cut timber colour, the white war banners with the black crest (the hwBanner family) on poles at the corners and on the roof · 3 CLIMBING: the X-braces are bars and footholds -- the whole lattice is a jungle gym (bars along the tier edges, ladders, braces you can run up), the base is runnable stone (wall run-up) · 4 the gate tunnel: a portcullis, a passage under the fort into a courtyard behind, a ramp up inside · 5 the work site: leaning poles and scaffolding against the stone (ramps!), timber stacks, a crane, the half-built bay · 6 defenders: archers on every tier, a sentry gun in the watch house, a rock-drop from the top deck, all killable · 7 BREAKABLE timber: cut the braces and bays sag and fall (the kit-style collapse) · 8 the camp round it: palisade, tents, weapon racks, banners down the approach (the dressing kit) · 9 the set piece: fire the watch house and the lattice burns tier by tier, or hold it · 10 the polish against the reference | (-60, 100)? (TBD at pass 1: about 26 x 20 m) | · · · · · · · · · · |
| C1 | **The Courtyard** (his, after m1264, ref `images/korajin/ref/timber_lane_watchtower.jpg`) -- **the plan is COURTYARD.md** | a small organised court (56 x 64 m) that puts the buildings to work: a stone lane between two Timber Lane Halls to a two-roofed Watchtower Gate, a koi pond with a moon bridge, the Great Red Pagoda in a corner, a bell house, a wall-walk all round, rope bridges at height, guards in the towers and on the ground, creatures, fairy dust, sunlight. 10 passes, listed in COURTYARD.md | TBD at pass 1 | · · · · · · · · · · |

## HIS REQUESTS (m1251) -- these go FIRST, ahead of the rest of Set 3

**The loop takes these rows first, in order, three passes each, and does NOT alternate with extra passes while any R row is open** (his, after m1256: *"start the loop again with this new stuff"*). A kit row (R3, R4, R9) is a set of pieces plus a showcase; its pass 1 is the pieces and the showcase.

| # | building | function | spot | passes |
|---|---|---|---|---|
| R1 | **Zoom Ramp Tower** | his: *"a tower shaped like a really tall ramp -- you do the speed run and it's just tall enough that your whole run gets you to the top, and you hit it perfectly; the very top is a rim of high bars or a ledge you just barely grab, then pull yourself up into a guard tower."* A long run-in, a ramp curving up into a sheer face (the ZOOM at full hold meets the face head-on and the no-tap run-up (m1251) carries him up it -- tuned so a FULL zoom just reaches the lip and anything less falls short), a ledge / ring of bars at the top, a guard tower on the summit. A CHALLENGE: a timer, a mark of how close he got | (-60, -56) | 1 (m1254) · 2 (m1257) · 3 (m1258) DONE |
| R2 | **The Four Fires** | his: *"maybe four of these, and you extinguish the fire in each of them, and every time some wheel turns, and eventually it opens the drawbridge to the indoor something."* Four ramp towers (R1 again, each a different line up) round a sealed keep; a brazier burns on each summit -- strike it out and a great gear on the keep turns a quarter; all four and the drawbridge falls and the way INTO the chamber (R3) opens | around R1 | · · |
| R3 | **INTERIOR KIT -- the chamber** | his: *"interior pieces -- modular, so we can build levels where you go inside a giant chamber, like the start of Aladdin, down in the Cave of Wonders, the classic video game underground chamber you move forward through."* A KIT, not one building: a set of interior pieces that snap on the 4 m grid -- corridor (straight, corner, T), a great hall bay (tall, pillared), stairs/ramps down a level, an arch and a door, a pit with a bar across, a ledge run along a wall, a collapsing floor tile, a treasure dais, torches and glowing Jin crystals, a ceiling (the x-ray (m1250) lets the camera see in). Pass 1 = the pieces and one small chamber assembled from them below the forge floor (an entrance going down); pass 2 = the traps and function; pass 3 = the lighting and polish | under the forge | · · |
| R4 | **Floating platforms** | his (after m1251): *"general stuff like floating platforms."* A KIT of hovering stone-and-bronze slabs on Jin orbs (bobbing; some drift on a path, some tilt under his weight, some sink while he stands on them and rise when he leaves, some blink out on a beat) -- to string across gaps and up between the towers | anywhere (a test run near R1) | · · |
| R5 | **Drone sentries** | his: *"floating drone sentry guard enemies."* The forge's drone orbs (`bldDrone`) as ENEMIES: they patrol a beat, spot him (a red eye-beam), and strafe with bolts; killable (`bldHit`), they fall smoking and are rebuilt. Some fly in pairs. Hangs off every building that has a drone today | patrols round the forge | · · |
| R6 | **Crawling spider bots, loose** | his: *"crawling spider robots."* The Spider Hangar's bots (m1161) let OUT: they crawl up walls and over roofs anywhere in the forge, hunt him, pounce, and can be cut apart leg by leg | from the Spider Hangar | · · |
| R7 | **Robot sky dragon** | his: *"maybe a robot Chinese dragon."* A long segmented bronze-and-red dragon that FLIES -- snaking between the towers and zeppelins on a long loop, breathing a fire stream down at him; land on its back and ride it, cut its segments, take the head (the festival dragon (m1243) grown up and set loose) | over the forge | · · |
| R8 | **BOSS ARMOUR -- the beasts and warlords, bigger and modular** | his (after m1252): *"build armour for the guys we have -- the two warlords (not the CEO), the blue dragon, the lightning dragon, the three-headed dog. The dog needs to be WAY bigger, the dragon too, probably everything bigger. Armour pieces that can come OFF them; bulk up the dragons; give the warlords masks and helmets -- so when you meet them at new levels they're more stylised and harder to beat because there are more pieces. Big rock monsters, big machine goblin Jin, armoured warlords; maybe projectile weapons, minions crawling on them, sending out streams of spider attackers and flying drones."* The cast: `WARBOSS` (Brute Warboss) and `SKULLBACK` (Reptilian heavy); `DOG` (h 2.3 -- too small), `DRAGON` (Blue Dragon, h 3.2), `MECH` (Mech Lightning Dragon, h 2.2). **Plan:** (1) SIZE -- a per-kind boss scale (dog ~3x, dragons ~2x), with reach, hit radii and the camera following the size, put on a TOOLS switch so the size is his call; (2) a code-built ARMOUR KIT parented to their bones by name (helm, kabuto with crest, mempo mask, shoulder plates, chest plate, bracers, dragon spine plates and chin guards, a rock carapace) -- each piece has its own hp, takes a cut, CLANGS, and FLIES OFF (the dismember's debris), and the body under it only takes full damage once its plate is gone; an armour TIER per level (0 = bare, 1 = helm and shoulders, 2 = full, 3 = full + rock/machine growths); (3) their EXTRAS: a projectile per warlord, minions riding them (little spider bots on the dragon's back that drop off and crawl at him), and a DEN that spits a stream of spider bots and drones (R5, R6) while the boss lives | the arena's beasts / any level | · · |
| R9 | **DRESSING KIT -- vegetation and filler** | his (after m1255): *"filler things in line with this level: shrubbery, vegetation -- Japanese alien desert vegetation? -- variations that are subtly moving or subtly reactive, stylised and cool; and filler: pots, tables, benches, overhangs, things you stick on buildings; the flag design extrapolated into more, so the worlds feel stylised and cohesive; pergolas, whatever."* A KIT of small code-built pieces, each one draw call per material (instanced when repeated), placed by a `dress(kind, x, z, yaw, s)` call any building or level can use. **Plants** (the Red Hollows palette -- rust, sage, bone, a little Jin cyan): bonsai-pine clumps, red-leaf maple shrubs, spiky aloe-like agaves with glowing tips, barrel cacti with bronze bands, tall swaying reed/pampas tufts, hanging moss and wisteria (purple) off eaves, lantern-fruit bushes whose fruit glows, a crystal-thorn bush, bamboo clumps; all SWAY in the wind (a vertex shader, no per-frame CPU), and REACT -- they bend away as he runs through, shiver when hit, the lantern-fruit pops sparks, and they can be cut down (`bldHit`). **Filler**: pots and urns (smashable), low tables, benches, sake barrels, crates stacked, tea sets, paper lantern stands, stone lanterns (toro), shrine boxes, weapon racks, drums, wind chimes and bells that ring when brushed. **Things to stick on buildings**: awnings and overhangs (cloth and timber), noren door curtains, hanging banners in the white-diamond-spiral family (new variants: vertical nobori flags, a long streamer, a round crest, kanji panels, a torn war banner), rope-and-paper shimenawa, cable runs with tags, AC-like bronze boxes and pipes, neon signs, satellite dishes. **Structures**: a pergola with wisteria, a covered bench, a well, a gate arch, a fence run, steps. Pass 1 = 20 pieces and a showcase garden in the forge; pass 2 = the sway and reactions; pass 3 = dress every building already standing with them | a showcase garden at (60, -60) + every building | · · |

## The queue

| # | building | function | spot | passes |
|---|---|---|---|---|
| 1 | **Dojo Hall** | breakable walls, door, curved hipped roof, bars out front | (0, -7.5) | 1 (m1116) · 2 (m1118) · 3 (m1119) DONE · 4 (m1167) · 5 (m1206) · 6 (m1230) |
| 2 | **Watchtower** | 3 storeys, ladders/ramps inside, a lookout deck, a bar off the top to swing from, a pagoda cap | (-16, -8) | 1 (m1120) · 2 (m1121) · 3 (m1123) DONE · 4 (m1169) · 5 (m1208) · 6 (m1232) |
| 3 | **Gatehouse** | a torii-cyber gate over a passage, walk along its top, a BALLISTA on the roof that fires bolts | (16, -8) | 1 (m1126) · 2 (m1127) · 3 (m1128) DONE · 4 (m1171) · 5 (m1210) · 6 (m1234) |
| 4 | **Pagoda** | five stacked roofs, a stair-ramp spiralling up inside, a bell at the top | (-16, 12) | 1 (m1133) · 2 (m1134) · 3 (m1135) DONE · 4 (m1173) · 5 (m1212) · 6 (m1236) |
| 5 | **Market Stall row** | open-front stalls under awnings, crates to break, lanterns, a noodle-bar counter, bars in the frame | (16, 12) | 1 (m1136) · 2 (m1137) · 3 (m1138) DONE · 4 (m1175) · 5 (m1214) · 6 (m1238) |
| 6 | **Shrine** | a raised platform up stone steps, a glowing core (the Jin), stone lanterns, a balance beam | (0, 24) | 1 (m1139) · 2 (m1141) · 3 (m1142) DONE · 4 (m1177) · 5 (m1216) · 6 (m1240) |
| 7 | **Rampart Wall** | a long walkable wall with crenels, a turret at each end, ramps up | (0, -24) | 1 (m1143) · 2 (m1144) · 3 (m1145) DONE · 4 (m1179) · 5 (m1218) · 6 (m1242) |
| 8 | **Airship Dock Tower** | a tall tower with a landing arm and a docked airship you can walk onto | (-30, 0) | 1 (m1146) · 2 (m1147) · 3 (m1148) DONE · 4 (m1181) · 5 (m1220) · 6 (m1244) |
| 9 | **Zeppelin** | floating zeppelins drifting over the forge, each with a GONDOLA you can JUMP ONTO (low enough to reach from the towers' lookouts and the rampart), a deck that carries you as it drifts, ropes/bars hanging to grab | (30, 0) floating | 1 (m1149) · 2 (m1150) · 3 (m1151) DONE · 4 (m1183) · 5 (m1222) · 6 (m1246) |
| 10 | **Flying Ship House** | a junk-ship hull with a house on deck, floating and bobbing, a gangplank ramp | (0, -40) floating | 1 (m1152) · 2 (m1153) · 3 (m1154) DONE · 4 (m1185) · 5 (m1224) · 6 (m1248) |
| 11 | **Bathhouse** | a steaming pool inside, a chimney, sliding screens | (-30, 24) | 1 (m1155) · 2 (m1156) · 3 (m1157) DONE · 4 (m1187) |
| 12 | **Forge-Workshop** | a bronze furnace glowing, gears turning, a crane arm (a bar) | (30, 24) | 1 (m1158) · 2 (m1159) · 3 (m1160) DONE · 4 (m1189) |
| 13 | **Spider-Bot Hangar** | a low bunker the six-legged spider robots come out of; the SPIDER BOTS CLIMB THE WALLS of every building (his: "spider robots climbing the walls") -- up the faces, across the roofs, over the beams | (-30, -24) | 1 (m1162) · 2 (m1163) · 3 (m1164) DONE · 4 (m1191) |
| -- | **NINJA GRAPPLING HOOK** (his: "ninja grappling hooks to swing between buildings") | a player move, not a building: bronze GRAPPLE RINGS on every building's eaves, beams and lookouts; a gesture (in the air, the right pad flicked UP toward a ring in reach -- the air flick up is free) throws the hook, he swings on the rope like the high bar and lets go to fly; slotted in after the Gatehouse so there are three buildings to swing between | -- | 1 (m1129) · 2 (m1130) · 3 (m1131) DONE |
| -- | **The forge's horizon** | snowy white-capped mountains round the forge (one pass, slotted in after the Gatehouse) | -- | 1 (m1132) DONE |

## Set 2 (brainstormed m1165, after the first set finished)

His style notes still rule: big, vertical, climbable, linked at height, manned and killable, Japanese-alien-cyber. The loop now ALTERNATES:
a pass on the next Set 2 item, then an extra pass (4-6) on a done building, oldest first (Hall, Watchtower, Gatehouse, ...).

| # | building | function | spot | passes |
|---|---|---|---|---|
| 14 | **Sky Bridges** | the first set LINKED AT HEIGHT: a rope bridge Watchtower lookout -> Pagoda storey 3, a timber cross-beam Pagoda -> Airship Dock arm, a swaying plank bridge Gatehouse deck -> Market roof; each with lanterns and rings (spawns only the spans whose two ends are standing) | between | 1 (m1166) · 2 (m1168) · 3 (m1170) DONE · 4 (m1193) |
| 15 | **Cliff Lodge** | the zen mountain samurai lodge: a 12 m rock crag with a switchback path cut up it, a timber lodge on top with deep eaves, a waterfall pouring off the crag into a pool, a lookout perch | (0, 46) | 1 (m1172) · 2 (m1174) · 3 (m1176) DONE · 4 (m1195) |
| 16 | **Moated Keep** | a square keep in a raised stone moat ring; a DRAWBRIDGE you lower by striking the gong at the gate (raise it from inside); murder-holes, a roof turret | (46, 0) | 1 (m1178) · 2 (m1180) · 3 (m1182) DONE · 4 (m1197) |
| 17 | **Robot Samurai Barracks** | a drill yard with training dummies, a long barracks hall, robotic guards drilling in step, a weapon store, an archery butt | (30, -42) | 1 (m1184) · 2 (m1186) · 3 (m1188) DONE · 4 (m1199) |
| 18 | **Jin Lighthouse** | a tall slim tower with a spiral stair outside, a lantern room whose Jin beam sweeps the whole forge, a gallery to walk round, a ring at the top | (-46, 30) | 1 (m1190) · 2 (m1192) · 3 (m1194) DONE · 4 (m1201) |
| 19 | **Floating Islands** | three rock islands hanging in the air on chains, waterfalls off their edges, rope bridges between them, a shrine on the highest; reach them by grapple or a zeppelin | (44, 32) | 1 (m1196) · 2 (m1198) · 3 (m1200) DONE · 4 (m1203) |
| 20 | **Ninja Pillars** | a field of narrow stone pillars at stepped heights (1-8 m) to leap between, bars strung between the tallest, a bell on top of the last | (30, 46) | 1 (m1202) · 2 (m1204) · 3 (m1205) DONE |
| 21 | **Senbon Torii** | a corridor of twenty vermilion torii up a long gentle slope to a small fox shrine; lanterns along it; at night-ish the gates glow | (-30, 46) | 1 (m1207) · 2 (m1209) · 3 (m1211) DONE |
| 22 | **Siege Yard** | a TREBUCHET that winds and lobs boulders across the forge on a cycle (they smash, knock bodies down; parry? no -- dodge), a ballista battery, a palisade | (-46, -36) | 1 (m1213) · 2 (m1215) · 3 (m1217) DONE |
| 23 | **Teahouse Garden** | a teahouse on stilts over a pond, a MOON BRIDGE (high arched, walkable) across it, stepping stones, a raked-gravel garden, a stone basin | (-47, 8) | 1 (m1219) · 2 (m1221) · 3 (m1223) DONE |
| 24 | **Kneeling Colossus** | a giant ruined robot samurai statue kneeling, CLIMBABLE: up its thigh, a ramp along its forearm to the shoulder, a lookout in its open head, its sword planted as a bar-strung tower | (50, -26) (moved: (38, -44) is the Barracks) | 1 (m1225) · 2 (m1226) · 3 (m1227) DONE |

## Set 3 (brainstormed m1228, after Set 2 finished)

Set 2 filled the forge's middle, so Set 3 rings it further out, about 60 to 75 m from the centre. His style notes still rule: big,
vertical, climbable, linked at height, manned and killable, Japanese-alien-cyber, with an inside and an outside. The loop
ALTERNATES as before: a pass on the next Set 3 item, then an extra pass (6) on a done building, oldest first.

| # | building | function | spot | passes |
|---|---|---|---|---|
| 25 | **Oni Gate** | a fortress gate carved as a giant demon face: you go in through its mouth (a portcullis of teeth), its two eyes are turrets that track and fire (killable), horns you can climb to a lookout, a guard room inside each cheek | (-72, 0) | 1 (m1229) · 2 (m1231) · 3 (m1233) DONE |
| 26 | **Jin Observatory** | a tall clockwork tower crowned by a rotating dome with a great telescope; gears and a spiral stair inside, a balcony ring, the dome turns to track whoever is in the open (a beam that marks him for the archers) | (72, -18) | 1 (m1235) · 2 (m1237) · 3 (m1239) DONE |
| 27 | **Lantern Festival Street** | a street of stalls under hundreds of hanging lanterns, a robot DRAGON DANCE parading up and down it (it knocks you aside, it can be cut apart segment by segment), firework launchers you can set off | (72, 30) | 1 (m1241) · 2 (m1243) · 3 (m1245) DONE |
| 28 | **Sky Wreck** | the broken hull of a great flying junk impaled on rock spires, decks tilted, holds to explore, loose cargo to smash, a Jin engine still sparking that blasts you up when struck | (30, -72) | 1 (m1247) · 2 · 3 |
| 29 | **Bamboo Maze** | tall living bamboo walls in a maze (breakable stalks), ninja that drop from the canopy, a moon-gate shrine at the heart with a prize | (-30, -72) | · · |
| 30 | **Waterwheel Mill** | a river channel with a giant waterwheel you can ride round (its paddles are platforms), a mill house with grinding gears inside, an aqueduct on arches walkable at height | (-72, 40) | · · |
| 31 | **Mech Hangar** | a giant bipedal mech under repair in a gantry; climb the gantry levels, the mech wakes and stomps a short patrol (a boss: armour plates to cut off, a core to strike) | (60, 62) | · · |
| 32 | **Sumo Dohyo** | a raised clay ring under a hanging roof, a sumo robot that charges and shoves (ring-out matters: off the edge is a fall), drums and banners round it | (-60, 68) | · · |
| 33 | **Dragon Bell Tower** | a great bronze bell in a tall open tower; ring it and a Jin DRAGON flies a pass over the forge, scattering bodies where its shadow falls | (0, -74) | · · |
| 34 | **Jin Tram Line** | an elevated rail looping the outer ring on pillars with two stations; a tram car runs it you can ride (and jump off anywhere), ladders up to each station | (0, 72) station | · · |
| 35 | **Onsen Terraces** | stepped hot-spring pools down a hillside, each a terrace you jump between, steam geysers that launch you up a level, a bathhouse at the top | (-72, -40) | · · |

