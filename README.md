# Project: Proof

Project: Proof is an AI-generated interactive math-learning game. The mathematical ideas and learning sequence are human-checked; the implementation code is AI-generated and experimental. It is intentionally both a playable experiment and a software-design experiment.

## Why this project exists

1. **Test vibe coding** — explore how far natural-language collaboration and AI-assisted implementation can take a small, evolving game.
2. **Make math learnable through play** — turn mathematical ideas into missions, choices, puzzles, and visual feedback instead of presenting them only as exercises.

The current build is a lightweight demo. Its visual language is deliberately minimal, and its missions use math tools as part of a story-driven sequence.

## Learning roadmap

The planned calculus path is:

**Foundation → Continuity → Derivative → Integration**

The foundation chapter starts with sets, logic, and operations. Later chapters can branch into related topics whenever a concept benefits from its own game mechanic or story route.

Current foundation outline:

- **0.0 — Logic** (playable): AND, OR, NOT, IMPLIES, FORALL, and EXISTS through dialog-based escape puzzles.
- **0.1 — Sets** (playable): equality, union, intersection, difference, and Cartesian product.
- **0.2 — Functions & relationships** (playable): representations, composition, domains, and injective/surjective/bijective behavior.
- **0.3 — Special relationships** (planned): order, posets, and equivalence relations.
- **0.4 — Cardinality** (tentative): comparing the sizes of finite and infinite sets.
- **0.5 — Fields** (tentative): field structures as a bridge toward algebra and calculus.

## Long-term ambition

The ambitious endpoint is to reach differential forms and integration on manifolds, while keeping the same principle: make abstract structure something the player can explore, manipulate, and use.

That goal is intentionally larger than the current demo. The project will grow incrementally as the learning design, mathematics, and interaction model are tested.

## Project status

This is an experimental demo, not a finished curriculum or production game. Expect the story, mechanics, visual style, and roadmap to evolve. Human review remains essential for the mathematics; the code should be treated as an evolving prototype.

## Developer entry URLs

For quick testing, the current playable chapters can be opened directly:

- `/0.0` — Logic
- `/0.1` — Sets
- `/0.2` — Functions & relationships

Each chapter also accepts a scene shortcut; `N` is `0` through `6`, with `stage` accepted as an alias:

- `/0.0?cheat=logic&scene=N`
- `/0.1?cheat=sets&scene=N`
- `/0.2?cheat=relay&scene=N`

The `skip` cheat name is accepted for all three chapters. There is no 0.3 route in the current build.
