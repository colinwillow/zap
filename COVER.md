# Slide, cover, vault -- a movement sandbox for the shooting

**Status: spec only (Oct 25 2026, his idea). Nothing built.** It is a sandbox under the WHOLE-PIECE RULE (`CLAUDE.md`): a white
obstacle course of half-height blocks, done when every box below is ticked with evidence and he has signed it off on his phone.

## Why
*"I disabled the cover on walls because it was automatic and would trigger any time you go against a wall -- really annoying. But I
still want cover... the way we initiate it so it doesn't happen accidentally: you slide tackle into the curb and that initiates the
cover... people make Unreal motion packs, parkour, slide to cover, hurdle over -- I want to build all that on mobile."*

## The controls (his, as described)
| left pad flick | does |
|---|---|
| away from any wall | a **SLIDE TACKLE** (replaces the dive roll; maybe the roll stays on another case) |
| **toward** a half-height wall in range | **SLIDE INTO COVER**: back to the wall, crouched |
| in cover, toward the wall | **VAULT** over it |
| in cover, away | leave cover |

| right pad | in cover |
|---|---|
| hold UP (gun out) | **POP UP** and shoot over the wall; let go -> back down |

Cover is only ever entered on purpose (the flick toward the wall), never by walking into one.

## The rule that makes it fair (his)
The aim is a 2-D plane (no up/down). So bolts fly at a height that **passes OVER a half-height wall**: crouched behind it, they go
over your head; standing (popped up to shoot), they hit you. Cover protects by ducking, not by the wall eating shots -- so shooting
from cover costs exposure, and the cheap "stand behind it and shoot" does not exist.

## DONE WHEN
- [ ] A white course of half-height blocks (cinder-block walls, curbs) in its own sandbox.
- [ ] Slide tackle on the left flick; slide-into-cover when flicked toward a wall in range; never automatic.
- [ ] Vault over from cover; leave cover away from it.
- [ ] Pop up and shoot (right pad up) and drop back on release.
- [ ] Bolts pass over a crouched body behind half cover and hit a standing one -- both ways (him and the enemies).
- [ ] Enemies that use it too (at least one that ducks and pops).
- [ ] No words on screen explain any of it.
- [ ] **He played it on his phone and signed it off as fun.**

## Needs
Clips (library / Forge): slide, slide-to-cover, cover idle crouched (both sides), cover pop-up shoot, vault. The old wall-cover code
(disabled) is the place to look first -- `grep -n` NOTES.md for the cover / wall entries before writing any of it.
