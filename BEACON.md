# THE FIRST BEACON -- Level 1 v2 (his, Oct 28 2026)

KORAJIN > **Level 1 v2 -- The First Beacon** (`?w=forge&lvl=beacon`). The canyon floor of the Red Hollows up to the enemy's torch tower.
**References:** `images/korajin/ref/beacon_sheet.jpg` and `beacon_plan.jpg` (his ChatGPT sheets, made from the blueprint brief), the blueprint draft
artifact, LEVELDESIGN.md (the five layers, omakase, THE BLUEPRINT), LEVELGRID.md (the MOVE TABLE). He will block it out in Cinema 4D later; until
then the level is GENERATED from `BEACON.plan` in index.html.

## How it is built
- `BEACON.plan` is the blueprint: STATIONS (`st`, a mesa solid to the floor, a ladder up its side, a sign) and RUNS (`aim` + a list of chunks).
- The chunks are the library's (`CHUNKS`, sized from the move table at 92% of comfy) plus `BCH`: `hop` (3.5 m), `walk:L`, `chim:H` (a chimney of any height).
- `beaconBuild` chains them: each piece starts at the last one's out port, heading along the axis that points best at the run's aim, with a corner
  pad where it turns. **So every gap and climb is makeable by construction, and a station lands wherever its run arrives.**
- Verbs on this level: run, jump, double jump, ledge catch, and (served) the WALL JUMP. No weapon.

## DONE WHEN (layer 1, THE RUN) -- each ticked with evidence in a NOTES entry; the last box is his sign-off on the phone
- [x] the route exists end to end from the blueprint: S 0 -> A 10.9 -> B 4.9 -> C 22.9 -> D 26.9 -> zips -> T 10.9 -> brazier 33.8 (m1549)
- [ ] every piece WALKED by the route checker (scripted inputs, the shipped frame), not just sized
- [x] the spine crosses itself (m15xx): the rooftops run C -> D back WEST over the lantern ruin A (23-27 m over its 10.9 top), and the zips pass the sunken court B (`go:E/W/N/S` steering in the plan). Still open: stations seeing each other, checked from each one
- [ ] the tower seen from S (the canyon is kept to 6 m along the S -> brazier line; not yet checked from S in a render)
- [ ] verticality and spread checked from a wide render (no one plane)
- [~] a canyon to stand in (m15xx, part 1): 222 stepped sandstone mesas on an 8 m lattice, never within 8 m of the route or under a zip; near ones are shoulders below the route's height, the outer ring (wider than the lattice) closes into canyon WALLS 26-50 m. Open: a canyon material (the sandstone reads spongy up close), carved shapes rather than boxes
- [ ] the four beats of the wall jump feel right (taught safe, developed, twisted, concluded)
- [ ] fail forward: every fall lands somewhere with a ladder back up near where you fell
- [ ] rests and checkpoints at the stations
- [ ] **his sign-off on his phone**

## Layers 2-5 (not before layer 1 is signed)
2 the lever at A (a bridge home), the candle at C (a lift down to B) · 3 three dormant terracotta sentries with 6 m zones · 4 the canyon's look ·
5 the tower's guardian sweeps, pour the Jinra, the beacon turns mint.
