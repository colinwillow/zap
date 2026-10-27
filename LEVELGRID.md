# LEVELGRID -- plan a level as LOGIC first (m1356)

His direction, with two blueprint images (a 10 x 10 top-down grid, a coloured path, numbered beats, heights Y 0-3):

> *"This is usually where we go wrong: I build the kit and set you off to build a level, and the scope is too large and the logic isn't
> interesting. Start with the game logic of the level first: the path the player is supposed to take (maybe multiple paths), a general
> layout with a logic to it. You do some stuff on this plane, then get up to this plane, go around, go down, climb up here, kill these guys
> on the tower, hit this button and it opens a drawbridge; once it's open you go across, beat those guys, go up and light this candle and
> that allows this; then you zipline back across and finish, and that opens the boss of the level."*


## THE FIVE LAYERS (his method, after m1369 -- every grid level is built this way)

| layer | what | the test it has to pass alone |
|---|---|---|
| **1 RUN** | the traversal: ramps, ladders, wall runs (up and along), bars, the long bar, ropes, rings, movers, flyers, zips, drops; swimming when it exists | with nothing else in it, is it a fun level to move through? a ninja parkour centre |
| **2 PUZZLE** | the beats that open things: this opens that, that opens the next, the last opens the boss gate | do the dependencies make you use the WHOLE run, and send you back over it a new way? |
| **3 ENEMIES** | guards for the layer-2 pieces only, each with a ZONE (a circle round what it guards) that its sight, its shots and its chase stay inside | can you always stand outside every zone and plan? nothing reaches the spawn or the open run |
| **4 THEME** | the level's one distinctive thing: air, puzzle, enemies, water, vehicles, co-op | would you know which level this is from one screenshot? |
| **5 BOSS** | the final arena: a big open dojo and the boss | is it the biggest moment in the level, and does it use what the level taught? |

- **In the game:** KORAJIN > Level 1 -- The Grid, with the LAYERS bar at the top (m1371).
- **In code:** `lvgBuild(spec, lay)` builds layers 1..lay, or a set `{2: 1, 3: 0, ...}`. Below 2, every gate stands open and the boss door is gone. Below 3, the guard beats count as done. The keep is layer 5.
- **Which layer each thing is in:**
  - **layer 1:** the path, branches, climbs, bars, movers, flyers, zips and rings
  - **layer 2:** the button, candle, cache, drawbridge, gate and boss door
  - **layer 3:** the guards, the tower's archers and gun, the posts and the catapults
  - **layer 5:** the keep
- **Order of work:** finish layer 1 to his sign-off, then layer 2, and so on. A pass adds to ONE layer and is checked against every layer below.


## The system

A level is a SPEC: an ordered path of grid cells plus beats. `lvgBuild(spec)` turns it into a playable GREYBOX. There is no art: the logic gets proven first, and the art and the kit go on top only after it plays.

- **The grid:** 10 x 10 cells of `LVG.cell` 7 m, at `LVG.at` (-45, -185) in the forge, 70 m square. Heights Y 0-3 at `LVG.lev` 4.5 m per level.
- **The path:** `[col, row, Y, tag?]` in order. Each cell is a pad at its height, coloured along the path (S green to E magenta, like his images).
  - **One level up or down between neighbours:** the later cell is a RAMP (about 33°, walkable).
  - **Two or more up:** a LADDER on its face.
  - **Two or more down:** you drop.
- **Branches:** optional side routes, listed the same way, starting from a cell already on the path.
- **Tags:**
  - `'S'`: start, a ramp up from the ground
  - `'E'`: the end
  - `'gap'`: no pad, spanned by the DRAWBRIDGE
  - a number: a beat, with a floating marker
- **Beats** (`spec.beats[n]`):

  | beat | what it is | done when |
  |---|---|---|
  | `guards` | samurai on the cell | all of them are down |
  | `tower` | a block with two archers and a sentry gun | they are dead |
  | `button` | a red button | struck; it lowers the drawbridge |
  | `candle` | a brazier | struck; it lights and opens the GATE (beat 10) |
  | `zip` | a zipline from the cell before it down to E | ridden |
  | `ring` | a grapple ring | optional |
  | `cache` | gold crates | optional |

- **`spec.need`:** the beats that open the BOSS DOOR at E (the boss itself comes later).
- A finished beat's marker turns green.

## Grid Level 1 (`LVG1`, SPAWN > BUILDINGS > Grid Level 1)

His first image's path, read in order, given heights:

1. S (1,1) ramps up to Y1 and runs east to **beat 1** (4,1): two guards.
2. South to (4,3), then up to Y2 at **beat 2** (5,3), east, then up to Y3 at **beat 3** (7,4): the tower (2 archers and a gun).
3. East along Y3. *Optional:* the purple branch north round (10,4) to (8,1), **beat 4**, a ring.
4. Down to Y2 at **beat 5** (9,5): the BUTTON. The **gap** at (9,6) is crossed by the drawbridge it drops.
5. **Beat 6** (8,7), Y1: three guards. West through (7,7), (7,6) and (6,6) to **beat 7** (5,6), up to Y2.
6. **Beat 8** (4,4): the CANDLE.
7. Down west to (2,4) and (2,5), down to the ground at (2,6). *Optional:* the cache, beat 9, round (1,6) to (1,8).
8. (3,6), then the GATE (it opens only when the candle burns) up into **beat 10** (3,7), Y1.
9. East along row 8, up to Y2 along row 9, to **beat 11** (9,10): the ZIP from (9,9) down to **E** (10,10). The boss door opens when 3, 6 and 8 are done.

## How to iterate

Change the path, the heights or the beats in `LVG1` (or tell me in words: "make 6 a tower", "put a ladder here", "the gap should be two cells") and the greybox rebuilds from it. When the logic plays well, the art goes on top: the kit pieces, the towers, the streams.

## L1 pass 2 (m1357): VERTICALITY

- **Heights go to Y6 (27 m).** Raised pads are slabs on four PILLARS, open beneath, so the route can pass UNDER itself. Ramps are thin wedges on pillars too.
- **The route now:**
  1. A ground run to the guards (1).
  2. Ramps up east to Y2, then a LADDER (2) up to the Y4 walkway along row 3.
  3. The TOWER (3) at Y5 overlooks everything.
  4. *Spur:* climb to the level's roof at Y6 (4), with the whole map below.
  5. Down to the BUTTON (5); the drawbridge over the gap at (3,6).
  6. The guards (6) at Y3, then down the east side to the GATE (10), which is shut.
  7. *The gate sends you back:* a spur runs UNDER the Y4 walkway at Y1 to the CANDLE (8). It comes out beside the opening ramp, a shortcut loop to the start.
  8. With the candle lit, through the gate and up the east climb to Y6 (11), then a 56 m ZIP across the bottom of the map to E.
- **What to look at:**
  - does the gate-sends-you-back loop read
  - is the under-walkway passage a good reveal
  - the zip

## L1 pass 3 (m1358): THE MOVES WE'VE BUILT, MADE NECESSARY

His list: wall running horizontally and vertically, a three-part wall run with a pit (fall and you do it again), high bars to launch up to a ledge, archers across, destructible buildings and a boss building you bring down, catapults, rockets, turrets, moving platforms to a rope, monkey bars, ropes, swinging, flying zeppelin platforms, swimming.

This pass adds three new cell kinds to the spec:

- **`'vw'`, a VERTICAL WALL:** instead of a ramp, a 4.5 m face to run up. Its top is the ledge you catch.
  - First used right after the guards (5,1): sprint and jump into it.
- **`'wr'`, a WALL-RUN cell:** a pit with a tall wall down ONE side. Consecutive `wr` cells put their walls on alternating sides: run, kick across, run, kick, run.
  - The east climb is now three of them at Y2, (9,7) to (9,9). The land is at (9,10).
  - A LADDER from the ground leads back up to the start of every pit run, so a fall means doing it again.
- **`'bars'`, a HIGH-BAR cell:** a pit with three bars, each 2.6 m higher than the last, rising to the ledge of the next cell 9 m up.
  - At (8,10): from the landing up to (7,10), Y4, where the zip to E leaves.

## The backlog (one or two per pass, from his list)

- moving platforms, one to the next, up to a ROPE
- monkey bars (R10), rope climbing and swinging, the experiments
- archers posted ACROSS gaps (shooting while you wall-run)
- catapults, rocket turrets on the route
- a FULLY DESTRUCTIBLE building: knock out its legs and it crumbles (the boss building, after the boss)
- flying zeppelin platforms
- swimming (a new mechanic: its own sandbox first, per the whole-piece rule)

## L1 pass 10 (m1365): THE LONG ZIP

- **`zips: [[a, b]]`:** an extra zipline from a post on cell a down to cell b.
- **Level 1's:** the zeppelin's high pad (9,3,Y6) to (2,9) beside the boss door, about 75 m.

## L1 pass 9 (m1364): THE ZEPPELIN

- **`flyers: [[a, b]]`:** a deck under a zeppelin, shuttling between two docks and carrying you.
- **Level 1's ride:** the roof (2,2,Y7) to a high pad at (9,3,Y6), across the whole level. From the high pad, drop to the gate side.

## L1 pass 8 (m1363): THE LONG BAR

- **`'mbar'`:** a pit crossed by one long bar along the way. Jump to catch it, then push the left stick sideways to shimmy across.
- **Where:** (5,7), after the second guards.

## L1 pass 7 (m1362): CATAPULTS

- **`cats: [[c, r], ...]`:** a catapult on the ground at that cell.
- **Level 1 has three:** (5,5), (8,8) and (2,8).
- **How they work:** each lobs a stone at where you'll be, with a red ring where it will land. Smash a catapult (8 hp) on the ground to stop it.

## L1 pass 6 (m1361): THE BOSS KEEP

- **Behind the door at E** stands a fortress on four stilts, with a rocket gun on its roof.
- **The legs are shielded** until the door opens. After that, break all four (10 hp each) and the keep tilts, falls and crumbles. That ends the level.

## L1 pass 5 (m1360): ARCHERS AND GUNS ACROSS THE GAPS

- **`posts: [[c, r, y, 'archer'|'gun'], ...]`:** a perch (a pillar with a deck on top) at an OFF-path cell, at level y.
- **The Level 1 posts:**
  - archers across the wall run (10,8)/(10,9), across the drawbridge gap (2,6), and over the roof spur (10,2)
  - rocket guns over the movers (1,3) and near the gate (7,8)
- **Line of sight:** archers need it (roofs and pillars are cover). A rocket you return homes to the gun that fired it.

## L1 pass 4 (m1359): MOVING PLATFORMS UP TO A ROPE

- **New cell kind `'movers'`:** a pit with four platforms, each 0.9 m higher than the last, sliding back and forth across it (2.2 m either way, each at its own speed). A platform CARRIES him while he stands on it.
- **A cell entered from `'movers'` going up** hangs a climbable ROPE from its ledge down to the top platform.
- **The roof spur (beat 4) is now this:** from the tower walkway at Y5, hop the four moving platforms over the pit at (2,3), catch the rope, and climb to the roof at Y7 (31.5 m). The ring is up there, with the whole level below.
