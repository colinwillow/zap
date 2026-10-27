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

## The queue

| # | building | function | spot | passes |
|---|---|---|---|---|
| 1 | **Dojo Hall** | breakable walls, door, curved hipped roof, bars out front | (0, -7.5) | 1 (m1116) · 2 (m1118) · 3 (m1119) DONE · 4 (m1167) · 5 (m1206) |
| 2 | **Watchtower** | 3 storeys, ladders/ramps inside, a lookout deck, a bar off the top to swing from, a pagoda cap | (-16, -8) | 1 (m1120) · 2 (m1121) · 3 (m1123) DONE · 4 (m1169) · 5 (m1208) |
| 3 | **Gatehouse** | a torii-cyber gate over a passage, walk along its top, a BALLISTA on the roof that fires bolts | (16, -8) | 1 (m1126) · 2 (m1127) · 3 (m1128) DONE · 4 (m1171) · 5 (m1210) |
| 4 | **Pagoda** | five stacked roofs, a stair-ramp spiralling up inside, a bell at the top | (-16, 12) | 1 (m1133) · 2 (m1134) · 3 (m1135) DONE · 4 (m1173) · 5 (m1212) |
| 5 | **Market Stall row** | open-front stalls under awnings, crates to break, lanterns, a noodle-bar counter, bars in the frame | (16, 12) | 1 (m1136) · 2 (m1137) · 3 (m1138) DONE · 4 (m1175) · 5 (m1214) |
| 6 | **Shrine** | a raised platform up stone steps, a glowing core (the Jin), stone lanterns, a balance beam | (0, 24) | 1 (m1139) · 2 (m1141) · 3 (m1142) DONE · 4 (m1177) · 5 (m1216) |
| 7 | **Rampart Wall** | a long walkable wall with crenels, a turret at each end, ramps up | (0, -24) | 1 (m1143) · 2 (m1144) · 3 (m1145) DONE · 4 (m1179) |
| 8 | **Airship Dock Tower** | a tall tower with a landing arm and a docked airship you can walk onto | (-30, 0) | 1 (m1146) · 2 (m1147) · 3 (m1148) DONE · 4 (m1181) |
| 9 | **Zeppelin** | floating zeppelins drifting over the forge, each with a GONDOLA you can JUMP ONTO (low enough to reach from the towers' lookouts and the rampart), a deck that carries you as it drifts, ropes/bars hanging to grab | (30, 0) floating | 1 (m1149) · 2 (m1150) · 3 (m1151) DONE · 4 (m1183) |
| 10 | **Flying Ship House** | a junk-ship hull with a house on deck, floating and bobbing, a gangplank ramp | (0, -40) floating | 1 (m1152) · 2 (m1153) · 3 (m1154) DONE · 4 (m1185) |
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
| 22 | **Siege Yard** | a TREBUCHET that winds and lobs boulders across the forge on a cycle (they smash, knock bodies down; parry? no -- dodge), a ballista battery, a palisade | (-46, -36) | 1 (m1213) · 2 (m1215) · 3 |
| 23 | **Teahouse Garden** | a teahouse on stilts over a pond, a MOON BRIDGE (high arched, walkable) across it, stepping stones, a raked-gravel garden, a stone basin | (-47, 8) | · · |
| 24 | **Kneeling Colossus** | a giant ruined robot samurai statue kneeling, CLIMBABLE: up its thigh, a ramp along its forearm to the shoulder, a lookout in its open head, its sword planted as a bar-strung tower | (38, -44)... far side | · · |

