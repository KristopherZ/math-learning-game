# Interactive Math Learning Project Plan

## 1. Project summary

Build a web-based mathematical puzzle game where players understand mathematics by using it to change a responsive architectural world. Players manipulate models, make predictions, test ideas, solve interconnected puzzles, and unlock new routes and mathematical powers. A short foundations prologue will review sets and logic before the project moves into single-variable calculus. The game, puzzle, content, and motion systems should remain reusable for algebra, geometry, statistics, linear algebra, differential equations, and other subjects.

The first release should be a short, polished puzzle chapter rather than a complete course or large game. Its purpose is to prove that mathematics can function as the core game mechanic, and that a small set of reusable puzzle and animation patterns can teach difficult concepts well.

The companion [Theme and Art Direction](THEME_AND_ART_DIRECTION.md) document defines the original serene architectural world, abstract character direction, restrained palette, direct mathematical tools, scene rhythm, and motion personality. Keep that creative layer separate from the reusable puzzle and learning architecture described here.

### North-star experience

A learner should be able to:

1. Enter a curious world with a visible problem to solve.
2. Discover that a mathematical relationship controls part of that world.
3. Manipulate the relationship, predict the result, and watch the system react.
4. Revise a strategy using graphical, numerical, symbolic, and verbal clues.
5. Solve the puzzle and unlock a meaningful new tool, route, or possibility.
6. Reuse the idea in a less familiar puzzle and leave knowing why the solution worked.

### Initial audience

Start with learners preparing for or encountering introductory calculus at the late-secondary or early-university level. Begin with a skippable or compact foundations prologue covering sets and logic, then provide short prerequisite refreshers where algebra, functions, graphs, or slopes block progress.

The early product should also be useful to self-learners and teachers demonstrating a concept in class, but it should feel like a game rather than a digital worksheet. Teacher-specific workflows can wait until the player experience is proven.

## 2. Product principles

These principles should guide content, design, and technical decisions.

### Interaction before exposition

Whenever possible, begin with something the learner can change or predict. Explanation should name and organize an experience the learner has already started to form.

### Math is the game mechanic

The player should solve problems by reasoning about mathematical relationships, not by completing a quiz to resume the game. Changing a function, controlling a rate, balancing an accumulation, or constructing a geometric object should directly change the puzzle world.

### Mathematical tools, not tile manipulation

The player changes puzzle state through explicit mathematical tools: constructing a set, running an operation, shaping a function, measuring a slope, or controlling an accumulation. The core game must not depend on rearranging scene tiles, comic panels, rooms, or story frames. Cinematic scene sequencing may clarify cause and effect, but mathematics determines the outcome.

### Puzzles create a need to know

New notation and techniques should appear because the player has reached a problem that is difficult to solve without them. The game should let curiosity and useful obstacles pull the player toward formal mathematics.

### Multiple representations stay connected

Graphs, formulas, tables, diagrams, motion, and plain-language explanations should update together. A student should see that these are different views of one idea, not unrelated procedures.

### The world is the interface

During play, prefer the agent, objects, containers, doors, paths, and mathematical marks over headers, dashboards, chapter banners, side panels, and explanatory cards. Use the fewest words that preserve the goal. Familiar objects should give an operation a reason to exist before notation names it.

### Euler's e is the guide

The player character is a small lowercase italic **e** with line-drawn eyes, arms, legs, boots, and an angular cowboy hat. It begins as a curious mathematical mark and gains meaning as the story approaches exponential functions, logarithms, and calculus. It stays recognizable as the symbol itself rather than becoming a human body carrying an **e** emblem. Never enclose it in a circle or badge.

The **e** uses a dedicated non-interactive traversal layer. Scene composition must keep it clear of every object, label, mathematical mark, and hit target at all supported screen sizes. It may react to a solution, but it must never become an obstacle to solving one.

### Every interaction has a learning purpose

Animation alone is not interactivity. An activity should ask the learner to notice, predict, construct, compare, estimate, classify, or explain something.

### Motion communicates the world

The experience should feel calm but responsive. Controls, diagrams, structures, transitions, and successful solutions should use eased motion, gentle spring settling, clear anticipation, and coordinated architectural transformation. Motion must communicate causality, focus, continuity, or emotional payoff; it must never make a mathematical relationship appear false or overwhelm a quiet thinking state.

### Feedback explains, not merely scores

Responses should identify the likely idea behind an error and suggest a productive next action. Correct answers should also receive brief conceptual reinforcement when useful.

### Progressive formality

Move from intuition to visual structure to notation to generalization. Formal definitions remain important, but they should arrive when the learner has a reason to need them.

### Short, focused learning loops

Chapters should be composed of short puzzles and checkpoints that can be completed in a few minutes. A player should make meaningful progress even during a short session and should have clear stopping points.

### Accessible by design

Core learning must not depend only on color, precise pointer movement, hearing, or animation. Keyboard control, readable text, reduced motion, adequate contrast, and meaningful descriptions should be part of each interaction's definition of done.

### Expand through composition

New puzzles should usually be assembled from existing mechanics, activity types, visual primitives, motion patterns, assessment patterns, and layout components. A one-off mechanism should be introduced only when it represents a genuinely reusable game or teaching pattern.

## 3. Scope of the first experiment

### First implementation slice: Chapter 0.1, The Archive Set

The first coded experiment should be a short playable foundations mission introducing sets through direct manipulation. The player selects a key and ID card to construct phone-authentication set S and must make it equal to required set D. The mission then uses union in a document room, intersection during a spy exchange, difference while abandoning a tracker, a Cartesian product to copy every stolen file into every safe archive slot, and a cumulative decoder that turns the operations into one secret extraction code.

This release is explicitly a **demo**, not a finished course or full game. A short opening briefing names the prototype, introduces Euler **e**, establishes the archive mission, and sets expectations before the first concept note appears. The demo label remains visible but quiet during play.

It should include:

- A brief animated story opening with a single `begin demo` action.
- A first-time concept note defining a set and equality of sets.
- A field phone that displays `D = { key, ID card }` and updates `S` as the player takes a key, ID card, tracker, or duplicate key.
- Explicit behavior showing that order and repeated elements do not change a set.
- A document-room union where the player takes every item named in either of two documents.
- A spy intersection exchange where the player takes only the item named by both lists.
- A difference escape where the player leaves the flagged tracker behind and slips past one surveillance camera.
- A Cartesian-product copy room where the player constructs every ordered file-slot pair to create complete backups.
- A cumulative code scene where union recovers all digits, intersection keeps verified digits, difference removes a compromised digit, Cartesian product assigns the clean digit to code positions, and a final difference removes the burned pair so `{ (2,2) }` translates to code `22`.
- A first-time concept note before each operation's first use, with manual review afterward.
- A composed scene sequence in which correct mathematical results transform the architecture and let the agent proceed.
- Keyboard, touch, reduced-motion, and non-color alternatives.
- User-started, muteable background music and interaction feedback sourced from documented CC0 libraries; no puzzle state may depend on sound.
- A hybrid equation layer: pinned CDN-hosted MathJax renders symbolic LaTeX, while React/CSS continues to render interactive sets containing game objects.

### Next calculus vertical slice: derivatives as local change

Before the derivative slice, Chapter 0.2 implements the required function bridge as a six-scene relay mission. It covers function machines, domain/codomain/range, linked representations, the function condition for relations, composition order, left/right/two-sided inverses, and domain restriction. Its complete scene and learning specification is documented in [Chapter 0.2 — Relay Logic](CHAPTER_0_2_FUNCTIONS.md).

After Chapter 0 proves the game runtime and art direction, build a small calculus chapter connecting average rate of change, secant lines, tangent lines, instantaneous rate of change, and the derivative graph.

A possible scenario is a transport or energy path whose motion controls have failed. The player restores it by learning how local changes in a control curve affect speed and direction. The reusable mechanics must not depend on one story.

It should include:

- An opening puzzle that uses two movable points and a secant line to compare average rates.
- A calibration puzzle where a controllable interval shrinks toward a point and the player predicts the local rate.
- Linked numerical, graphical, symbolic, and world-state views of the difference quotient.
- A construction puzzle where the player uses tangent slopes to produce or repair a derivative trace.
- A final transfer puzzle that uses the same idea in motion or another unfamiliar context.
- At least one optional route, challenge, or alternate solution that rewards deeper understanding.
- Misconception-aware feedback embedded in puzzle reactions, dialogue, and staged hints.
- Expressive, interruptible animation for controls, system reactions, transitions, failure recovery, and success.

### Questions the experiment should answer

- Do learners understand set equality, the four tested operations, and ordered pairs after manipulating the model?
- Does the Chapter 0 tool-and-scene runtime transfer cleanly to the derivative chapter?
- Do players experience the math as the means of solving the puzzle rather than as an interruption?
- Is the chapter enjoyable and intriguing enough that players want to try another route or puzzle?
- Which representation changes are most helpful or most confusing?
- Can the same graph, slider, prompt, hint, feedback, game-state, and motion systems support several puzzles?
- Can a new puzzle be authored mostly by configuring reusable pieces?
- Does expressive motion improve understanding of cause and effect without overwhelming the player?
- Does the experience remain usable with keyboard navigation, touch, and reduced motion?
- Can learner progress be represented without coupling it to one subject?

### Explicit non-goals for the first experiment

- A complete calculus course or long campaign.
- Accounts, social features, classrooms, or teacher dashboards.
- Points, currencies, streaks, or collectibles that are disconnected from mathematical play.
- Combat, inventory, or narrative systems that do not contribute to the first puzzle chapter.
- Tile rearrangement, comic-panel rearrangement, or scene-order manipulation as a core mechanic.
- Persistent top banners, dashboard layouts, or text-heavy briefing screens during puzzle play.
- A general-purpose computer algebra system.
- Automatic recognition of unrestricted handwritten work.
- Artificial-intelligence tutoring as a dependency for core puzzles.
- Native mobile applications.
- A complex backend before persistent cross-device data is needed.

## 4. Game design framework

### Core game loop

Each puzzle should support a compact loop:

1. **Observe:** enter a space and notice a system, goal, and constraint.
2. **Experiment:** manipulate the available mathematical controls and watch the world respond.
3. **Form a model:** connect the response to a graph, quantity, formula, diagram, or rule.
4. **Plan:** predict a configuration or sequence that will satisfy the goal.
5. **Commit:** run the system, launch the object, or lock in the construction.
6. **Read the result:** use animated consequences and focused feedback to understand success or failure.
7. **Revise or advance:** try a new strategy, discover an alternate solution, or unlock the next route.

This loop should take seconds for a small interaction and several minutes for a complete puzzle. Restarting and revising must be quick and pleasant.

### Math-driven puzzle rules

- The mathematical model must control an important part of the game state.
- The player must use a named mathematical tool or construction to change that state; scene sequencing alone is not the puzzle.
- Do not use tile, room, or narrative-panel rearrangement as a substitute for mathematical reasoning.
- The player must make a meaningful choice; merely following animated instructions is not a puzzle.
- Correctness should be visible in the world as well as stated in text.
- Failure should be informative, reversible, and often entertaining.
- Brute-force guessing should be possible to recognize and less efficient than reasoning.
- Parameters should support variation so the player demonstrates a concept rather than memorizing one answer.
- The final challenge in a sequence should reduce scaffolding or change context.
- When possible, allow multiple valid strategies and acknowledge them distinctly.

### Non-linear progression

Represent the concept dependency graph as an explorable world map. Use a clear main route plus optional branches rather than a single list of chapters.

- Main-path puzzles establish essential concepts.
- Side puzzles deepen intuition, explore edge cases, or provide prerequisite refreshers.
- Challenge routes offer less scaffolding, unusual constraints, or multiple solutions.
- Some nodes can be approached in different orders when their prerequisites allow it.
- Previously solved spaces can change or reveal new layers after the player gains another mathematical tool.
- Locked routes should show what kind of understanding is needed without exposing the solution.

Non-linearity must not hide prerequisite gaps. The map should guide without pretending that every mathematical idea can be learned in any order.

### Progression and rewards

Prefer rewards that expand mathematical agency:

- A new control, representation, or transformation.
- Access to a new region or alternate route.
- A more powerful version of a familiar tool.
- A visible repair or transformation of the world.
- Optional challenges and elegant-solution recognition.
- New story information tied to the system the player has learned to control.

Scores may summarize precision, efficiency, or creativity when those qualities matter mathematically. They should not become the primary reason to play.

### Puzzle anatomy

Every puzzle specification should define:

- The player-facing goal and world state.
- The mathematical concept and observable learning objective.
- Available controls, constraints, and representations.
- Valid solution conditions and any alternate solution classes.
- Likely failed strategies and misconceptions.
- Staged hints and recovery behavior.
- Parameter variations and edge cases.
- Rewards, unlocks, and persistent world changes.
- Motion cues for entry, manipulation, preview, commit, failure, success, and exit.
- Keyboard, touch, reduced-motion, and non-visual equivalents.
- Evidence used to update concept progress.

### Motion and animation direction

Create a shared motion language instead of animating each screen independently. “Non-linear animation” should include expressive eased or physics-inspired timing, spatial arcs, anticipation, follow-through, layered reactions, and transitions that preserve object continuity.

Use motion for four purposes:

1. **Causality:** show which player action changed which result.
2. **Attention:** guide focus to the relevant object or relationship.
3. **Continuity:** help players understand where objects and ideas moved between states.
4. **Payoff:** make discovery, failure, repair, and completion emotionally satisfying.

The motion system should provide a small vocabulary of reusable behaviors: enter, exit, focus, connect, transform, react, celebrate, warn, reset, and transition. Choreography should be driven by semantic game events so visuals can change without changing puzzle logic.

Mathematical animation requires stricter rules than decorative motion. Points and curves representing actual values must follow the true model; easing can control time but cannot falsify position or quantity. Decorative objects may squash, stretch, overshoot, trail, or anticipate more freely. All motion should be interruptible, respond immediately to input, perform well on ordinary devices, and have a reduced-motion form that preserves information and game feel.

Aim for a motion-rich interface in which every meaningful action receives a response, not a screen where every object moves continuously. Stillness is useful for concentration and makes important motion feel stronger.

## 5. Calculus curriculum map

The curriculum should be represented as a dependency graph rather than only a fixed chapter sequence. This allows guided paths while still supporting exploration and later insertion of prerequisite material.

### Strand A: foundations and limits

1. Functions as relationships and transformations.
2. Reading change from graphs, tables, and formulas.
3. Average rate of change.
4. Approaching a value.
5. One-sided and two-sided limits.
6. Continuity and types of discontinuity.
7. Infinite behavior and asymptotes.

### Strand B: derivatives

1. Secant slope and shrinking intervals.
2. Tangent slope and instantaneous rate of change.
3. The derivative as a function.
4. Numerical and graphical differentiation.
5. Core differentiation rules.
6. Chain rule as nested change.
7. Implicit differentiation.
8. Related rates.
9. Linear approximation.
10. Optimization and curve analysis.

### Strand C: integrals

1. Accumulation from small pieces.
2. Signed area.
3. Riemann sums and refinement.
4. The definite integral.
5. Accumulation functions.
6. The Fundamental Theorem of Calculus.
7. Antiderivatives and basic techniques.
8. Applications to area, volume, motion, and average value.

### Strand D: synthesis

1. Modeling change and accumulation in the same system.
2. Choosing numerical, graphical, or symbolic methods.
3. Multi-step applied investigations.
4. Cumulative review and concept connections.

### Prerequisite bridge modules

Keep short, reusable refreshers available for function notation, graph interpretation, algebraic simplification, exponents, trigonometry, and solving equations. These should appear when needed rather than becoming a long mandatory pre-course.

## 6. Reusable puzzle and learning design

### Chapter structure

Each chapter should use a consistent six-part arc:

1. **Arrival:** reveal a world problem, surprising behavior, or mystery.
2. **Play:** let the player manipulate a focused system with low stakes.
3. **Discovery:** use the first puzzle to expose a pattern or invariant.
4. **Tool gain:** name the idea and give the player a more precise representation or control.
5. **Escalation:** vary constraints, parameters, representations, or paths across further puzzles.
6. **Mastery puzzle:** ask the player to transfer the idea without the original visual cues.

Not every chapter needs six visible rooms or screens, but all six game and learning functions should be considered during authoring.

### Activity families

Prioritize reusable activity families instead of custom puzzle pages.

| Activity family | Player action | Examples in calculus | Future reuse |
| --- | --- | --- | --- |
| Manipulate and observe | Move a point, slider, region, or vector | Shrink a secant interval | Transformations, vectors, probability |
| Predict and reveal | Commit to an outcome before simulation | Predict tangent slope | Geometry, statistics, differential equations |
| Construct | Place or shape a mathematical object | Draw a tangent or accumulation region | Graphing, geometry, linear algebra |
| Match representations | Connect graph, formula, table, or description | Match a function with its derivative | All subjects |
| Estimate and refine | Improve an approximation iteratively | Refine a Riemann sum | Numerical methods, measurement |
| Diagnose | Find and explain an error | Identify a false derivative argument | Algebra and proof-oriented topics |
| Apply in context | Build or use a model | Interpret velocity from position | Science, economics, statistics |
| Explain | State a relationship in words | Explain why a derivative is negative | All subjects |

Activity families are ingredients rather than complete puzzles. A puzzle combines one or more activities with a world goal, constraints, game-state consequences, animation cues, feedback, and progression rules.

### Feedback model

Feedback should be organized into layers:

- Acknowledge the learner's action immediately.
- Indicate whether the result meets the current goal.
- Diagnose a likely misconception when evidence supports it.
- Offer a small hint that preserves productive struggle.
- Reveal a fuller explanation only after further effort or on request.
- Provide a next challenge when the learner is ready.

Store common misconceptions with the concept they relate to, not only with individual questions or puzzles. This will let later chapters reuse the same diagnostic knowledge. When possible, let the world reaction expose the mismatch before displaying an explanation.

## 7. Conceptual product architecture

The project should be JavaScript-first and web-first. Keep content, mathematical models, rendering, interaction behavior, and learner state separated so each can evolve independently.

### Major layers

1. **Application shell**

   Handles navigation, world-map selection, responsive layout, themes, accessibility preferences, and session boundaries.

2. **Game and puzzle runtime**

   Owns puzzle phases, world state, goals, constraints, attempts, checkpoints, unlocks, branching routes, rewards, and semantic events. It should be subject-independent and should never contain calculus-specific correctness rules.

3. **Learning runtime**

   Reads concept and objective definitions, interprets evidence, selects staged hints, updates concept progress, and emits learning events. It should know about generic learning actions, not calculus-specific rules.

4. **Activity system**

   Provides reusable activity families with consistent input, feedback, reset, and completion behavior.

5. **Math model layer**

   Contains pure mathematical relationships such as functions, domains, sampling, slopes, limits, numerical approximations, and coordinate transformations. Keep these independent of the screen so they are easy to test.

6. **Visualization layer**

   Renders axes, curves, points, lines, areas, annotations, and transitions using the most suitable browser primitive. Use a shared coordinate system and interaction contract even if individual visuals use scalable vector graphics, canvas, or standard page elements.

7. **Motion and choreography system**

   Converts semantic events into coordinated, interruptible animation. It owns shared motion patterns, timing families, sequencing, reduced-motion behavior, and performance controls while remaining independent of puzzle correctness.

8. **Content layer**

   Stores worlds, chapters, puzzles, concepts, prerequisites, learning objectives, prompts, parameter sets, hints, misconception feedback, motion cues, rewards, and accessibility descriptions as structured data and prose. Content should not contain low-level rendering logic.

9. **Player and learner model**

   Tracks attempts, puzzle completion, routes, unlocks, world changes, evidence of understanding, preferences, and concept-level progress. Start locally in the browser behind a storage boundary so a server-backed account system can replace it later.

10. **Observability and research layer**

   Records privacy-conscious events that answer learning, game, motion, and usability questions: puzzle started, strategy attempted, prediction made, hint requested, representation changed, route chosen, retry made, animation skipped, and goal completed. Avoid collecting data without a stated decision it will inform.

### Architectural boundaries to protect

- A chapter chooses and configures puzzles; a puzzle chooses and configures activities; neither implements them.
- An activity requests mathematical results; it does not duplicate math logic.
- A visualization displays state; it does not own game or curriculum progress.
- Game state reacts to mathematical results; it does not redefine them.
- Motion responds to semantic events; it does not determine puzzle correctness or learner progress.
- Assessment produces evidence; it does not directly decide global mastery.
- Storage is accessed through a narrow boundary; puzzles do not care whether data is local or remote.
- Subject-specific modules can register concepts and activities without modifying the application shell.

### JavaScript strategy

- Begin with modern JavaScript modules and a small build tool suitable for rapid browser development.
- Use strong linting, formatting, documentation conventions, and runtime validation at content boundaries.
- Keep computational functions small and deterministic so mathematical behavior can be tested thoroughly.
- Keep animation state separate from mathematical state, with clear semantic events connecting them.
- Centralize the motion language so easing, spring behavior, choreography, interruption, and reduced-motion behavior remain consistent.
- Add static typing incrementally only if the content model and reusable APIs become difficult to change safely. Do not make a language migration a prerequisite for the first experiment.
- Prefer a small number of well-understood dependencies. Select the user-interface, equation-rendering, visualization, animation, audio, and testing tools during the implementation kickoff, using a short prototype for each high-risk interaction.

### Suggested project organization

When implementation begins, organize the repository by stable responsibilities:

- `docs`: product decisions, learning design, accessibility, and authoring guidance.
- `app`: application shell, navigation, world map, and page composition.
- `game`: puzzle runtime, world state, goals, constraints, unlocks, and checkpoints.
- `learning`: concept progress, evidence rules, hints, and feedback.
- `activities`: reusable interaction families.
- `math`: subject-independent math utilities and subject-specific models.
- `visuals`: coordinate systems, drawing primitives, and chart components.
- `motion`: semantic animation patterns, choreography, and accessibility variants.
- `content`: worlds, chapters, puzzles, curriculum maps, concepts, prompts, and parameter sets.
- `state`: player, learner, and persistence boundaries.
- `analytics`: event definitions and research instrumentation.
- `tests`: integration, accessibility, visual, and end-to-end coverage.

The exact names can change, but the boundaries should remain explicit.

## 8. Extensibility model

### Core content entities

Define stable conceptual entities before creating many puzzles:

- **Subject:** a broad domain such as calculus or statistics.
- **World:** a themed space containing chapters, routes, persistent changes, and shared game rules.
- **Chapter:** a connected sequence or graph of puzzles with a dramatic and conceptual arc.
- **Puzzle:** a goal-driven game situation with mathematical controls, constraints, outcomes, and evidence.
- **Mechanic:** a reusable way the player acts on a mathematical or game system.
- **Concept:** a teachable idea with prerequisites and evidence of understanding.
- **Objective:** an observable capability expected from the learner.
- **Activity:** a reusable learning interaction configured within a puzzle.
- **Representation:** a graph, formula, table, diagram, animation, or verbal view.
- **Prompt:** a learner-facing request with response and feedback rules.
- **Misconception:** a recognizable incorrect model linked to targeted feedback.
- **Evidence:** an observation that updates concept-level progress.
- **Game event:** a semantic occurrence such as preview, commit, collision, repair, unlock, or completion.
- **Motion cue:** a reusable animated response attached to a game event, including its reduced-motion equivalent.

Each entity needs a stable identifier so content can move without invalidating progress or links.

### Rules for adding a new subject

A subject module should need to provide only:

- Its concept and prerequisite graph.
- World, chapter, puzzle, and activity configurations.
- Subject-specific math models.
- Any genuinely new reusable game mechanics, visual primitives, activity families, or motion patterns.
- Subject terminology and notation preferences.
- Its own test fixtures and reference cases.

It should reuse the application shell, game and puzzle runtime, learning runtime, progress model, feedback system, motion language, accessibility behavior, and analytics vocabulary.

### Authoring workflow

1. State the concept, prerequisites, observable objective, and player fantasy.
2. Identify the misconception or conceptual obstacle.
3. Define a world problem that is solved by understanding that obstacle.
4. Choose the player action that can expose or resolve it.
5. Select existing puzzle mechanics and activity families or justify a new reusable one.
6. Define controls, constraints, valid strategies, connected representations, and synchronized world state.
7. Write staged hints, failure reactions, success feedback, rewards, and a transfer puzzle.
8. Add representative parameter sets, alternate solution classes, and edge cases.
9. Storyboard semantic game events and motion cues, including reduced-motion behavior.
10. Review mathematical accuracy, puzzle clarity, accessibility, cognitive load, and motion load.
11. Playtest with representative players and record revisions.

### Decision records

Keep short decision records for choices that affect many future puzzles, such as coordinate conventions, content identifiers, world-state rules, mastery rules, route unlocking, math-input behavior, motion language, animation policy, and dependency selection. Record the context, decision, tradeoffs, and conditions that would justify revisiting it.

## 9. User experience outline

### Main learner flow

1. Arrive in a world with a clear immediate problem and a few visible routes.
2. Choose an available puzzle node or accept a recommended path.
3. Enter a puzzle with one primary goal and a readable world state.
4. Explore in a large interactive workspace and discover the mathematical controls.
5. Predict, commit, watch the animated result, and revise without unnecessary waiting.
6. Request a staged hint or switch representations without losing work.
7. Solve the puzzle and see the world change, a route open, or a tool become available.
8. Complete a transfer puzzle before concept mastery is inferred.
9. Return to the map and choose among meaningful next steps.

### Screen priorities

- Keep the mathematical object central and controls close to what they affect.
- Make the current goal, constraints, and available action obvious without turning the screen into a worksheet.
- Avoid permanent dashboards, panels, or statistics that compete with learning.
- Preserve state when changing representations or reviewing an explanation.
- Support small screens by rearranging views rather than shrinking the entire desktop layout.
- Make reset, undo, replay, and keyboard instructions easy to find.
- Let animation connect state changes across views and spaces, but never delay repeated attempts.
- Allow players to skip or accelerate non-essential sequences after seeing them once.
- Keep decorative motion quieter while the player is reading, calculating, or making a precise manipulation.

### Motivation

Use intrinsic game progress first: visible discovery, increasingly powerful mathematical controls, changed environments, optional challenges, alternate routes, and an expanding map of connected ideas. Story, animation, and rewards should make mathematical agency feel exciting. Avoid reward loops that encourage players to bypass the reasoning the game is meant to develop.

## 10. Quality strategy

### Mathematical correctness

- Maintain reference cases for every mathematical model.
- Test ordinary cases, boundary cases, discontinuities, invalid domains, numerical precision limits, and extreme viewport scales.
- Review puzzle explanations and feedback separately from software review.
- Display approximation honestly and distinguish it from exact reasoning.

### Learning quality

- Tie every interaction to an objective and observable evidence.
- Check whether a learner can transfer the idea without the original controls.
- Watch for completion by guessing or exploiting the interface.
- Conduct short think-aloud sessions early; five useful observations are more valuable than polishing an untested puzzle sequence.
- Revise prompts and feedback based on real errors, not only anticipated ones.

### Game and puzzle quality

- Test whether the goal and available actions are understandable without revealing the strategy.
- Confirm that mathematical reasoning is materially more effective than random experimentation.
- Look for unintended shortcuts, dead ends, repetitive setup, and punishing retry loops.
- Observe whether failure produces a useful new hypothesis rather than only frustration.
- Test optional routes and alternate solutions with players who use different strategies.
- Separate measures of puzzle enjoyment, mathematical understanding, and visual appeal so one does not mask a weakness in another.

### Motion quality

- Review every motion sequence for purpose, readability, interruption, and reduced-motion equivalence.
- Verify that mathematical objects follow the true mathematical state throughout animation.
- Test rapid repeated input, mid-animation reversal, reset, navigation, and window resizing.
- Keep control response immediate even when secondary world reactions continue.
- Evaluate choreography across supported computer and tablet browser ratios, not only high-performance development machines.
- Check that sound, particles, shake, and celebration intensity can be reduced independently if those features are later added.

### Software quality

- Unit-test deterministic math and progress logic.
- Integration-test linked representations, game events, puzzle state changes, and motion interruption.
- End-to-end test the critical player paths and alternate routes on desktop, touch-sized screens, and keyboard-only input.
- Add visual and motion checks for graphs, labels, clipping, responsive layout, equation rendering, event choreography, and reduced-motion states.
- Set performance budgets for initial loading, interaction response, and animation smoothness before the content library grows.

### Accessibility

- Test keyboard navigation and visible focus for every interactive control.
- Provide non-color cues and sufficient contrast.
- Respect reduced-motion preferences and avoid essential information that exists only during animation.
- Give graphs and diagrams useful summaries, current-value readouts, and alternate ways to change values.
- Use familiar page semantics and announce dynamic feedback appropriately.
- Include accessibility acceptance criteria in each activity family, not as a final audit.

## 11. Delivery roadmap

The phases are outcome-based. Their duration should be estimated only after the first interaction prototype exposes the main technical and content risks.

### Phase 0: foundations prologue prototype

**Goal:** validate the direct-math-tool loop, first-time concept notes, architectural response, and core game runtime with Chapter 0.1.

Deliverables:

- A one-page definition of the initial learner and learning objective.
- A one-page player fantasy and direct-math-tool loop.
- A storyboard for field-phone equality, document-room union, spy intersection exchange, tracker difference escape, Cartesian archive copying, and the cumulative code decoder.
- A misconception list covering membership, equality, duplicates, union, intersection, difference, Cartesian products, and ordered pairs.
- A playable Chapter 0.1 scene sequence.
- First-time concept notes with local seen-state and manual replay.
- A motion study covering tool selection, operation commit, architectural response, failure, reset, and traversal.
- Initial accessibility and mathematical reference cases.
- Decision records for the first technology choices.

Exit condition: a player can complete the set mission using mathematical tools and explain why each architectural change occurred.

### Phase 1: polished foundations chapter

**Goal:** turn Chapter 0.1 into a polished, end-to-end public foundations prologue and establish the reusable puzzle contracts.

Deliverables:

- Minimal application shell, world map, game runtime, and learning runtime.
- Six connected set puzzles plus a preview of the logic chapter.
- Reusable set display, element selector, operation tool, prompt, concept note, feedback, game-event, and motion capabilities.
- The complete foundations arc from equality through Cartesian products and cumulative operation use.
- Local puzzle progress, unlocks, world state, and preferences.
- Core automated tests and accessibility checks.
- Lightweight learning, game, and motion research events tied to explicit questions.

Exit condition: representative players can complete the chapter, want to continue, and demonstrate set understanding without relying on multiple-choice guessing.

### Phase 2: derivative vertical slice

**Goal:** prove that the foundations runtime, mathematical tool contract, visual language, and motion system transfer to calculus.

Build the derivative-as-local-change chapter with secant, tangent, derivative-trace, and transfer puzzles. Reuse the same concept-note, commit, feedback, architectural-response, and progress systems while introducing graph, point, line, and slider primitives.

Exit condition: a new puzzle cluster can be produced through the documented authoring workflow without changing the application shell or core game runtime.

### Phase 3: small calculus collection

**Goal:** prove that the architecture supports reuse across limits, derivatives, and accumulation rather than only two impressive chapters.

Deliverables may include:

- A concept map and prerequisite routing.
- Approximately six to ten focused puzzle clusters across a non-linear world map.
- Cumulative challenges, revisitable spaces, and concept progress summaries.
- A consistent visual identity and motion language across the world.
- More complete responsive, accessibility, performance, and browser coverage.
- A content review and release process.
- Optional anonymous feedback collection with clear privacy messaging.

Exit condition: learners can follow a coherent early-calculus path and retain or transfer core ideas in delayed checks.

### Phase 4: calculus foundations release and platform expansion

**Goal:** validate subject independence and richer use cases.

Complete the limits, derivatives, and integrals foundations path, then choose one contrasting subject, such as geometry or statistics, and build a small puzzle region using the same runtime. Only after this proof should the project consider accounts, teacher tools, classroom assignment, content editors, collaboration, or advanced adaptive sequencing.

Exit condition: the second subject reuses the platform's core systems and reveals only bounded, intentional extension points.

## 12. Backlog priorities

### Must have for the first vertical slice

- Precise learning objectives for set membership, equality, union, intersection, difference, Cartesian products, and ordered pairs.
- A six-scene game loop: satisfy the field phone through set equality, take the union of two document lists, take their intersection to a spy, leave the tracker through set difference, copy files into archive slots with a Cartesian product, then decode the final strip through a short operation chain.
- Direct element-selection and operation tools with no tile or multiple-choice dependency.
- Synchronized inline set equations, tool state, and architectural consequences. Each set uses exactly one normal-sized brace pair; ellipses, enlarged decorative braces, and duplicated brace notation are not used.
- Larger readable objects and notation, sparse structural linework, distinct layouts for each operation, operation-specific completion choreography, and an optional cursor-proximity text highlight.
- First-time concept notes, fast retry, targeted hints, and explanatory feedback.
- A semantic motion system with reusable event choreography and reduced-motion variants.
- Keyboard and touch support.
- Reduced-motion behavior and non-color cues.
- Local concept-note, motion-preference, player, world, and learning state.
- Set-operation model tests and complete critical player-path tests.
- A small, documented learning, game, and motion event vocabulary for research.

### Should have after the first slice works

- Concept prerequisites and optional refreshers.
- More puzzle mechanics and activity families.
- World-map navigation with prerequisite-aware branches.
- Persistent local progress across chapters.
- Authoring validation and preview tools.
- Visual regression and performance monitoring.

### Later, only with demonstrated need

- User accounts and cloud synchronization.
- Teacher dashboards and assignments.
- Adaptive route or puzzle recommendations.
- Rich equation input or symbolic equivalence checking.
- Localization and right-to-left layout.
- Offline installation.
- Collaborative activities.
- AI-assisted hints or explanations with strict correctness safeguards.

## 13. Success measures

Use a small set of measures that reflect understanding and product health.

### Learning

- Improvement from prediction or pre-check to transfer task.
- Ability to explain the concept in words or a new representation.
- Success on a delayed or varied problem, not only immediate repetition.
- Reduction in targeted misconceptions.

### Experience

- Puzzle and chapter completion without external help.
- Productive use of hints followed by successful retry.
- Low rates of unexplained reset, abandonment, or repeated guessing.
- Learner-reported clarity and confidence, interpreted alongside performance.

### Game and motion

- Players can state the goal and discover how their mathematical controls affect it.
- Players choose to continue, explore an optional route, replay, or try a more elegant solution.
- Solutions show purposeful mathematical strategies rather than mostly brute-force attempts.
- Failure-to-retry time remains short, and retries show changed hypotheses.
- Motion helps players identify cause and effect and does not increase error or hesitation.
- Reduced-motion players achieve comparable puzzle understanding and completion.

### Platform

- Time and effort required to author a new puzzle cluster.
- Percentage of a puzzle assembled from existing mechanics, activities, game events, visuals, and motion patterns.
- Number of one-off components or animation sequences introduced per puzzle.
- Accessibility, performance, and automated-test pass rates.

Do not optimize a single metric in isolation. For example, faster completion can mean improved clarity or shallow guessing; transfer evidence distinguishes the two.

## 14. Main risks and mitigations

| Risk | Likely consequence | Mitigation |
| --- | --- | --- |
| Building a framework before proving a puzzle | Large abstractions based on guesses | Build one vertical slice and extract only demonstrated patterns |
| Game wrapper separated from the math | Players rush through quizzes to return to the fun | Make mathematical controls directly determine world outcomes |
| Puzzles reward guessing | Completion without conceptual learning | Use prediction, variable parameters, strategy evidence, and transfer puzzles |
| Motion everywhere becomes visual noise | Fatigue, confusion, and weak focus | Animate meaningful state changes, create quiet thinking states, and test motion load |
| Expressive easing distorts a graph or quantity | Incorrect mathematical intuition | Separate decorative motion from mathematically faithful animation and test trajectories |
| Long celebration and reset sequences | Repeated attempts become frustrating | Make choreography interruptible, skippable, and shorter after the first view |
| Branching progression hides prerequisites | Players enter puzzles without required tools | Use a dependency-aware world map with suggested routes and visible requirements |
| Narrative and world logic are too tightly coupled | New subjects require rebuilding the game | Keep theme content separate from the reusable puzzle and learning runtimes |
| Beautiful motion without active reasoning | Engagement without understanding | Require prediction, construction, or explanation around visuals |
| Too much content too early | Inconsistent quality and slow iteration | Keep the first release to one short chapter and test each puzzle loop |
| Numerical artifacts presented as truth | Misconceptions near limits or discontinuities | Define precision policy and test edge cases explicitly |
| Over-generalized puzzle and activity APIs | Difficult authoring and awkward puzzles | Generalize after the second real use, not before the first |
| Accessibility added late | Core interactions require redesign | Include alternate input and output in each activity specification |
| Heavy dependency stack | Slow loading and difficult upgrades | Use dependencies only for clear, measured value |
| Premature backend and accounts | Privacy and operational burden | Begin with local persistence behind a replaceable boundary |
| Progress reduced to completion | False sense of mastery | Track concept evidence and transfer, not only visited screens |

## 15. First implementation kickoff

When the project moves from planning to implementation, begin in this order:

1. Write Chapter 0.1's measurable set objectives and quiet architectural player fantasy.
2. Sketch field-phone equality, document-room union, spy intersection exchange, tracker difference escape, archive copying, and code decoding as one scene sequence.
3. Define reference sets, common misconceptions, valid strategies, and likely guessing behavior.
4. Storyboard player actions, mathematical tool states, semantic game events, and architectural motion beats.
5. Prototype the field-phone authentication set and one operation tool before adding decorative architecture.
6. Add one-time concept notes for equality, union, intersection, difference, and Cartesian product.
7. Create a short motion study for tool selection, operation commit, failure, reset, architectural transformation, and traversal.
8. Playtest the puzzle and motion with a few representative players.
9. Build the complete Chapter 0.1 slice while recording reusable patterns.
10. Extract the first mathematical-tool, puzzle, and motion contracts only after the chapter works end to end.
11. Use those contracts in the derivative vertical slice to test genuine reuse.

## 16. Definition of done for the first experiment

The Chapter 0.1 foundations experiment is complete when:

- The player understands the immediate goal and uses math to change the game world.
- The lowercase **e** is recognizable as the player character without obscuring any object, label, mathematical mark, or hit target.
- Six connected scenes form a satisfying equality, union, intersection, difference, Cartesian-product, and cumulative-decoder mission arc.
- The player makes phone set `S` equal `D = { key, ID card }` and receives a concise document-room mission; selecting both physical keys demonstrates that duplicates do not alter the set.
- Union packs everything named in either document; intersection selects the shared object for the spy; difference leaves the flagged tracker behind.
- Cartesian product creates all four ordered file-slot pairs, and the finale uses union, intersection, Cartesian product, and two meaningful differences to leave `{ (2,2) }` and reveal code `22`.
- In the final scene, the result set is exactly what **e** carries. Selecting the tracker keeps it on **e** and causes the camera to catch the character. Leaving the tracker out but omitting the key or ID card stops the escape because the mission gear is incomplete. Only `{ key, ID card }` drops the tracker, turns the single camera toward the decoy, and lets **e** escape through its blind side.
- Repeated elements and different ordering are handled according to set equality.
- The player constructs operation results with math tools instead of choosing among fixed answers.
- Brace-based set displays, tool state, and architectural consequences remain synchronized without ellipse or Venn-style set containers.
- A first-time concept note appears before each operation's first use and remains available for manual review.
- Feedback addresses the documented misconceptions.
- Failure is informative, recovery is quick, and brute-force completion is detectable.
- Meaningful actions receive calm, clear, non-linear architectural motion responses.
- Mathematical animation remains faithful, and all choreography is interruptible.
- The full experience works with pointer, touch, and keyboard input.
- Reduced-motion and non-color alternatives preserve the puzzle's meaning and sense of response.
- Mathematical edge cases, critical player paths, and optional routes are tested.
- Puzzle progress, unlocks, and world state survive a refresh locally.
- Research events answer the experiment's stated questions without unnecessary personal data.
- The derivative vertical slice can reuse the core game, concept-note, prompt, feedback, progress, and motion systems.

## 17. Planning decisions to revisit after the vertical slice

Do not settle these permanently before evidence exists:

- Whether the project needs a component framework and, if so, which one.
- Whether to stay with JavaScript or incrementally adopt static typing.
- Whether vector graphics, canvas, or a hybrid should be the main rendering approach.
- Whether the motion system needs a dedicated animation dependency or only a small internal layer.
- Which world theme and narrative density best support the mathematical play.
- How open the world map can become without weakening prerequisite guidance.
- Whether scoring precision, efficiency, or elegance improves puzzle play.
- How much symbolic manipulation the product truly needs.
- Whether learner progress should use a simple evidence model or a more advanced mastery model.
- Whether puzzle authors need raw structured files, visual tooling, or both.
- Whether accounts, a backend, or teacher features solve a proven user problem.

The durable investment should be in clear learning objectives, tested puzzle mechanics, mathematical correctness, a coherent motion language, accessible behavior, and clean boundaries between content and runtime. Those assets will survive changes in libraries, world themes, and product direction.
