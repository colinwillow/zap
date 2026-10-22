# The transformation — a person turning into an alien

**Status: DESIGN, not built.** A sandbox of its own. He owns this file.

*"I'm really excited to rig a character that will transform and morph into his alien self... see an NPC look like a zombie
breaking out, with a bigger bulge, alien green skin, armour coming out of his body one piece at a time: the arm goes, the
shoulder goes, the leg goes, the whole body, and he does the werewolf cry."*

## How people get turned (the triggers)

All of them end in the same transformation; they differ only in how it starts.
1. **The green drink.** Fluorescent green ooze in cans: in special vending machines, lying on the ground, on tables. An NPC
   wanders over, picks one up, drinks it, and turns.
2. **The aliens' tools.** A Brute / Warlord / Kront stabs a **beacon canister** into someone, or fires a **syringe dart** (the
   DNA gun as the aliens' weapon): the dart sticks, the green spreads from the wound.
3. **Zap has it too, at first** -- walk up and stab, or shoot a dart -- so he can trigger it at will while tuning.
4. **A debug button**: tap an NPC, it turns; tap again, it turns back.

## The transformation itself (piece by piece, not a swap)

Spreads outward **from where he was stuck** (the wound, or the mouth for the drink), one body region at a time:
1. **Infection**: green veins crawl across the skin from the wound (a shader mask growing over the body).
2. **Region by region** (arm, shoulder, leg, torso, head; the order is the distance from the wound): the region **bulges**
   (swells past the human silhouette), **the skin goes alien green**, and **an armour piece bursts out** of it (the
   `armor_<bone>` pieces the pipeline already makes, scaling up out of the body with a pop of particles).
3. **The cry.** At the end he throws his head back and roars (the werewolf howl), and the full alien stands there.
4. **And back again**, the reverse (Zap's cure, later the story).

## How it can be built (the plan, before the wrap pipeline exists)

Both bodies are **Mixamo rigs**, so it works without shared topology:
- Spawn the alien rig on the same spot and **drive its skeleton from the human's** (copy bone rotations each frame, scale
  by the height ratio as it grows), so both bodies are in the same pose at all times.
- Each body draws through a shader that **discards by region**: a per-vertex region ID from its strongest skin weight
  (arm L/R, leg L/R, torso, head), with a per-region 0..1 "turned" value. As a region turns, the human's discards and the
  alien's shows, with a glowing green seam at the boundary and a **bulge** (normal push) on the human region just before it
  goes.
- The armour piece of that region pops in with a burst; `spkCling` crawls on him the whole time.
- **Later**, the universal base-mesh wrap (Character Creator base mesh wrapped onto every character in the pipeline)
  turns this into a true blend-shape morph with no seam. The region plan above is what makes it feel right first.

## The sandbox

In the white box hub: **SPAWN** a civilian (hick, hobo, biker...) and pick his alien (Brute grunt / Warboss / Grey); the
triggers are buttons (STAB / DART / DRINK / DEBUG TOGGLE) plus a drink can and a vending machine on the floor; a **SPEED**
slider scrubs the transformation slow so it can be tuned frame by frame.

## DONE WHEN

- [ ] All four triggers work in the sandbox and each starts from the right place (wound / mouth).
- [ ] The spread goes region by region from the start point: veins, bulge, green, armour bursts out.
- [ ] The cry at the end; the full alien stands in exactly the human's pose, nothing pops.
- [ ] It runs backwards (the cure).
- [ ] The speed slider scrubs it.
- [ ] **He watched it on his phone and signed it off.**
