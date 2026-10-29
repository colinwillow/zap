# THE DOCKET (his, Oct 28 2026 night -- worked through overnight, one build each, ticked with the build number)

1. [x] (m1668) **The landing never blocks a jump.** On the ground = you can jump, at once, even mid-landing clip (his: "if you've jumped and you just hit
       the ground you should be able to jump right back up"). And the landing clip itself clipped / sped up (he doesn't love it).
2. [x] (m1669) **The Dragon zone's floating islands spaced for HIS jump** (LEVELDESIGN rules: jump apex, sprint gap, double jump) -- they are so close
       together it is hard to hop between them.
3. [x] (m1670) **The rocket launcher's jump-throw** (his: *"Wanted"* -- bend the bullet): hold UP on the right pad to ready the shot, jump, release in the
       air -> the rocket leaves with some of his upward velocity, so it climbs at a slight angle. Not exact; you can "throw" rockets up.
4. [x] (m1671) **Dragon riding controls, rebuilt:** no blaster in the saddle (he carries the ROCKET LAUNCHER at the start); RIGHT HOLD = fireballs,
       aimed like RollerGirl's blaster in the air; RIGHT FLICK on the ground = melee (lunge / bite / claw, from his clips); LEFT FLICK in the air
       = barrel rolls (sideways) and flips (up / down), like RollerGirl. (His speed / climb mapping to be settled -- ask.)
5. [x] (m1673; tail/wing springs still open) **Dragon fly animations:** an AIR IDLE (legs tucked, not standing) with a LOOPING wing flap; a DIVE (wings swept back); BANKS (one wing
       tucked); dynamic tail and wing tips (wind). Built in Blender (hand-keyed on his rig, or rotations stolen from the lightning dragon's
       `idle_fly_1/2`, `fly_fast`). Today's `attack_air` cut is not a loop and does not read as flying.
6. [x] (m1677; hits/death/attack still open) **The Osari spider, rigged by hand** (four legs; not a humanoid ARP rig): body, abdomen, fangs, each leg a chain; procedural stepping.
7. [x] (m1675; the inner-green version is his model, open) **The Osari bowman, the race's look:** limbs that chop off (as the samurai), and his DEATH = green smoke: he bursts and evaporates.
       Later: an "inner green" version of him as the war-boss-style reveal under armour.
8. [ ] (his, last) the saddle is HIS (he will cut it from the mesh); the dragon's other bugs -- he will describe them.
9. [x] (m1679) **The katana charge reticle:** the plain SQUARE one is still drawn under the new one -- drop it (something more interesting if a second
       mark is wanted at all), and the mark must draw BEHIND him (he is drawn over it when it is behind him).
10. [x] (m1679) **The katana high jump (charge up, then the stick to the bottom):** no ARC preview (a lean back or nothing). The jump itself is one smooth
       parabola (it rises, then moves forward, then swings, then drops), and the strike lands WITH him on the ground, not 3 m up.
11. [x] (m1680; dive sweep / bank tuck to redo on the arms) **The dragon's wings are his ARMS (a wyvern):** in his own up-and-flap clip the ARMS beat and the wings follow; ours holds the arms still
       and flaps only the fingers. Drive the arms (from that clip's flap, looped). And in the air his LEGS stand: sweep them back.
12. [x] (m1683; the camera's help still open) **Wall run, sound:** the SIDE run hardly ever starts (a sideways flick reads as UP); touching a wall in the air PERCHES at once, FACING
       AWAY, skimming down, ready to jump off (Prince of Persia) -- no flail first; jumping wall to wall easy and smooth; the wall's friction
       only on the way DOWN (a jump beside a wall is not cut short); the camera helps.
13. [x] (m1684) **The zip line:** you can drop off mid-line; slow; the hands are off the line; the sword is not out; no sparks. Wanted: speed, a swing
       (rotational, with velocity), maybe loops; keep the engage / disengage.
14. [x] (m1689) **The Osari's death is FIRE:** the green smoke must read as bright particle FIRE (green), not mods/smoke -- generated sprites.
15. [x] (m1688) **The charge's three releases (left stick at the release):** FORWARD = the forward slash (the launch); DOWN = the leap in the air and the
       slam down; NEITHER = the spin.
16. [x] (m1688) **The charge locks onto an incoming ARROW or ROCKET:** release and he meets it in the air where it flies and slashes it -- back at
       the shooter.

# THE DOCKET, part 2 (his, Oct 29 2026) -- in this order
*"When you're done solving all the stuff: a few passes on Level 1 v2 (it's fun, I like it) ... wall running, a rope bridge that moves to my weight,
ladders, ropes, a tightrope that bends ... tighten the dynamics, then layer 1 of Level 1 v2, then layers 2, 3, 4 into a full level ... a sandbox of all
the building-kit buildings on terrain with plants to see how they hold up ... other agents on some of it -- but the main chat does the hard stuff
best."* MAIN = this session (dynamics, the feel); AGENT = a separate session can take it from its spec.

17. [ ] MAIN **The WALL-RUN SANDBOX** (`PARKOUR.md` / `WRUN`): one playground with every wall a run can meet -- a long wall (run along), a tall wall
       to a ledge (run up), a chimney (wall-jump up it), two walls across a pit (run, jump, run), an inside and an outside corner, a wall over
       water/pit to fall off -- then tighten the dynamics against it with him.
18. [ ] MAIN **The ROPE pieces, one sandbox:** a ROPE BRIDGE of planks on two ropes that sags and sways under HIS weight (verlet, like the willow's
       vines), a TIGHTROPE that bends where he stands and wobbles his balance, a hanging ROPE to climb and swing on, and LADDERS (rungs, a rope
       ladder that swings).
19. [ ] MAIN **Level 1 v2 (`BEACON.md`), layer 1 tightened** with what 17 and 18 settle; then **layers 2, 3, 4** (puzzle, enemies, theme) into a
       full level.
20. [ ] AGENT **The BUILDING-KIT CITY test:** every kit building on terrain with height differences and plants, in one level; measure draw calls,
       triangles and FPS on a phone-sized render as the count grows; report what breaks first.
21. [ ] AGENT **PLACE INTROS** (`CINEMA.md`): the reel player (orbit, dolly, cut, back; title card, letterbox, skip) and the first intros
       (Arena, Ship, Red Hollows, Snowfield).
22. [ ] **THE TUTORIAL** (`TUTORIAL.md`): Level 0 teaches the core (move, jump, flips, the sword, evade, counter, charge) in one contained place;
       every later ability is taught where it is found. Design first (MAIN), build after 17-19.
