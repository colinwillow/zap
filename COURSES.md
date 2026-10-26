# Courses -- a menu of test grounds that spawn in the arena (and double as "learn to play")

**Status: on the docket (Oct 25 2026, his idea). Not built, not immediate.** Each course is a sandbox under the WHOLE-PIECE RULE
(`CLAUDE.md`): its own DONE WHEN, ticked with evidence, his sign-off last.

## The idea (his)
*"The little testing ground... maybe there's a little menu, and when you click the menu it shows a sub menu, and you click them and it
spawns in the certain test ground... this could honestly be how you learn to play."*
- A **COURSES** button in the arena menu -> a sub-menu of modules -> picking one clears the floor and builds that course in the arena.
  One course at a time; picking another (or NONE) takes the last one away.
- Each course teaches ONE verb set by being the place you practise it. No words on screen explain it (show, don't label).
- The pieces are the GAME's pieces (the same colliders, ledges, ladders, cover the levels will use), so a course proves a piece is done.

## The modules (first two, his)
1. **COVER** -- the slide, slide-into-cover, move along it, vault, pop up and shoot. Built as `COVER.md` (part 1 is m1008; its three
   cinderblock pillars move into this course when the menu exists).
2. **GYM** -- ladders, ledges, monkey bars, and a gymnastics **HIGH BAR** (the horizontal bar): jump to it, catch it, swing, a full
   360 **giant swing** around it, and let go at the top of the swing into a flip (the **release** / **dismount**). The ledge grab and
   ladders exist from Weirdport (`LEDGE`, `KCLIMB`) and are the place to start; the monkey bars (hand over hand along a bar) and the
   high bar are new. Needs: the library's hang / shimmy / monkey-bar / swing clips through the Forge, a pendulum for the swing (the
   body's angle about the bar as the state, gravity and a pump on the stick), the release carrying the swing's speed off the bar.

## GYM part 1 -- the HIGH BAR (m1034, scaffold)
SPAWN > HIGH BAR puts a bar (2.55 m, 2.6 m wide) between you and the spawn. Jump into it: the hands catch it. **Hold the right pad** and he
pumps -- each swing bigger -- until he goes over the top into giant swings; **let go** and he flies off along the swing at its speed, turning
until he is upright for the landing. The left stick pushed along his facing pumps too; a tap drops him. The swing is a pendulum (`HBAR`);
the pose is the library's "Hanging Idle (gently swaying)" turned about the bar. **The pump motion itself is procedural / absent -- his own
pump clip goes in `HBAR.clips.pump`.** Later in the GYM: monkey bars (the upside-down ladder), the balance beam (his: there is a beam-walk
clip in the library), ledges and ladders.

### DONE WHEN (high bar)
- [ ] Catch the bar from a jump, every hero.
- [ ] Hold = pump, pump, over the top, giant swings; let go = fly off the way the swing goes, land upright.
- [ ] His pump clip in.
- [ ] **He played it on his phone and signed it off.**

## GYM part 2 -- the BALANCE BEAM (m1037)
SPAWN > BALANCE BEAM: a 10 cm beam, 7 m long, 1 m up, a platform at each end. Walk (or jump) onto it: he walks only along it, arms out, and
**balances** -- the lean grows by itself and wobbles more the faster he goes; push the left stick AGAINST the lean (across the beam) to bring
it back. Too far and he slips off that side; a tap jumps off; the ends step onto the platforms. Clips: the library's "Catwalk Walk Forward --
Legs Crossing", "Teeter", "Wobbling" (and "Edge Slip" baked for the fall).

### DONE WHEN (beam)
- [ ] On from a platform or a jump, along it, off the end / jump off / slip off a side -- every hero.
- [ ] The balance is fun: readable lean, a correction that feels like his, a fall that is fair.
- [ ] **He played it on his phone and signed it off.**

## Later candidates (not asked for yet)
Parkour (vault, wall run, wall jump), the sword's dummies, shooting range, the skate park.

## DONE WHEN (the menu itself)
- [ ] COURSES in the arena menu, a sub-menu, picking one builds it and takes the last one away; NONE clears it.
- [ ] COVER and GYM each have their own spec with their own DONE WHEN.
- [ ] **He played it on his phone and signed it off.**
