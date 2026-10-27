# LEVELGRID -- plan a level as LOGIC first (m1356)

His direction, with two blueprint images (a 10 x 10 top-down grid, a coloured path, numbered beats, heights Y 0-3):

> *"This is usually where we go wrong: I build the kit and set you off to build a level, and the scope is too large and the logic isn't
> interesting. Start with the game logic of the level first: the path the player is supposed to take (maybe multiple paths), a general
> layout with a logic to it. You do some stuff on this plane, then get up to this plane, go around, go down, climb up here, kill these guys
> on the tower, hit this button and it opens a drawbridge; once it's open you go across, beat those guys, go up and light this candle and
> that allows this; then you zipline back across and finish, and that opens the boss of the level."*

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
