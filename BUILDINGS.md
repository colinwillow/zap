# BUILDINGS -- the Building Forge queue (KORAJIN)

His brief (Oct 27 2026): *"Build retro-Japanese-inspired alien cyberpunk buildings. Each building gets 3 passes. I want them to be great.
Every time you complete the third pass on a building, add it to the inventory I can spawn into the Building Forge, so I can check it out,
run on it, swing on it, blow it up and repair it. Make various TYPES of buildings that are modular and will eventually fit together, with
different functions: bars and ramps, interior and exterior, turrets, ballistae, beams -- floating flying ship buildings, zeppelins, towers."*

## THE PROP LIBRARY (his, Oct 28 2026; PROPS.md)
*"Plants, pots and pans, tables, benches... rocks, water features, fountains, fences, ladders -- detailed passes on all of those tertiary items."* About ten passes each; each family gets a sandbox.
- [x] **plants pass 1 (m1425):** SPAWN > BUILDINGS > Plant Library: cherry, pine, saguaro, agave, bamboo, fern, Jin bulb, grass. Wind sway; a katana, a bolt or walking through bends them and they spring back
- [ ] plants pass 2: real silhouettes per type (PROPS.md has the ten-pass plan)
- [ ] rocks, water, courtyard, fences and blocks, household, climbing: each its own sandbox, pass 1 each

## THE GROUND (his, Oct 28 2026: *"the grass is very low quality... flat where it should be flat, a courtyard, but grassy knolls should have variation... paint the grass, add little alien plants, rocks, dirt"*)
- [x] **pass 1 (m1437):** knolls outside what is built (`floatIsland` `knoll`/`flatR`); the painted ground (`isl4Mat`); new grass tufts; flowers, alien fronds and stones; every dressed island in the dojo scattered from the plant library
- [x] **pass 2a (m1440):** the knolls' facets: the island tops are shaded SMOOTH (shared normals, `smoothTop`); the undersides keep their rock facets
- [x] **pass 3 (mXXXX):** the landmasses broken up: a dense blade carpet, tall seed grass, leafy shrubs (some in bloom), mossy boulders, fallen sticks, grassy mounds, the library's swaying cherry and pine, and a FRINGE round every rim (grass, fronds, rocks sunk in the lip)
- [ ] pass 2b: the knolls' FACETS (the icosphere top is coarse: a finer top grid, or a displaced disc), stronger worn dirt paths between built things, moss on the shade side of rocks
- [ ] pass 3: grass that thins near paths and thickens in hollows; puddles; fallen petals under the cherries
- [ ] pass 4: the same ground in Grumbo's home and the forge buildings (one shared ground kit)

## THE CREATURES, PASS BY PASS (his: *"individual passes on the animals themselves, a bunch of passes on each, because the first pass on anything is never good"*)
- [ ] sky whale (dojo, pass 1 at m1413): pass 2 -- a real silhouette (a heavier head, a jaw line, barnacle and Jin markings, a slower roll)
- [ ] sky manta (dojo, pass 1 at m1417): pass 2 -- a thicker body, a curled cephalic fin, a proper underside, wings that ripple, not fold
- [ ] serpent fish (the Ship, Worker A): its own passes in the Ship's list
- [ ] serpent-dragon (not built)


## THE DOJO (his, after m1390) -- the arena becomes the floating samurai dojo; many passes

> *"Start making the arena the dojo, more in line with the game aesthetic: our texture maps, our architecture -- take reference from his home and the
> flying ship. More Japanese, more samurai, more flying: flags, hovering platforms, without obstructing. Clear the space entirely (stuff available to
> spawn in); little altars on the sides up high -- the triple-sword altars -- flags on the other corners, 90 degrees round the circle; instead of a
> stadium, big decorative architecture, the Japanese roofs with that layering."*

- **Where:** KORAJIN > The Arena (`?w=arena`). `?arena=lab` brings the old stadium back.
- [x] **pass 1 (m1394):**
  - a floating timber disc ringed in red lacquer on a stone dais, with a red-post rail and a rock root below
  - a sea of cloud under the Ship's sunrise sky
  - TWO SWORD ALTARS hovering high (N/S: three katanas on a rack under a two-tier roof, lanterns) and TWO BANNER MASTS (E/W: waving red chevron cloth)
  - FOUR PAGODAS on floating rocks on the diagonals (three tiers, upturned eaves, red fascias)
  - seven drifting stone platforms
  - the middle CLEARED (no cover walls); everything still spawns from SPAWN
  - a boss enters by the beam
- [x] **pass 2 (m1400):**
  - four red TORII on the diagonals at the rim, framing the pagodas (curved black kasagi, nuki, gold plaque, stone feet)
  - LANTERN STRINGS sagging from each banner mast to the torii beside it
  - SOFFITS under every roof, and lanterns at the pagodas' lower eave corners
  - a MITSUDOMOE crest (red, in a gold ring) inlaid at the centre
  - PINK PETALS drifting on the wind
  - the vending machine no longer stands in the dojo at the start (VEND still places one)
- [x] **pass 3 (m1402):**
  - OFF THE EDGE: fall off the platform and you're put back at your pad
  - the altars REACHABLE: three floating stones from an opening in the rim up to each altar, and the altar disc is a floor
  - the seven drifting platforms are STANDABLE and carry you
  - `npm run check` now boots the arena and forge too (`check:worlds`)
- [x] **pass 4 (m1407): NO MORE CONES.** Every floating rock is a `floatIsland` (shared, see NOTES):
  - an irregular, notched outline
  - a grass/dirt top
  - a cliff band, then lobed undersides cracked and banded in strata, with moss at the rim
  - dressed with cherry and pine trees, boulders, shrubs and hanging roots
  - the platform's own island, the altars', the stepping stones', the pagodas' and the drifting platforms', plus twelve art-directed scenery masses (two great ones, a chain of medium, small rocks)
- [x] **pass 5 (m1410): HIS VOCABULARY, not borrowed Japanese** (ARCHITECTURE.md):
  - the pagodas become HERO HALLS: sandstone domes, the red-and-cream tent cone, bronze stacks, a brass wheel, a scaffold front with an awning and box lanterns, bunting, a banner, portholes, the crane and orb
  - the torii become timber-and-iron GATES with wheels, banners and lanterns
  - the paper-lantern strings become BUNTING
  - the altars get tent canopies
  - the floor crest is the ship's SQUARE SPIRAL
- [x] **pass 6 (m1413):** three hero-kit sky junks circling (red-banded hulls, square-spiral sails, bronze thrusters, lanterns) and the first SKY WHALE (lathed, undulating, under the disc). Still open from this line: his ship, the manta, the serpent-dragon, waterfalls
- [x] **pass 7 (m1417):** the weave: a five-tier HERITAGE PAGODA on the great west island (his: classical and the hero kit both exist), WATERFALLS off both great islands, and the second creature, a SKY MANTA that flaps and banks between the islands. Still open: his ship, the serpent-dragon
- [x] **pass 8 (m1419, his: atmosphere):** big fluffy cumulus banks, god rays down the sun's line, ~70 rising paper sky-lanterns, gold and cyan fairy flecks over the floor, a sun glow, and broken-up glowing fog (noise-eaten cards, peach toward the sun, lavender away). One draw per layer
- [x] **pass 9 (m1422, his: THE JIN GLOW):** the mint Jin essence (KORAJIN.md): 30 floating JIN CANDLES round the rim, the pagoda island's spring pours Jin, and the katana's trail is Jin and sheds motes (TOOLS > TRAIL)
- [ ] pass 6b (his, after m1403):
  - the scene: his SHIP in the background, smaller flying ships, AIR CREATURES (one at a time: an alien whale, a manta, a serpent-dragon), and waterfalls off the big islands
- [x] **pass 10 (m1430):** the gates are ENTRANCES. A floating stone landing outside each gate, a timber bridge, and the rail open there. A boss arrives on a landing in a burst of Jin, crosses, walks in through the gate, taunts and leaps in (TOOLS > ENTRY: DOORS; BEAM is the old drop-in)
- [ ] pass 8 (rest):
  - ~~the gates as ENTRANCES~~: bosses walk in through a torii (a DOORS entry for the dojo)
  - ~~something AT the altars~~ -> **pass 11 (m1434):** step onto an altar and it ANSWERS: the bronze wind-chime swings and rings, a Jin ring rises off the disc, a glint runs the top blade, the katana comes out, and the blade is Jin-blessed for 20 s (4x the motes). It re-arms when you step off
  - (was) something AT the altars: take a katana from the rack, a chime, a glint on the blade
  - lit lanterns at dusk
- [x] **pass 12 (m1440):** TRAINING MARKS painted on the floor: stance footprints in a ring, chalk drill rings, dark scuff swirls, four numbered start marks (一 to 四) by the gates
- [ ] pass 4: life: birds, the clouds moving under you
- [ ] later: the training-dojo function (racks you take weapons from, targets that pop up, a sparring master), the music

## THE ELEMENTS (his, after m1382) -- sandboxes for water, snow and air

> *"Half of a video game is the visual. One thing that would be super fun is a convincingly good snow simulation: you're trudging through the snow, the
> tracks, the snow piles up, but there's also snow in the air, bouncing off your character, fluttering -- super elegant, beautiful... We're gonna have a
> few water simulations, a lot of air -- floating buildings, floating zeppelins. I want to get these different elements going."*

- **WATER:** THE SHIP's sea (Worker A's track above).
- **SNOW: KORAJIN > The Snowfield** (`?w=forge&zone=snow`).
  - [x] **pass 1 (m1384):** the deformable pack, the flakes, and the drag:
    - knee-deep snow on a 640² depth map, displaced in the shader
    - feet carve tracks, the body ploughs, rolls and landings dig craters, rims pile up, and snow falls back in
    - hollows tint blue, and sparkles twinkle as you move
    - deep snow drags at you
    - 5000 flakes flutter in a gusting wind and BOUNCE off his body
    - footsteps and landings kick up puffs
  - [ ] pass 2:
    - snow that SETTLES on him (his shoulders and head whiten while he stands, shaken off when he moves)
    - his breath fogs
    - drifts and banks with varied depth (wind-shaped), a frozen pond to slide on, and pines that drop their snow when you hit them
    - the sound of crunching
  - [ ] pass 3:
    - wind-blown spindrift sheets along the ground
    - a blizzard that comes and goes
    - deep powder you sink into (to the waist) and dive through
    - footprints that read as real prints (heel and toe)
- **AIR:** (later) floating islands, zeppelins and wind currents to ride.

## GRUMBO'S HOME, PROCEDURAL (his, after m1376) -- its own track, many passes
**HIS RULE (after m1429): every element gets a MINIMUM OF THREE PASSES** (*"we'll do a few passes on everything we do. Minimum 3 passes, max a million"*). The tally so far: the house 1-17 (many), the rocks 18, 22 (2 of 3), the pier and canoe 19, 21, 24 (3 of 3), the plants and ground 20, 23 (2 of 3).

> *"These are the images I used to make the Tripo model of his home, but building it procedurally is going to be better, so we can go inside and add
> stuff and it's all in the same game style. Dedicate one of the context windows to it; a ton of passes to make it really cool, as true to the design
> as we can be."*

- **References:** `images/korajin/ref/grumbo_home_1..4.jpg` (four views).
  - **The shape:** a cluster of rounded cream sandstone domes and towers with purple spots and round windows, on a boulder mound with cacti and succulents.
  - **On top:** a red-and-cream tent cone on a timber frame with brass ship's wheels; a bronze stack/chimney on either side; a balcony tower with a red canopy (one side); a timber crane with a hanging brass orb and red tassel (the other side).
  - **Round the base:** timber scaffold frames with red chevron/diamond banners and torn awnings; lantern-lit market stalls of pots and crates; wooden steps up to an open shop front and a round door; a ladder; a ramp.
- **Where:** it replaces the GLB hut in THE RED HOLLOWS (`HOME.hut`, `models/buildings/korajin_bld_01.glb`, at [0, -7]), with a switch to compare against the GLB.
- **Passes:** the massing and walkable shell first, with an INSIDE (a room with the shop front and his quarters, stairs up to the balcony); then the timber frame, awnings and banners; then the crane, tent, wheels and stacks; then the dressing (pots, lanterns, cacti); then the look (materials, and textures when the texture maps exist).
- **Textures:** OpenAI image generation is reachable (the key is the environment's), but the account is OUT OF CREDITS (`credit_balance_exhausted`, m1376). When he tops it up: tileable wood, sandstone, stone, marble, metal and red cloth.
- **Built in code: `GHOME` / `ghomeBuild` (WORKER B).** It replaces the GLB in the Red Hollows. `?hut=glb` brings the Tripo model back to compare.
  - [x] **pass 1 (m1380):** the massing and the walkable shell, with an inside:
    - the boulder mound and its steps (.30 risers);
    - the HALL: the shop front, the round back door, a screen wall between the shop and his quarters, a counter, a bed, a table;
    - the balcony TOWER: a spiral stair inside (.30 risers) up to a railed balcony on a mushroom ledge;
    - the STORE wing;
    - round windows; the sandstone's cream, speckle and purple spots as vertex colour.
  - [x] **pass 2 (m1383):** the timber scaffold (iron-banded posts, beams, braces), two stall decks under sagging torn awnings (walkable), the big V-hemmed chevron banner and four post banners, a ladder up the store to its dome, the long ramp off the right deck
  - [x] **pass 3 (m1385):** the tent cone (eight panels on a banded drum, poles crossing past the apex, a stacked finial), four brass ship's wheels, two bronze stacks, the crane with its brass orb, red tassel and weights, the balcony canopy, the tower's flag
  - [x] **pass 4 (m1387):** the dressing -- pot-heaped stall racks and crates, rows of glowing lanterns and brass bells under the beams, the shop's lit shelves and a warm light, saguaros, prickly pears and agaves round the mound, more boulders
  - [x] **pass 5 (m1388):** the look -- main's tileable sandstone (triplanar) on every shell and boulder, timber and planks, the walls lathed to BULGE, timber floors inside, the flag turned to the front
  - [x] **pass 6 (m1390):** life -- the banners, flag and awnings flutter in the wind (vertex shader, most at the hem), the crane's orb swings on its chain
  - [x] **pass 7 (m1392):** the shapes -- the tower steps in to a turret at the balcony (a walkable shoulder), a squatter hall under the cone, timber bands at the domes, red tassels
  - [x] **pass 8 (m1395):** his quarters lived in -- a bed with a red blanket, a woven rug, a brazier of glowing coals with its own light, his katana on a rack, a chest, a table and stools; the store stacked with barrels, sacks and crates; the screen wall moved forward to give the quarters room
  - [x] **pass 9 (m1396):** the refs' two smaller blob domes (front-right, back-left) with round windows; the round back door's real leaves (`bgateMake`: open as he comes near, shut behind); lanterns at the back door and on the balcony
  - [x] **pass 10 (m1397):** the rigging -- sagging ropes from the cone's poles to the frame, the stacks, the tower and the crane; a red-and-cream pennant line from the tower's flagpole to the cone; iron-strapped timber cladding over the shop front
  - [x] **pass 11 (m1398):** the windows -- every round window sunk in a lavender surround, and more of them round the hall, the store, the tower and the turret; the turret's LOOKOUT (a brass telescope at its window, cushions)
  - [x] **pass 12 (m1401):** smoke from both stacks (one point cloud, puffs rising, drifting, dying), the shop and brazier lights flicker
  - [x] **pass 13 (m1405):** one shared bronze / glow / red across the passes (33 -> 26 draws); the iron GEARBOX under the big wheel with a brass cog above it; the low SIGNBOARD on two posts at the front-left (ref 1)
  - [x] **pass 14 (m1406):** blows reach the home (main's m1403 hook): the back door breaks and mends, the orb is knocked swinging (a real pendulum now -- its sway had been inside a comment since pass 9), each stall bell rings
  - [x] **pass 15 (m1408):** THE BACK (ref 2): an iron-studded timber belt round the hall's back half with two brass wheels and two plaques on it, the big chevron banner and a narrow one, red tassels, the back door framed in timber under a round arch
  - [x] **pass 16 (m1412):** BREAK UP THE STONE (his note on the back view): a torn red hood and a timber sill on every round window, a timber cage of ribs on the tower's drum, the turret and the store, studded timber straps over all three domes, plank eaves where the hall and the store meet their domes
  - [x] **pass 17 (m1415):** RAISE / LOWER: strike the crane's winch and the orb is paid out on a cable down to head height (1.7 m/s, a thud as it arrives, the pendulum lengthens with it); strike it again and it winds back up
  - [x] **pass 18 (m1421):** ROCKS, NOT EGGS (his note): every boulder round the mound and the valley's red boulders and hoodoos rebuilt by `ghRockGeo` -- noise-pushed, flat-topped, sunk, cut with strata, leaning; the home's in clusters (a big stone, smaller ones leaning on it, pebbles)
  - [x] **pass 19 (m1424):** THE FISHING PIER (his ask): straight out from the shop steps, planks following the bank down then level over the stream, posts to the bed, a rail, a T-head mid-stream with lantern posts, a stool, a bait barrel, rope coils and a rod with its line and float; his ALIEN CANOE moored alongside (upswept prow and stern, brass gunwales, swept fins and a tail fin, lavender runes, two glowing hover discs), riding the waves
  - [x] **pass 20 (m1429):** PLANTS AND GROUND (his ask): low sandstone shelves half-buried round the home (flat ground only), and a planting thinning out from the mound -- sagebrush, golden grass, yuccas with cream flower spikes, lavender alien bulbs on curling stalks -- with reeds and cattails along the waterline
  - [x] **pass 21 (m1432):** THE PIER AND CANOE, second pass: weathered planks (mixed timber, each a little off, one missing), X-braces and bracing under the deck, bollards, a ladder into the water, a fish drying rack and a crate of fish, a BELL at the pier's foot that rings, a fish that leaps off the T-head now and then; the canoe gets a brass engine pod with a glowing exhaust, a prow lantern, a furled wing-sail on a mast, a basket and a rug, breathing runes, and it ROCKS when struck
  - [x] **pass 22 (m1436):** THE ROCKS, second pass: their own desert-sandstone colour (`ghStrata`, per vertex) instead of the house's stone -- rust / ochre / cream strata bands that stay level across neighbours, dark varnish streaks down the steep faces, sun-bleached tops, speckle; the valley's boulders and hoodoos take it too
  - [x] **pass 23 (m1442):** THE PLANTS, second pass: the grass and reeds SWAY in the wind (a per-blade height attribute drives the shader), fuller drifts of golden grass, gravel patches of sandstone chips, and a TUMBLEWEED that rolls and hops along the beach every so often
  - [x] **pass 24 (next tick):** THE PIER AND CANOE, third pass: the hung catch slimmed into fish (tails, eyes), a red cloth canopy over the T-head's shore half, a fishing net draped over the rail with floats; every 18-38 s the CANOE LIFTS half a metre on its discs, hangs dripping with its runes blazing, and settles with a splash. **Also fixes m1442, which threw on every frame in the home** (see NOTES)
  - [ ] then more passes, each one closer to the four views

## THE SHIP (his, after m1372) -- its own track, alongside the blueprint work

> *"A classic retro pirate, samurai, alien water vessel just floating in an ocean scene... the island could just be there... interior, exterior,
> sails you can climb up on. I'm going to make it transform into an airship -- floating in the water and in the air -- but start it as a literal
> classic Viking alien pirate ship floating in the water, with sunrise and really beautiful water shaders."*

- **Where:** KORAJIN > **The Ship** (`?w=forge&zone=ship`): the forge as a SEA, an ocean shader to the horizon, a sunrise dome, and the ship.
- **Passes** (the forge's 1-2-3 and then more; he will want many):
  - [x] **pass 1 (m1373):** the sea and sunrise, plus the ship standing and playable:
    - a lofted hull, the deck and bulwarks
    - the stern castle with its cabin inside and a pagoda house on top
    - the forecastle and the ramps
    - three masts with junk sails, crow's nests and rope ladders
    - the dragon prow, lanterns and bronze guns
  - [x] **pass 2 (m1374, WORKER A):** the ship RIDES the swell (pitch, roll, heave, with the decks carrying him); the hold below deck (an interior you drop into); sails you can CLIMB (the battens as rungs) and run along the yards; a rope swing between the masts
  - [x] **pass 3 (m1375, WORKER A):** the water's foam round the hull and a wake; spray off the bow; the sun on the water; gulls; the island on the horizon
  - [x] **pass 4 (m1377, WORKER A):** his looks notes -- the stair-stepped shadow bands and the z-fighting fixed; REAL SURFACES (authored tileable textures: deck planks, hull timber, brass, red lacquer, slate roof tiles, the sail's canvas and key crest)
  - [x] **pass 5 (m1378, WORKER A):** the ALIEN-SAMURAI AIRSHIP look (his reference sheet): anti-grav turbines with blue cores along the hull and astern, a horned dragon figurehead, the stern castle as a tiered pagoda, banners and hanging lanterns, rigging, brass fittings
  - [x] **pass 6 (m1386, WORKER A):** onto the SHARED painted texture library (`triMat`); a detail pass -- helm, capstan, bell, balustrade, gun ports, lantern strings, pennants, sheets, sea chests, rope coils, the dragon's whiskers
  - [x] **pass 7 (m1391, WORKER A):** another detail pass -- the ANTI-GRAV CORE ROOM in the hold, the captain's cabin dressed, ratlines, crow's-nest and stern lanterns, a bronze cornice, core and turbine sparks, flying fish
  - [x] **pass 8 (m1393, WORKER A):** his reference's SKY -- floating islands with pagodas and waterfalls, a ringed planet, drifting clouds; a smoking galley chimney
  - [x] **pass 9 (m1399, WORKER A):** flags that FLOW -- every banner and pennant is cloth (a travelling wave from the hoist, a shared gust); real pennants on masthead staffs with swallow-tails
  - [x] **pass 10 (m1404, WORKER A):** the SCENERY REBUILT (his: *"a cone flipped upside down... so goddamn geometric... the island is just a circle"*) -- `shipIsle`: eroded outlines with coves, painted ground, strata undersides that drip into lobes, floating chunks, vines, mixed trees with cherry blossom; the sea island with a mountain, beaches, surf on its real coast, sea stacks, and a HARBOUR (pier, houses, torii); eight floating islands; the haze pushed out
  - [x] **pass 11 (m1409):** more FOAM on the sea (whitecaps, streaks) and the first BIG SEA CREATURE: a giant alien whale that surfaces, blows and dives (his: *"one big sea creature at a time"*)
  - [x] **pass 12 (m1416):** a long serpent-fish that arcs up and down through the swell
  - [x] **pass 12b (m1433):** the serpent REBUILT -- one continuous scaled skin, a membrane fin with spines and a tail fan, flapping pectorals, a lofted head (brow, hinged jaw, teeth, sunken eyes, frills, horns, whiskers)
  - [x] **pass 12c (m1439):** the serpent in PAINTED textures -- skin (spine scutes, iridescent scales, belly plates), glowing lateral line, spined fin membrane, slit-pupil eye
  - [x] **pass 12d (m1448):** the SEA DRAGON from his reference sheet -- textures generated from the sheet (mosaic scales, cream belly, torn red-orange fins, gold eye), a horned fanged head with a red mouth, and the REAR: the neck rises straight out of the sea, head level on top
  - [ ] pass 13: manta rays that swim AND fly (for the airship sky too)
  - [ ] later: other ships about (junks under sail), a bigger land harbour; air creatures for the airship (his: flying fish, serpent-dragons, pterodactyls)
  - [ ] later: swimming here; the AIRSHIP transform (his)

## STEER 000 (his, after m1372) -- BLUEPRINTS FIRST, GENERATED BLOCKOUTS, NOT A TRANSCRIBED IMAGE

> *"Primary markers, secondary between them, tertiary between those -- little dynamics inside medium inside big... figure out how to generate
> a good grid blockout of these in three dimensions... You built my level very literally from a test image. We need to design really interesting
> blueprints that we can scaffold and build around."*

- **The method:** LEVELDESIGN.md, "THE BLUEPRINT". Three scales (stations, runs, texture), a planned height profile, a measured MOVE TABLE, a parametric CHUNK LIBRARY, a seeded SOLVER, a reachability CHECK, and a PREVIEW page for him to pick from.
- **OMAKASE (LEVELDESIGN.md):** a level serves a VERB BUDGET (one new verb per level, taught and then kept), one way in, dead ends on purpose, the illusion of choice by branches that rejoin and vistas, and no info dumps. The blueprint gains `verbs:` and `serves:`.
- **The loop STOPS adding passes to the transcribed Level 1.** Its work, in order:
  1. the move table
  2. the chunk library
  3. the blueprint format, solver and check
  4. the preview
  5. Level 1 v2 from a blueprint
- **Progress:**
  - step 1, the move table: DONE (m1376, Worker B)
  - step 2, the chunk library: pass 1 DONE (m1389, SPAWN > Chunk Library: walk them)
- **Level 1 (the sketch) stays on the menu** to compare against.

## STEER 00 (his, after m1369) -- BUILD A LEVEL IN LAYERS, AND EACH LAYER HAS TO HOLD UP ON ITS OWN

> *"I spawn in and I'm just getting hammered with cannonballs before I've even moved. I need to be able to walk the level first and foremost.
> We need to sit and plan how a level layers together."*

The method (written up in LEVELGRID.md, "THE FIVE LAYERS"):
1. **THE RUN:** a ninja parkour centre. No weapons, no enemies, no puzzle: running, jumping, flipping, swinging, climbing, wall runs, (swimming). It has to be a FUN LEVEL by itself.
2. **THE PUZZLE:** which pieces of the cookie open the cookie jar. This opens that, that opens the next, and the final one opens the boss gate. Designed, not literal.
3. **THE ENEMIES:** placed to GUARD the key areas of layer 2 (buttons, doors, abilities, the boss approach). **Each enemy has a ZONE**, a circle round what it guards, and its reach stays inside it. Nothing fires at you from across the map, and nothing hits you at the spawn.
4. **THE THEME:** what sets this level apart (air world, puzzle world, enemy-heavy, water world, vehicles, co-op...).
5. **THE BOSS:** the final arena, a big open dojo, and the boss of the level.

**Each layer is built in turn, and each must still play with every layer under it.**

- **In the game (m1371):** KORAJIN > **Level 1 -- The Grid** on the title menu opens it on its own. A LAYERS bar sits at the top: L1 RUN is always on, and L2 PUZZLE, L3 ENEMIES, L4 THEME and L5 BOSS toggle (saved). Each tap rebuilds the level from S. SPAWN > BUILDINGS still spawns everything else round it.
- **The rubric is LEVELDESIGN.md** (his layers checked against Nintendo's four steps, Boss Keys locks and keys, Dark Souls loop-backs and MMO leashes). It adds a LAYER 0 (measure the moves first) and lists the next layer-1 passes: measure, teach then test, rests and checkpoints, the keep as landmark.
- **The loop works on LAYER 1 of Level 1 until he signs it off.** No new enemies, gates or bosses until then.
- **Already known about layer 3:** the catapults (55 m reach), the perch archers and the guns have no zones. They get zones before layer 3 is his to judge.

## STEER 0 (his, after m1356) -- THE GRID LEVEL FIRST, AND AS MANY PASSES AS IT TAKES

> *"We do as many freaking passes on this as we need to. Build one level at a time, scoped fairly moderately, and keep iterating over and over
> until the game logic feels amazing -- then we embellish with the stuff we've built. And we want a lot of verticality. A LOT of verticality."*

- **The loop works on GRID LEVEL 1 (LEVELGRID.md, `LVG1`) every pass, until he says it plays amazingly.** S2 (rescaling) and S3 (breakable skins) wait behind it.
- **Logic before art:** each pass makes the ROUTE better (the order of beats, the reasons to go up and down, the reveals, the shortcuts, the risk), not the looks. No kit pieces, no dressing, until he signs off the logic.
- **VERTICALITY:**
  - heights to Y 6 (27 m)
  - the path crosses OVER and UNDER itself (pads on pillars, open beneath)
  - climbs of every kind: ramps, ladders, wall-run faces, grapple rings, bars
  - drops and ziplines down
  - a view from the top of where you have been and where you are going
- **Each pass: one clear change to the level, a NOTES entry saying what it changes and why, and LEVELGRID.md kept as the plan.** His notes become the next pass.
- **The pass log** (tick here):
  - L1 pass 1 (m1356): the greybox system and his blueprint's path
  - L1 pass 2 (m1357): verticality
  - L1 pass 3 (m1358): wall runs (vertical, three-part horizontal over a pit), high bars
  - L1 pass 4 (m1359): moving platforms (carry) up to a rope
  - L1 pass 5 (m1360): archer/gun perches across the gaps
  - L1 pass 6 (m1361): the boss keep on stilts -- break its four legs and it falls
  - L1 pass 7 (m1362): three catapults on the ground lobbing up at the high moves
  - L1 pass 8 (m1363): a long bar to shimmy across a pit (monkey-bar greybox)
  - L1 pass 9 (m1364): a zeppelin deck from the roof across the level to a high pad
  - L1 pass 10 (m1365): a 75 m zip from the zeppelin pad to the boss door
  - (m1368: FIX -- Grid Level 1 threw on spawn since m1359; passes 4-10 reach him only now)
  - L1 pass 11 (m1369): the keep wakes (3 guards) and drops one per broken leg
  - ...

## STEER (his, after walking X4, Oct 27 2026) -- OUTRANKS THE QUEUE BELOW

> *"We need to increase the scale yet again -- maybe start with 1.5. The stairs on the ground floor are so steep I couldn't climb; I had
> to jump from one stair to the next... I would make everything bigger. We need room to play. It needs to feel good. Think God of War:
> everything's huge and you're small but powerful -- the enemies are like 100 times your size. You're a Jin, a powerful deity-spirit-alien.
> We're gonna go for SIZE."*

- **SCALE x1.5, everything, from now on.** Storeys 6 m+, towers 25-40 m, rooms 9 x 9 m+, walkways 3.3 m+, doors 2.4 m+. ROOM TO FIGHT's
  numbers below are now MINIMUMS x1.5. Size is the point: he is small and powerful in a huge world.
- **BUT HIS BODY DOES NOT SCALE: STAIRS STAY CLIMBABLE.** His step is .357 m (CLAUDE.md, m368). Every stair riser is **0.30 m or less**:
  a taller storey means MORE steps (or a ramp, or a ladder), never taller ones. Prove a flight by its riser number in the NOTES entry.
- **LADDERS (shipped m1316):**
  - one side only: the side away from the exit mark
  - he steps up and over at the top
  - slower hands
  - every new ladder carries a `mark` on the floor it leads to, so its front is decided.
- **THE QUEUE, FIRST:**
  - **S1 -- X4 the Octagonal Block Pagoda: x1.5 and climbable stairs** -- DONE m1324 (Worker A): storeys 6 m, apothem 9 m (rooms 9.9 m at the top), walks 3.3 m+, doors 2.7 m+, the hall stair two flights of ten at .30 risers / .40 treads
  - **S2 -- the other done buildings, x1.5, one per build:** X1 pagoda (DONE m1323), C1 courtyard (DONE m1330), X2 castle (DONE m1321, Worker B), R1 Mega Wall (DONE m1332), and the older forge rows: hall (DONE m1336), wtower (DONE m1342), gate (DONE m1343), pagoda (DONE m1346), market (DONE m1349), shrine (DONE m1351), rampart (DONE m1355), adock, zep, fship, bath, fwork, sphang, skyb, cliff, keep, barr, lhouse, fisl, npil, storii, siege, teag, colo, oni, obs, fest, swrk -- in that order.
    One build each, with stairs re-cut to .30 risers.
  - **then** the queue below (R2 Four Fires on), built at the new scale.
- **S3 -- BREAKABLE SKINS ON A STANDING FRAME (his, after m1352):** *"A lot of stuff I wish was breakable -- balusters, gates, railings, parts of
  roofs. Like Weirdport: the frame of the building was always there, but every wall, every door could be destroyed. Build the frame of the roof,
  but the pieces that make up the roof are destructible -- if rockets are shooting at you or you're fighting up there, they're shooting pieces of
  the roof off; maybe you have to go back up and rebuild it. I like the idea of exposed rafters -- parts of the wall go away but there's
  scaffolding left."*
  - **THE RULE from here:**
    - every roof is a permanent RAFTER FRAME (beams you can stand and run on) under breakable PANELS. A panel is walkable until it is shot or struck away, then the rafters show.
    - every wall is the same: a timber frame (posts, rails) that stays, with breakable infill (the `cwallBuild` chunks already are this).
    - railings, balusters and gates are breakable pieces.
    - panels come back on a slow timer (or a worker rebuilds them).
  - **S3a (DONE m1353, the Dojo Hall):** a shared helper (`bldSkinRoof`): a hip/gable roof cut into panels between rafters, each panel its own walkable triangles plus a merged-range mesh. Hits (`bldHit`, rockets, strikes) knock panels out with debris and a tile clatter. The rafters stay walkable beams. First on the Dojo Hall's roof.
  - **S3b (DONE m1354, the Courtyard):** railings, balusters and gates as breakable pieces (a shared `bldRail` helper), first on the Courtyard's balconies and bridges.
  - **S3c:** retrofit the rest, roof by roof, as each building's S2 pass comes up.
- **GIANTS:** *"Enemies like 100 times your size."* A design note for R7 (the sky dragon) and R8 (boss armour): build the bosses
  building-sized, things you climb and fight ON.

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

## ROOM TO FIGHT (his, after m1275, a hard rule for EVERY building from here, and for the workers)

*"The walkways should be less narrow so they're more fun and you can do battles on them -- write this to pretty much everything. I don't want
the quarters to feel so narrow, in buildings, on walkways."* So:
- **Balconies, walkways and wall-walks are at least 2.2 m clear** between the wall and the rail (two bodies and a sword swing).
- **Bridges and beams that are FOR crossing are at least 1.6 m.** A deliberately narrow balance beam is the exception, and it is named
  as one.
- **Rooms are at least 6 x 6 m inside** where a fight can happen, and doors are at least 1.6 m wide.
- **The eave above any walkway clears it.** Put the roof's edge beyond the walkway's rail. A lip or beam hanging over a walkway at
  head height crowds it and shoves the camera in.
- **Anything thin near a walkway is `noCam: 1`** (rails, posts, lips, lattice), so it never pulls the lens into his back. Only real
  walls stop the camera.

## DOORS, GATES, BRIDGES -- AND CHAOS (his, after m1296, a hard rule for every building and both workers)

*"There are doors I can't break down or go through -- the guys are behind them and can't get out and I have to jump over the wall. We need
functionality with drawbridges and opening doors, or at least breaking the doors down. I kind of like the idea of everything being
destructible -- it's just chaos."* So, from here:
- **Doors and gates OPEN** for whoever comes near (him from either side, a guard on his way out), and close behind. No door is ever a dead
  wall.
- **Every door and gate BREAKS.** A few blows (blade, rocket, whirlwind) splinter it in a burst of sparks and smoke, the way stands open,
  and it is REHUNG later. The Great Red Pagoda's gate (`gpagGateHit`) is the pattern, and `bgateMake` / `bgateStep` / `bgateHit` (m1298) is the reusable helper: use it.
- **Drawbridges, portcullises and lifts are MACHINES you work.** A lever, a gong or a bell raises or lowers them, and a big enough blow
  can drop them.
- **Lean destructible.** Walls breakable (`cwallBuild`), props smashable (`smashAdd`), timber that splinters, plus anything else that
  can break in the frame budget. Make it chaos you can fight through.

## PARALLEL WORKERS (his, after m1270: *"spin up one or two extra context windows... one on one building, one on another"*)

Three sessions build at once, each OWNING its rows; nobody touches a row (or its code) it does not own:

| owner | rows |
|---|---|
| the MAIN loop (this file's original session) | X1 Great Red Pagoda, then C1 the Courtyard, then the R rows |
| WORKER A | X4 Octagonal Block Pagoda (passes 1-10, DONE m1298), then one X4 follow-up (gate leaves via `bgateMake`), then X3 Timber Siege Fort (passes 1-10) -- its code just ABOVE `// m1247: THE SKY WRECK` as before, its BLDG.list entry right after its X4 entry |
| WORKER B | X2 White Heron Castle (passes 1-10) |

**The push protocol (everyone, every pass) -- the build number and NOTES/BUILDINGS tops are shared, so:**
1. Make the pass. Commit it WITHOUT bumping: `git add -A && git commit -m "..."`.
2. `git pull --rebase origin main`. A conflict in NOTES.md or BUILDINGS.md is two entries at the same spot: keep BOTH (delete the markers,
   keep both blocks, newest first). A conflict in index.html: keep both sides unless they truly edit the same line, then re-apply yours.
3. `npm run bump && npm run check` (gate on exit), then commit the bump on its own (`git commit -am "mNNNN bump"`) and `git push origin
   main`.
4. Push REJECTED? `git reset --hard HEAD~1` (drops ONLY the bump commit), then back to 2.
5. Tick your row with the build number the bump printed; that tick goes in your NEXT pass's commit (or a follow-up).

**Where your code goes (so the three never edit the same lines):**
- WORKER A: building code just ABOVE the line `// m1247: THE SKY WRECK`; its `BLDG.list` entry on the line right AFTER `{ key: 'swrk'`;
  its `bldHit` hook just ABOVE `if (zepLever(`.
- WORKER B: building code just ABOVE the line `// m1254: THE ZOOM RAMP TOWER`; its `BLDG.list` entry right AFTER `{ key: 'fest'`; its
  `bldHit` hook just ABOVE `if (smashHit(`.
- MAIN: everything else.

Never run `npm run sim/glsl/clips/...` (CLAUDE.md). Never force-push. Shipped unverified.

## THE 10-PASS EXPERIMENT (his, after m1260)

*"I'm curious to see what 10 passes makes a building look like... go back through what we already have and refine them. A lot of the stuff
-- the spiral blocky stairs -- they're fine, but functionally they're not that functional. I'm looking for much more visually interesting and
much more functional."* He is sending a reference image of a tower. When it lands, it becomes the first 10-pass building (a pass per build,
each pass a real step up in silhouette, material, detail and things to DO), and that result decides whether the rest get the same.

**The image landed (m1262): `images/korajin/ref/red_pagoda_tower.webp`** -- a slender five-storey red pagoda, a railed balcony round
every storey, deep flared roofs with gold edges stepping in as it rises, a spire of rings, a roofed pavilion at its foot, a red fence with
gold flame finials. **The loop takes X rows FIRST, before the R rows, a pass per build, to 10. ORDER (his, after m1268): X1, then X4 (the octagonal block pagoda), then C1 (the courtyard), then X2, then X3.**

**THE BLOCK STYLE (his, after m1267, five Minecraft-style references in `images/korajin/ref/block_*.jpg`):** *"It's very Lego or Minecraft,
and it shows we can create stuff with blocks while still getting detail, low poly, destructibility and climbing out of these. I like the one
that's kind of hexagonal."* What they teach, and every X building from here borrows:
- **Detail out of STEPS, not curves.** Eaves are stacked slabs, each one stepping out further (four or five courses), with the corner
  courses kicked up a block. The flare reads from a distance, every slab is a box (cheap, mergeable), and every slab is a ledge you can
  stand on or catch. Railings, brackets and window frames are single blocks in a rhythm.
- **Colour bands do the work.** Red posts, cream panels, a teal/green bracket band, dark grey tiles, a light stone base: each band is one
  material, so a storey is about four draws however busy it looks.
- **Every block can BREAK.** Walls, panels and even eave courses built from chunk boxes (the `cwallBuild` idea, generalised to any height:
  a block grid you can cut holes in and that repairs).
- **Silhouettes worth stealing:**
  - an OCTAGONAL/HEXAGONAL plan with seven tight roofs and a long spire (block_pagoda_octagonal)
  - a heavy stone base under a slim timber tower (block_tower_stone_base)
  - a tall plain shaft with a balconied clock-crown and vines (block_clock_tower)
  - a pagoda on a walled cliff terrace with stairs up (block_pagoda_cliff)
  - a dark tower hung with long banners (block_dark_tower_banners)

| # | building | the plan, pass by pass | spot | passes |
|---|---|---|---|---|
| X1 | **Great Red Pagoda** | 1 the stack: 5 hollow storeys, a room each, ladders up through hatches (corners turning), a door onto every balcony, deep flared roofs, the spire · 2 the reference's detail: bracket clusters under every eave, lattice panels and railings in the right rhythm, the upturned corner tips, tile ribs · 3 the PAVILION at its foot (the side hall with its own roof) and the red FENCE with gold flame finials round the court · 4 function: the climb OUTSIDE -- eave tips you can catch, bars between balconies, a rope from the spire · 5 the rooms: a different room every storey (shrine, armoury, library, bell room, the lookout) · 6 guardians: archers on the balconies, a sentry in the bell room, killable · 7 the light: lanterns that glow at dusk, a beacon in the spire, the windows lit · 8 motion: wind chimes, streamers, the bell, birds off the roofs · 9 a set piece: ring the bell at the top and the whole tower answers (lanterns run up, the spire flares, a gate opens) · 10 the polish: proportions against the reference, colour, silhouette, draw calls | (90, 0) | 1 (m1262) · 2 (m1266) · 3 (m1267) · 4 (m1269) · 5 (m1270) · 6 (m1271) · 7 (m1272) · 8 (m1273) · 9 (m1275) · 10 (m1287) DONE |
| X3 | **Timber Siege Fort** -- **WORKER A** (his third reference, `images/korajin/ref/timber_siege_fort.webp`: a scaffold fortress on a cyclopean stone base) | 1 the mass: a big battered base of ROUGH fitted boulders (irregular stones, not courses) with a dark tunnel GATE through it; on top a tall open TIMBER LATTICE fortress -- three tiers of posts and X-braced frames stepping back, decks at every tier, a small pagoda-roofed watch house crowning it · 2 the lattice detail: every bay X-braced, rails, ladders lashed between tiers, rough-cut timber colour, the white war banners with the black crest (the hwBanner family) on poles at the corners and on the roof · 3 CLIMBING: the X-braces are bars and footholds -- the whole lattice is a jungle gym (bars along the tier edges, ladders, braces you can run up), the base is runnable stone (wall run-up) · 4 the gate tunnel: a portcullis, a passage under the fort into a courtyard behind, a ramp up inside · 5 the work site: leaning poles and scaffolding against the stone (ramps!), timber stacks, a crane, the half-built bay · 6 defenders: archers on every tier, a sentry gun in the watch house, a rock-drop from the top deck, all killable · 7 BREAKABLE timber: cut the braces and bays sag and fall (the kit-style collapse) · 8 the camp round it: palisade, tents, weapon racks, banners down the approach (the dressing kit) · 9 the set piece: fire the watch house and the lattice burns tier by tier, or hold it · 10 the polish against the reference | (-70, 100), measured at pass 1 (`TFORT`): the base is 36 x 28 m at the STEER's x1.5, with room for the pass-8 camp to 30 m out -- 14 m clear of the Courtyard's x -28 edge, ~30 m clear of the moved White Heron Castle (-125, 50), 70 m+ from the Lighthouse and everything south | 1 (m1328) · 2 (m1329) · 3 (m1331) · 4 (m1333) · 5 (m1334) · 6 (m1335) · 7 (m1337) · 8 (m1338) · 9 (m1339) · 10 (m1340) -- all ten passes in; waiting on his look |
| X2 | **White Heron Castle** -- **WORKER B** (his second reference, `images/korajin/ref/white_castle_keep.jpg`: a Himeji-style castle) | 1 the mass: a battered (sloped, inward-leaning) dressed-stone BASE 6-8 m tall, the MAIN KEEP on it -- five white-plaster storeys under layered grey roofs, the storeys stepping in, a smaller connected tower and a long white gallery wing on the left, all on the stone · 2 the roofs: chidori-hafu triangular gables and curved kara-hafu gables breaking every roof line, ridge ornaments (shachi fish) at the peaks, the roof edges' rhythm · 3 the walls: small square windows in rows, dark timber window frames, the white plaster with the faint stone shadow, gun/arrow ports · 4 the stone base CLIMBABLE: the battered wall is a giant ramp you can run up (no-tap run-up, m1251) to the first roof, handholds in the stone courses · 5 inside the keep: stacked halls joined by steep stairs (walkable ramps), the great pillar, a lookout at the top · 6 the gallery wing: a long corridor you can run, its roof a path, the corner tower · 7 defenders: archers at the windows, a ballista on the gallery roof, a sentry gate in the stone, all killable · 8 the approach: a winding walled ramp up to a gate in the base (the castle's maze), a drawbridge · 9 the light and life: pines round it (the dressing kit), lanterns, the white catching the sun, flags · 10 the polish: proportions against the reference, silhouette, colour, draw calls | (-108, 45) -- re-measured at pass 1: x -121..-87, z 28..62 (base, toe, stair, storehouse); ONI (-72, 0) ~40 m off, the mill spot (-72, 40) 15 m clear | 1 (m1277) · 2 (m1280) · 3 (m1283) · 4 (m1285) · 5 (m1288) · 6 (m1291) · 7 (m1294) · 8 (m1299) · 9 (m1302) · 10 (m1303) · 11 (m1313: room, gates, gongs) · S2 x1.5 (m1321) DONE |
| X4 | **Octagonal Block Pagoda** (his favourite of the block refs, `block_pagoda_octagonal.jpg`) -- **WORKER A** (`OPAG`, `opagBuild`) | 1 the stack: seven EIGHT-sided storeys of blocks (apothem 6 m stepping in .4 a storey, 3.4 m each -- ROOM TO FIGHT: rooms 6.4 m at the top, walks 2.2 m, doors 1.8+ m), red corner posts, cream block panels that BREAK (one InstancedMesh, turned colliders, the blocks above fall), a red band and a teal bracket band under four STEPPED slab eave courses round all eight sides (corners kicked up two blocks; every course walkable, .3 m risers; the outer one a lip to catch), a ladder up through a hatch on every floor, a door onto every roof, a wide porch eave on red posts at the ground, a red octagonal fence with a gate, a stepped spire · 2 the block detail: bracket clusters in a rhythm under every eave (teal and red stepped blocks), light edge blocks on every course, tile ribs as block rows, lattice windows, a red balustrade of blocks round each roof walk, gold corner caps · 3 everything breaks: the porch posts, the bands and the eave courses themselves as block grids, and they REPAIR (blocks fly back in, bottom first) · 4 the climb outside: bars between storeys, handholds up the corner posts, a zipline off the spire to the gate, a ring at the top · 5 the rooms and the inside way up: a block stair winding up the ground hall, a different room every storey (shrine, armoury, scroll room, tea room, bell room, lookout) · 6 guardians, killable: archers on the roof walks, two stone lion guardians at the gate that wake when you come in, a monk in the shrine · 7 the light: lanterns at every kicked-up corner, the windows lit at dusk, a beacon in the spire · 8 motion: wind bells swinging at the corners, banners on the fence, birds off the roofs, the spire collars turning · 9 the set piece: ring the spire bell at the top and the tower lights storey by storey, the lions bow, the gate opens on a reward · 10 the polish: proportions against the reference, colour, silhouette, draw calls | (70, 72): clear of every building in the forge -- nearest the Festival (72, 30) at 42 m and the pillars (27, 46) at 50 m; its fence is 19 m out (20.6 at the corners) since S1's x1.5 -- still 7 m clear of the Festival's z 44 | 1 (m1274) · 2 (m1276) · 3 (m1279) · 4 (m1282) · 5 (m1286) · 6 (m1289) · 7 (m1290) · 8 (m1293) · 9 (m1295) · 10 (m1298) -- all ten passes in · S1 x1.5 + stairs (m1324) · gates (m1326) |
| C1 | **The Courtyard** (his, after m1264, ref `images/korajin/ref/timber_lane_watchtower.jpg`) -- **the plan is COURTYARD.md** | a small organised court (56 x 64 m) that puts the buildings to work: a stone lane between two Timber Lane Halls to a two-roofed Watchtower Gate, a koi pond with a moon bridge, the Great Red Pagoda in a corner, a bell house, a wall-walk all round, rope bridges at height, guards in the towers and on the ground, creatures, fairy dust, sunlight. 10 passes, listed in COURTYARD.md | (0, 150) | 1 (m1292) · 2 (m1300) · 3 (m1305) · 4 (m1307) · 5 (m1308) · 6 (m1309) · 7 (m1310) · 8 (m1311) · 9 (m1312) · 10 (m1315) |

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

| R10 | **Monkey bars** | his (after m1292): *"we never really made the monkey bars -- the horizontal ladder."* A MOVE first, then pieces: hang from a rung (the bar catch) and travel hand over hand along a run of rungs with the left stick, swing-release off the end; then horizontal ladders spanning gaps between buildings, under bridges, across the courtyard's lane | wherever they connect things | · · |
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

