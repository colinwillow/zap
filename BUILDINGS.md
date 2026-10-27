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
- **Every building is PLAYABLE**: breakable walls (`cwallBuild`, they repair), things to swing on (`hbarMake`), things to climb or run up
  (ramps: walkable `triAdd` surfaces, rise <= .32 m a step), an inside and an outside, and where it fits a function (a turret, a ballista,
  a balance beam, a lookout). Code-built and merged per material (draw calls matter on his phone).
- **MODULAR**: each building stands in its own spot in the forge (`at`), on a grid of 4 m units, its doors on its sides' centres, so
  later they can be set side by side into a courtyard.
- **Pass meaning**: 1 = the building stands, playable (shell, roof, doors, the main feature). 2 = the details and the function (interior,
  the moving parts, lights, the special feature working). 3 = the polish (proportions, colour, silhouette, one more delight).

## The queue

| # | building | function | spot | passes |
|---|---|---|---|---|
| 1 | **Dojo Hall** | breakable walls, door, curved hipped roof, bars out front | (0, -7.5) | 1 (m1116) · 2 (m1118) · 3 (m1119) DONE |
| 2 | **Watchtower** | 3 storeys, ladders/ramps inside, a lookout deck, a bar off the top to swing from, a pagoda cap | (-16, -8) | · · |
| 3 | **Gatehouse** | a torii-cyber gate over a passage, walk along its top, a BALLISTA on the roof that fires bolts | (16, -8) | · · |
| 4 | **Pagoda** | five stacked roofs, a stair-ramp spiralling up inside, a bell at the top | (-16, 12) | · · |
| 5 | **Market Stall row** | open-front stalls under awnings, crates to break, lanterns, a noodle-bar counter, bars in the frame | (16, 12) | · · |
| 6 | **Shrine** | a raised platform up stone steps, a glowing core (the Jin), stone lanterns, a balance beam | (0, 24) | · · |
| 7 | **Rampart Wall** | a long walkable wall with crenels, a turret at each end, ramps up | (0, -24) | · · |
| 8 | **Airship Dock Tower** | a tall tower with a landing arm and a docked airship you can walk onto | (-30, 0) | · · |
| 9 | **Zeppelin** | a floating zeppelin-house over the forge, a gondola deck, ropes/bars to reach it | (30, 0) floating | · · |
| 10 | **Flying Ship House** | a junk-ship hull with a house on deck, floating and bobbing, a gangplank ramp | (0, -40) floating | · · |
| 11 | **Bathhouse** | a steaming pool inside, a chimney, sliding screens | (-30, 24) | · · |
| 12 | **Forge-Workshop** | a bronze furnace glowing, gears turning, a crane arm (a bar) | (30, 24) | · · |
