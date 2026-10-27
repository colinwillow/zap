# LEVEL DESIGN -- the rubric (his five layers, checked against what designers say)

His method (after m1369) is the spine. The research did not replace it: every serious source describes the same order, with **traversal
first, then the gating, then the enemies placed around the gates, then a theme, then a boss that tests what the level taught.** What
the research adds is **a layer zero (the numbers), a shape inside each layer, and a few things it is easy to forget.**

## Layer 0: THE NUMBERS (before any geometry)
- **Fix the character's metrics first:**
  - jump height and distance
  - run speed
  - wall-run length and height
  - bar reach
  - the step (.357 m)
  - safe fall height
  - how far the camera sees

  Every gap and ledge is then sized FROM them, never eyeballed. Glowtide already did this (route checker: jump apex 2.81 m, sprint gap 7.6 m).
- **For us, measure the COMBOS, not just the single moves (his note):** the distance comes from chaining. The rows to measure, each as height and as distance:
  - the jump, then the double jump
  - the high jump (backflip)
  - jump + swipe-swipe-swipe (the air dashes)
  - double jump + swipes
  - high jump + swipes
  - the HIGH BAR launch (super high and far)
  - the zoom, then zoom + jump
  - the wall run up (by run-up speed)
  - the side wall run, then wall run + kick
  - the WALL SLIDE + wall jump chain between two walls (m1372: per wall, how much height a jump gains)

  The level is built from that table. A gap that needs "double jump + two swipes" is a different beat from one that needs a plain jump, and the table is what lets a gap be built on purpose.
- **For us:** measure Grumbo's jump, double jump, wall run, zoom and hover once. Write them into LEVELGRID.md, and size the grid cells (7 m, 4.5 m levels) against them.

## Layer 1: THE RUN (ninja parkour centre)
- **One mechanic at a time, in four beats (Nintendo's *kishōtenketsu*):**
  1. INTRODUCE it where failing costs nothing
  2. DEVELOP it (longer, higher, chained)
  3. TWIST it (combine it with another, or flip the rules)
  4. CONCLUDE (a final test, then drop it)

  A mechanic is never TESTED before it is TAUGHT.
- **A rhythm, not a ramp:** difficulty goes up in a SAWTOOTH, with hard stretches followed by REST (a safe pad, a view, a pickup). Checkpoints sit at the rests, spaced so a fall costs a little and never the whole run.
- **Readable:**
  - **the critical path:** the intended route is the MOST LEGIBLE one, but not the only one
  - **landmarks in three tiers:**
    - a GLOBAL one seen from almost anywhere (the boss keep / tower, Disney's "weenie")
    - LOCAL ones per area
    - MICRO cues at the next move (paint, light, a ledge colour)
- **Verticality that is SEEN:** from high points, show where you have been and where you are going.
- **Fail forward:** a fall drops you somewhere you can climb back from fast (our ladders back up from every pit), never to the start.
- **Optional is a reward:** side branches are harder and pay out (a ring, a cache, a shortcut). The golden path stays clear.

## Layer 2: THE PUZZLE (locks and keys)
- **Draw it as a graph before building it (Mark Brown's *Boss Keys* diagrams):** the locks (gates, bridges, the boss door), the keys (buttons, candles, abilities, items), and which areas each key opens. Then check it: is there ever a CHOICE of which lock to open? Does each key send you somewhere new?
- **Keys don't have to be things.** An ability is a key (Metroid's morph ball), so are a switch state or a raised water level. "Many keys, one lock" and "one key, many locks" are both good shapes.
- **LOOP BACK (Dark Souls):**
  - a key should often open a SHORTCUT back to somewhere you have been: a door opened from the far side, a ladder kicked down, a lift
  - the level folds back on itself, so you never re-walk a stretch you have mastered
  - the moment you realise where you are is the reward
- **Widen the space:** each key makes the reachable world bigger. It doesn't just move you along a corridor.

## Layer 3: THE ENEMIES (guards with ZONES)
- **Only where a layer-2 piece is:** a button, a door, a key, the boss approach. An enemy guards something.
- **ZONES:**
  - each enemy has a circle round what it guards (a "leash" in MMO terms)
  - its sight, its shots and its chase stay inside it; past the edge it gives up and walks back
  - ranged enemies may have a bigger zone than melee, but still one you can see the edge of
- **Line of sight is the aggro.** Cover breaks it, and a zone edge is somewhere you can stand and plan.
- **Never unavoidable:** nothing fires at the spawn, the rest pads or the open run. You must always be able to see a threat before it can hurt you.
- **Use the layer-1 shapes:** choke points, a wall run under archer fire (only once you know the wall run), an open flat floor where the melee happens.

## Layer 4: THE THEME (what sets the level apart)
- **One idea the level is ABOUT:** air, water, puzzle, enemies, vehicles, co-op. It TWISTS the run (beat 3 of kishōtenketsu at the level's scale).
- **The test:** would you know which level this is from one screenshot?

## Layer 5: THE BOSS (the final arena)
- **The boss is the level's CONCLUSION:** it tests the mechanics the level taught, in a big open space (a dojo). It is not a new rule.
- **Telegraphed attacks,** a rest between phases, and a spectacle at the end (the keep falling).

## What his list did not have (the additions)
- **Layer 0:** the metrics.
- **Teach, then test:** kishōtenketsu per mechanic.
- **The rhythm:** a sawtooth with rests and checkpoints.
- **Wayfinding:** landmarks in tiers, and a legible critical path.
- **Loop-back shortcuts:** they make the puzzle layer pay for itself.
- **Zones:** leash, line of sight, never unavoidable.

## Grid Level 1 against the rubric (now)
| | state |
|---|---|
| **0 numbers** | NOT measured for Grumbo. Cells and gaps were sized by feel. |
| **1 run** | **Has:** variety (ramps, ladders, a wall run up, a three-part wall run, bars, the long bar, movers and a rope, the zeppelin, two zips) and ladders back from pits. **Has not:** any INTRODUCE beat (the three-part wall run is the first wall run you meet over a pit), REST pads, checkpoints, or a global landmark from the start. |
| **2 puzzle** | A straight chain (guards → tower → button → candle → gate → zip → door). No choice, no loop-back shortcut, keys are all switches. |
| **3 enemies** | **No zones.** The catapults reach 55 m and hit the spawn. Fix before he judges layer 3. |
| **4 theme** | None yet. |
| **5 boss** | The keep: a shape you fell, telegraphed by shields, with guards. It does not test the run. |

**Next layer-1 passes, from this:**
1. Measure the numbers.
2. Re-order the run into teach → develop → twist → conclude per mechanic (a safe wall run before the pit one, a low bar before the high ones).
3. Add rest pads and checkpoints.
4. Make the keep the landmark seen from S.

## Sources
- Nintendo's four steps / kishōtenketsu: [MCV/Develop](https://www.mcvuk.com/development/video-nintendos-level-design-secrets-in-four-steps), [MCV on GMTK](https://mcvuk.com/?p=70645), [Koichi Hayashida](https://en.wikipedia.org/wiki/Koichi_Hayashida), [Nintendo Life](https://www.nintendolife.com/news/2016/02/video_learning_how_mario_teaches_us_the_basics)
- Metrics, critical path, landmarks, sawtooth: [The Level Design Book](https://https-book_leveldesignbook_com.proxy.bugsmash.io/process/blockout/massing/composition), [level-design skill notes](https://claudeskills.info/skills/gamedev-skills/awesome-gamedev-agent-skills/level-design/)
- Locks and keys: [Boris the Brave](https://www.boristhebrave.com/2021/02/27/lock-and-key-dungeons), [Zelda Universe on Boss Keys](https://zeldauniverse.net/2017/01/26/explore-zelda-dungeon-design-in-mark-browns-youtube-series-boss-keys/), [Boss Keys: Link's Awakening transcript](https://amara.org/videos/sA8tGCZJvrxP/en-gb/3101254), [Level Design Diagram Generator](https://mimicrymedia.itch.io/lddgenerator)
- Loop-backs: [TheGamer on Dark Souls](https://www.thegamer.com/dark-souls-1-fromsoftwares-magnum-opus-of-interconnected-level-design/), [Game Wisdom](https://game-wisdom.com/?p=8698)
- Enemies, leashes, arenas: [Warcraft wiki: Leash](https://warcraft.wiki.gg/wiki/Leash), [UESP: Leashing](https://app.uesp.net/wiki/Online:Leashing), [Game Developer: level design for melee combat](https://www.gamedeveloper.com/design/level-design-for-melee-combat-systems), [SRB2: enemy placement](https://wiki.srb2.org/wiki/Level_Design_101/Enemy_placement)
- Platformer pacing and rests: [Game Design Skills: 3D platformer level design](https://gamedesignskills.com/game-design/3d-platformer-level-design/), [RetroStyle: platformer tips](https://retrostylegames.com/blog/platformer-level-design-tips/)
