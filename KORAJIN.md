# KORAJIN

コラジン · Korajin Grumbo

Colin's new game, growing out of this repo (Oct 27 2026). It lives here, beside Zap & Clancy, behind the title picker
(build m1104) while it still borrows this engine. It will become its own repo; that move is a copy, the way zap was copied
out of weirdport. Do it when Korajin stops needing Zap's code, or the day he asks.

## The pitch (his words, kept)

- **Title:** KORAJIN. **Protagonist:** Korajin Grumbo. "Grumbo" is easier for an American audience than "Gurambo".
- **Genre:** mythic science-fantasy action adventure.
- **World:** an ancient alien civilization with retro-futuristic technology and supernatural folklore. Japanese-style buildings
  fused with flying things, like the anime zeppelin: robotic, cyberpunk-ish, futuristic and retro at once. Floating islands
  with waterfalls, red ceremonial banners, bronze machinery, weathered stone.
- **Visual identity:** stylized 3D, expressive characters, weathered stone, bronze machinery, ceremonial fabrics, mysterious
  energy. The two title posters show Grumbo (the purple-spotted alien goblin with the orange crest, the bronze armour and the
  red chevron cloth) on a rock in front of a bronze-and-stone town with floating islands behind.
- **Tone:** adventurous, strange, occasionally humorous, with an ancient mystery underneath. **Not too serious or mystical**:
  weird merchants, grumpy villagers, absurd creatures, peculiar customs and comedy, alongside the mysteries. Grumbo's name and his
  exaggerated design carry that personality, and it has to be kept.

## The mythology so far

- **Technology so old it has become tradition.** Floating lanterns, gates that open to a palm, mechanical creatures in the
  streets, a spacecraft in the mountain that everyone calls a temple. Nobody calls any of it futuristic.
- **The Jin:** an invented force (not a real Japanese definition) that connects living consciousness with matter. It is not
  quite electricity and not quite magic, and it is older than both. Jin-forged blades cut energy fields and wake dormant
  machines. Jin constructs are machines animated by fragments of consciousness. Jin spirits have no stable body.
- **"Jin" has many readings, deliberately:** 人 person, 仁 benevolence (a bushidō virtue), 神 spirit/deity, and the Arabic
  jinn (smokeless fire). The game can lean on all of them without claiming any is the meaning.
- **Factions (a start):** the Red Order (discipline and ritual; Grumbo's origins may tie to them), the Hollowed (bodies
  replaced with ancient machinery), the Veilborn (half outside reality), the Dustwalkers (scavengers and traders).
- **Grumbo:** a wandering warrior who doesn't fully understand his own ancestry. Tough, stubborn, a bit mischievous,
  unexpectedly kind. He enjoys fighting a little too much and keeps waking ancient tech he doesn't understand. Not a chosen one.
  His attitude: *something is causing trouble in this village, I'm going to deal with it.* The touchstone is Usagi Yojimbo.
- **The central mystery:** structures older than any history, some temples, some machines, some alive. All of them answer
  to the Jin, and Grumbo can wake them. Was the Korajin made to guard them, are they descended from their builders, or did the
  structures make the Korajin? Don't answer it early.

## MONEY: GOLD DOUBLOONS -- and the Jin is for POWERS (his lean, Oct 28 2026; "I don't really know yet")
> *"Coins, just like gold doubloons -- a cool looking gold coin. We'll have the Jin, the green glowing stuff, for my powers."*
- **Two currencies that never look alike:** GOLD (doubloons) buys things (the merchant, gear). MINT Jin powers Grumbo (and the ship's flight).
- **The doubloon (`COIN`, `coinGeo`, m1470):** hand-struck gold with a DIAMOND hole and the banners' nested crosshair diamond round it (his, m1475), a rim, in two tones. A pickup spins and bobs; walking through it collects it (a leap, a ring, a sparkle), and `COIN.n` counts (saved).
- **Not decided:** where coins come from beyond pickups (enemies? chests? the merchant buying from you?), prices, and a counter on screen.

## THE JIN GLOW -- the essence you can SEE (his, Oct 28 2026, off the serpent fish's spots)

> *"I really like this green glowing stuff... floating candles with this green glowing fire-liquid, things that should be spewing water but it's
> this green, weapons that shoot it, his katana makes it as it cuts the air. Maybe this is the stuff he collects -- the ship is in the water and you
> collect a bunch of it, store it, and then your ship can fly; eventually you get powers. It's the essence of the Jin, the Korajin."*

- **What it is:** the Jin made visible -- a liquid light, MINT (`JIN.hex` 0x7affd8, first drawn as `shipSerpentMake`'s glow spots). It is
  always the same colour, so the player learns one rule: **mint = Jin = power.** Nothing else in the palette may use that hue.
- **Where it shows (built so far, m1422):** the katana's trail, and the motes it sheds as it cuts (TOOLS > TRAIL: JIN / BLUE); the dojo's
  floating JIN CANDLES; the JIN SPRING pouring off the pagoda island.
- **Where it can show (to build):** Jin springs and fountains in the world in place of water; Jin-fed lanterns; creatures that carry it (the
  serpent fish, the manta and whale spots -- living sources); Jin weapons that fire it; a beaten enemy releasing it.
- **THE LOOP (his idea, the game's spine if he wants it):** Grumbo's ship sails the sea and GATHERS Jin -- from the serpents and great
  creatures, from springs, from wrecks. It is STORED in the ship's core (the tank you can see filling). Enough Jin and **the ship can FLY**
  (the sea-to-airship transformation he already wants). More Jin unlocks Grumbo's POWERS. So collecting is the progression, and flight is
  the first big payoff.
- **Open (his calls):** a name for the stored stuff (Jin / essence / a word of its own); whether you take it by fighting, by fishing or
  by drinking from springs; whether enemies want it too (a reason for the Hollowed to raid the ship).

## HIS NEXT BIG IDEA (open)

**What if Korajin isn't a species at all, but what happens when an ordinary living creature becomes bonded with Jin?** It would be
an ancient transformation that can happen to beings of many different species. That explains why Korajin warriors have
wildly different anatomies, why some look organic and others mechanical, and why some seem almost supernatural. And it gives
Grumbo his question: **was he born a Korajin, or did something turn him into one?**

For the game this is a gift. Every body in the cast (the samurai robot, the goblins, the orc, the lizards, the creatures)
can be a Korajin without being the same thing.

## What is already built (in the arena) that belongs to Korajin

The katana and its chains, the swing lurches (m1101), the guard and its strikes, the air legs (m1098), the juggle, the
dismembering robot samurai (m1090), the slicing horde with real life (m1102), the red archers (m1103), the directional
knock-downs on everybody (m1099), the rival, the beasts, the dragon fireball (m1096), the tornado, the zoom.

## THE RED HOLLOWS -- Grumbo's homeland (his direction, Oct 27 2026)

*"Grumbo's home territory should be the place that establishes the entire identity of KORAJIN. Not a generic samurai village, and not a
futuristic alien city. Something that looks ancient, organic, slightly primitive, but has mysterious technology embedded throughout it."*

A secluded settlement built into the remains of an ancient civilization: a sprawling canyon of enormous rounded sandstone formations, natural
caves, suspended wooden bridges, weathered red banners, and strange bronze machinery that nobody remembers how to manufacture. A place where
generations of unusual alien creatures have lived, traded, fought, and developed their own customs.

References: `images/korajin/ref/red_hollows_home.webp` (Grumbo lounging at his door: rounded sandstone, red diamond-spiral banners, bronze
lamps and a ship's-wheel gear, floating islands and waterfalls behind) and `images/korajin/ref/red_hollows_canyon.webp` (a deep canyon,
rope bridges, painted walls, hanging pennants, misty light from above).

In the game: world `home` (KORAJIN > The Red Hollows), first pass m1113 -- see NOTES.md.

## Not built yet

A bow for Grumbo; the sword-and-bow enemy who switches; a Korajin place (the bronze town, the floating islands); a Korajin
splash (drop the poster PNG in the repo and it goes on the title card).
