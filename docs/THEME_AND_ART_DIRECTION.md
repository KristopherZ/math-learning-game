# Theme and Art Direction

## 1. Active creative direction

**Project: Proof** is a minimal mathematical journey through an original world drawn from gray lines, geometric structures, objects, and functions. The player guides a small abstract field agent through spaces governed by sets, graphs, transformations, and logical rules. A mathematical relationship is never presented as a detached test: it determines which objects a door accepts, which path appears, or which structure can move.

The experience should feel:

- Calm, curious, and precise.
- Diagrammatic and spatial rather than technological.
- Cinematic without long cutscenes.
- Visually elegant without dense detail.
- Mysterious without becoming dark or threatening.
- Mathematical without resembling a worksheet.

This direction replaces the earlier noir and spy-thriller treatment. “Field operation” remains a light framing device, but the world should feel like a quiet mathematical monument rather than a document-heavy secret agency.

## 2. Reference boundaries

The visual direction may draw high-level inspiration from serene architectural puzzle games: harmonious composition, impossible-looking structures, readable silhouettes, restrained palettes, and environments that reveal their rules through motion.

The game-flow direction may draw high-level inspiration from visual narrative puzzle games: concise scenes, strong cause and effect, anticipation before an action, and a satisfying animated consequence after the player commits a plan.

The project must remain original:

- Do not copy characters, monuments, layouts, level shapes, palettes, symbols, animations, dialogue, logos, music, or story from Monument Valley.
- Do not copy FRAMED's comic panels, noir presentation, characters, sequences, or panel-rearrangement mechanic.
- Do not ask the player to rearrange tiles, panels, rooms, or story frames.
- Do not hide a conventional quiz behind a visual reference to another game.
- Use mathematical tools as the only way to alter puzzle state.

The references describe a quality bar and emotional rhythm, not a template.

## 3. Core visual idea

The world is a mathematical line drawing that becomes a living scene. Doors, containers, paths, arches, braces, and functions are assembled from a few thin strokes and pale planes. Familiar objects such as keys, photos, tickets, maps, and seals give set membership a concrete purpose.

Examples:

- A union operation combines the contents of two lockers into one field kit, which raises a bridge.
- An intersection identifies the credential shared by two registries, which aligns a door.
- A difference operation removes tracked objects from a carry set before extraction.
- A function becomes the physical path followed by the agent.
- A derivative controls the direction or steepness of a moving platform.
- An integral fills a basin and raises a bridge.
- A logical statement powers one branch of a mechanism while disabling another.

The mathematical state and architectural state must always agree.

## 4. Rendering approach

### Current phase

Build the world in the browser as a two-dimensional composition using page elements, CSS shapes, thin lines, clipping, and a very small amount of layering. Avoid a 3D engine, free camera, realistic lighting, and heavy isometric rendering during theme exploration.

### Visual construction

- Begin with gray lines, braces, containers, doors, and function paths.
- Suggest depth only when it makes an object relationship clearer.
- Keep every puzzle readable as a diagram when the decorative depth is ignored.
- Use generous negative space and one central architectural composition per scene.
- Prefer large meaningful forms over environmental props.
- Integrate axes, curves, braces, set expressions, and labels into the architecture.
- Keep only lines that establish a floor, boundary, route, or mathematical consequence; remove ornamental crossing lines and repeated construction guides.
- Scale objects, notation, and short prompts for comfortable recognition instead of making minimalism depend on tiny elements.
- Avoid textures, detailed materials, realistic interiors, and heavy interface chrome.

### Camera and scene framing

- Use a fixed composed view for each puzzle.
- Let the camera move only during scene transitions, major reveals, or completion.
- Preserve the location of important mathematical objects between states.
- Frame the agent and current tool as small parts of a larger mathematical structure.
- Use clear foreground, puzzle plane, and distant background layers without requiring true perspective.

## 5. Shape language

### World shapes

- Braces: the only visual boundary for sets, domains, and membership groups. Render them at the same normal text size as the surrounding equation, and show exactly one brace pair per displayed set.
- Circles and rings: motion traces or portals only; never use them as set containers.
- Lines and curves: paths, functions, connections, and causal flow.
- Arches: conditions, gates, or mathematical constraints.
- Platforms: stable known quantities or completed expressions.
- Stairs: discrete progression and ordered steps.
- Bridges: relationships created by an operation.
- Open gaps: missing information or unsatisfied conditions.
- Dots and markers: elements, samples, inputs, and critical points.

### Character shape

The main character is a small lowercase italic **e**: Euler's number made into a moving mathematical mark. It gives the early foundations chapter a quiet connection to the calculus world ahead, where exponential change, logarithms, and the derivative of `e^x` will become important.

The character is still unmistakably a lowercase **e**, but now has tiny line-drawn eyes, arms, legs, boots, and an angular cowboy hat. Use a muted-coral glyph with dark gray details so it remains legible against the gray-line world at small sizes. Do not place the character inside a circle, badge, or other enclosing shape.

Avoid:

- Detailed anatomy or clothing beyond the small cowboy hat and boots.
- Turning the glyph into a conventional human body with an **e** printed on it.
- A silhouette or animation too close to any existing game character.
- Motion that competes with the mathematical scene.

The **e** communicates through its eyes, arm gestures, walking legs, tilt, weight, pauses, hops, and short rolling arcs. Keep these reactions spare, line-drawn, and typographic.

The character belongs to its own traversal layer, behind or clear of the interactive object row. It must never cover an object, label, mathematical mark, or hit target. Character motion is decorative feedback and cannot intercept pointer input.

## 6. Color direction

Use a nearly monochrome palette during exploration. Gray linework carries structure; muted coral identifies the agent or current cause, and pale sage confirms a valid state.

| Role | Direction | Starting reference |
| --- | --- | --- |
| Background | Warm ivory | `#F4EEE4` |
| Primary structure | Warm white | `#FFFDF8` |
| Secondary structure | Pale gray | `#D8DCD7` |
| Structural line | Gray-green | `#B6C7C0` |
| Text and strong outline | Deep mineral green | `#33413C` |
| Player and active cause | Muted coral | `#E78C82` |
| Valid mathematical state | Sage teal | `#77B8AC` |
| Secondary set or concept | Gray violet | `#AAA1BF` |
| Attention or unresolved state | Medium gray | `#AEB5B0` |

Color rules:

- Use one accent consistently for the same set or quantity across the entire scene.
- Pair color with a label, shape, position, or line style.
- Reserve saturated accents for the player and current mathematical action.
- Keep most of the scene neutral; do not create a rainbow environment.
- A solved structure may become slightly warmer or more connected, not explosively colorful.
- Maintain a high-contrast mode and color-vision-safe alternatives.

## 7. Mathematical tools

The player never rearranges scene tiles or narrative panels. Progress comes from selecting, constructing, measuring, transforming, or applying mathematics directly.

### Set Lens

Reveals which objects belong to a set and displays the current set in braces. The player can include or remove elements from a constructed result.

### Union Kit

Combines every distinct object from two lockers. When correct, the complete kit activates a bridge or lift.

### Intersection Credential

Keeps only credentials shared by two registries. The recognized credential aligns a doorway.

### Difference Sweep

Begins with the agent's carry set and removes objects found on a tracked or forbidden list. The clean carry set opens extraction.

### Equality Seal

Compares two sets by membership. It ignores order and repeated elements, then authenticates the field phone when its required and supplied sets are equal.

### Later calculus tools

- Secant probe.
- Tangent lens.
- Function path editor.
- Slope tracer.
- Accumulation basin.
- Constraint field.

Every tool needs a visible input, a mathematical operation, a previewable output, and an architectural consequence.

## 8. Game-flow direction

The experience should unfold as a sequence of sparse visual scenes. Each scene shows the agent, a few objects, a container or door, and one mathematical relationship. After the player commits a result, the scene becomes a short animated story beat before cutting to the next space.

### Scene rhythm

1. **Reveal:** the complete object-and-door problem appears with almost no text.
2. **Observe:** the agent pauses while the relevant sets, functions, or conditions become visible.
3. **Learn:** before the first use of a concept, a concise field note explains the operation.
4. **Construct:** the player uses the mathematical tool directly.
5. **Commit:** the player runs the operation.
6. **Consequence:** the architecture opens, connects, retracts, or redirects.
7. **Traverse:** the agent moves through the changed structure.
8. **Cut:** the composition transitions to the next scene.

The cinematic feeling comes from silhouette movement, anticipation, frozen emphasis, directional wipes, and cause-and-effect editing—not from rearranging panels.

Equality, union, intersection, and difference should not reuse one composition. Union pulls two sources toward one result, intersection focuses inward around a crossing, and difference separates or cuts one source away. Their completion motion should express those meanings before the scene transitions.

### Failure rhythm

- The tool shows the constructed mathematical result.
- An incorrect structure attempts to move but cannot align.
- The mismatched elements remain highlighted.
- The scene settles immediately back into an editable state.
- A targeted hint becomes available after repeated attempts.

Failure must be reversible, quick, and visually informative.

## 9. Chapter 0.1: The Archive Set

### Premise

The agent enters a quiet records building carrying a locked field phone. The phone message begins the mission: collect every required item from the document room, exchange the shared item with a spy, and abandon the tracker before the surveillance camera finds **e**.

### Scene 1: The Field Phone

The locked phone displays the required authentication set `D = { key, ID card }`. A key, ID card, route map, and spare key are available nearby. The player takes objects to construct `S` directly on the phone screen.

The message arrives only when `S = D`. The two physical keys share one mathematical kind, so taking both still contributes only `key`; the phone notes that the repeat is ignored. This introduces membership, set equality, distinct elements, and duplicates through the mission action.

### Scene 2: Document-Room Union

Two documents list overlapping required objects. The player takes everything named in document A or document B and packs the union into the document case. This is the first set concept note and the first mathematical construction in the mission.

### Scene 3: Spy Intersection

Two exchange lists name overlapping items. The player takes only what appears on both lists and carries that intersection to a waiting spy. The spy reaches out, accepts the shared item, and passes back the extraction route.

### Scene 4: Leave the Tracker

The carry set includes a tracker. The flagged set identifies it. The player constructs `A ∖ B`, physically leaving the tracker behind while carrying the key and ID card onward.

Only this final scene introduces a visible threat: one spare, unlabeled wall-mounted surveillance camera. The body and cone share one aiming pivot so the cone remains physically attached to the lens while sweeping. The cone begins narrow at the lens and widens into the room. A correct difference first drops the tracker as a decoy, then turns the camera toward its signal; only after the blind side opens does **e** run safely away and the chapter advance automatically.

The result set represents what **e** carries. If it still includes the tracker, the camera snaps toward **e** and displays “caught.” If the tracker is gone but either the key or ID card is missing, **e** is stopped because the mission gear is incomplete; this is not a camera capture. Both failures return control with a targeted hint and no slow restart.

### Animation causality

Every scene must show cause before consequence. Phone equality reveals the message without making **e** leave. Union visibly packs the complete result into the document case before escape. Intersection moves the shared ID card into the spy's hand before escape. Difference distinguishes carrying the tracker from forgetting required gear; only a complete tracker-free carry set drops the decoy, redirects the camera, and opens the escape. Scene cuts swap locations while the panels cover the frame, never after they have already passed.

### Completion

The four scenes contract into one mission path: phone equality, document-room union, spy intersection, and tracker difference. The debrief previews statements, truth values, and logical connectives as the next operation.

## 10. First-time concept notes

Before the first use of each concept, open a compact modal field note.

Each note contains:

- The operation name and notation.
- One plain-language definition.
- One small worked example.
- One memorable interpretation.
- A single button returning control to the puzzle.

Rules:

- Show a note automatically only before first use on that device.
- Let the player reopen any learned note from the footer.
- Never require the player to reread it after failure.
- Keep the puzzle visible behind a softened backdrop.
- Use the same architectural palette and motion language as the scene.

## 11. Motion direction

Motion should be slow enough to read and quick enough to retry.

### Motion qualities

- Soft eased starts and gentle spring settling.
- Platforms that extend from a clear origin.
- Rings and arches that align along readable paths.
- Lines that propagate from mathematical cause to architectural effect.
- Small character anticipation before traversal.
- Brief pauses at important mathematical states.

### Motion hierarchy

1. Player input responds immediately.
2. The mathematical representation updates.
3. The affected architecture transforms.
4. The character traverses the result.
5. Decorative background motion responds last, if at all.

### Reduced motion

Reduced-motion mode replaces long travel, large zooms, parallax, and overshoot with short fades, direct state changes, and persistent cause-and-effect highlights. Mathematical information must remain equivalent.

## 12. Interface direction

The interface should almost disappear.

- Do not use a persistent top banner, brand header, chapter title, or side briefing panel during play.
- Use one short sentence in the scene only when the objects cannot communicate the goal alone.
- Place mathematical notation directly on the door, container, registry, or path it controls.
- Keep progress to four quiet dots and concept review to one small control.
- Avoid dense dashboards, cards, option grids, tactical screens, metallic controls, and faux machinery.
- Keep the current result set visible while the player edits it.
- Provide obvious reset, check, concept-note, and reduced-motion controls.
- Support keyboard, pointer, and touch interaction.
- On pointer devices, nearby text receives a restrained white halo that follows cursor proximity. This is an optional focus cue, never the sole indication of meaning, and does not replace keyboard focus styling.

## 13. Audio direction

Audio is optional for the prototype. If added later:

- Use soft wooden, ceramic, paper, bell, and airy tonal sounds.
- Let successful operations resolve a small musical interval.
- Use quiet rhythmic movement rather than action-film tension.
- Give each mathematical tool a consistent sonic identity.
- Never make audio the only carrier of state or correctness.

## 14. Accessibility

- Pair color with labels, set notation, shape, and position.
- Maintain readable contrast on pale architecture.
- Make interactive elements larger than their visible markers.
- Provide keyboard controls and visible focus states.
- Describe current sets and operation results in text.
- Keep concept notes readable with zoom and small screens.
- Respect reduced-motion preferences.
- Avoid time pressure in concept-learning puzzles.
- Ensure decorative depth never obscures the underlying two-dimensional diagram.

## 15. Creative boundaries for implementation

- A puzzle must work with plain geometric placeholders before decorative art is added.
- Mathematical state determines architectural state; animation never invents correctness.
- Scene transitions listen to semantic events such as operation checked, gate opened, and path crossed.
- The visual layer must not inspect or duplicate set-operation logic.
- Theme-specific names belong in content, not core puzzle code.
- Avoid raster character or environment assets when CSS geometry communicates the idea cleanly.
- Do not reproduce protected reference-game assets or distinctive level compositions.

## 16. Definition of done for the new direction

The direction is working when:

- A player describes the game as a calm mathematical architecture puzzle.
- The environment, notation, and mathematical tool feel like one system.
- The agent is recognizable but clearly original.
- The lowercase **e** remains clear at small sizes and never obscures an interactive object, label, mathematical mark, or hit target.
- Players solve scenes by using math tools, never by rearranging tiles or panels.
- The sequence feels cinematic because each mathematical action changes what happens next.
- Set equality, union, intersection, and difference are visible in the architecture.
- The palette and forms remain legible on desktop and mobile.
- Reduced-motion and non-color alternatives preserve the puzzle logic.
- The same visual grammar can later support functions and calculus.
