# Chapter 0.2 — Relay Logic

## Purpose

Chapter 0.2 is the functions-and-relations bridge between the set foundations in Chapter 0.1 and the later calculus route. It is a six-scene demo in the same sparse geometric spy world. The chapter makes functions feel like machines and routes before naming their formal parts.

The player should leave knowing that:

- A function assigns exactly one output to every input in its domain.
- The domain is the allowed input set, the codomain is the declared target set, and the range is the set of outputs actually reached.
- A formula, table, mapping diagram, and graph can represent the same function.
- A relation is not necessarily a function.
- In `g ∘ f`, `f` acts first.
- Left, right, and two-sided inverses guarantee different kinds of return.
- Restricting a domain can make a non-invertible rule invertible.

## Story

The code recovered in Chapter 0.1 points to a clandestine machine network under surveillance. Euler enters the relay as a forged signal and must make every transformation internally consistent. A split signal, duplicate route, or irreversible path gives the patrol enough information to find the agent.

The story and mathematics share one rule: every input must travel deliberately.

## Scene sequence

### 1. Wire the relay — function as machine

Euler reaches a damaged `+1` relay. The player connects each input in domain `A = {0,1,2}` to its correct output in codomain `B = {1,2,3,4}`.

The range updates while wires are selected. The relay clears only when every domain input has exactly one output and the wiring agrees with `f(x)=x+1`.

### 2. Forge the clearance signature — representations

A patrol plotter checks the movement signature attached to Euler's forged clearance. Its points have been corrupted.

The player drags the five discrete graph points vertically until the graph agrees with `q:x↦x²`. The table and current range update live. No lines connect the points because the displayed domain is the discrete set `{-2,-1,0,1,2}`.

This scene treats formula, table, graph, domain, codomain, and range as simultaneous views of one function.

### 3. Repair the relay network — relations and functions

The damaged relay network does not know where to send one signal: one input port branches toward two output channels.

The player cuts one duplicate route while a test pulse crosses the network. The relay passes only when every input in the domain has exactly one output. Removing too much creates an input with no destination; leaving the duplicate makes the relay hesitate between two destinations.

### 4. Order the machines — composition

Euler must enter safe channel `4` using input `1`. Two conversion machines are available:

- `f(x)=x+1`
- `g(x)=2x`

The player swaps their order and discovers that `g∘f` means the input travels through `f` first and `g` second. The correct route sends `1↦2↦4`; the other order sends `1↦2↦3` and alerts the search lanes.

### 5. Fit return cables — inverses

Three mappings control possible return tunnels. The player chooses the weakest inverse guarantee that fits each mapping:

- An injective but non-surjective map has a left inverse.
- A surjective but non-injective map has a right inverse.
- A bijection has a two-sided inverse.

Mapping diagrams show unreached codomain values and merged inputs directly. The scene distinguishes recovering every original input from reaching every declared target.

### 6. Build the reversible extraction — restriction and synthesis

The final route begins with `q(x)=x²`, which is not reversible on `{-3,-2,-1,0,1,2,3}` because opposite inputs share outputs.

The player must send `2` to `5` through a reversible route. Restricting the domain to `{0,1,2,3}` makes both machine orders invertible: `q` followed by the shift `s(x)=x+1` sends `2↦4↦5` and returns by `5↦4↦2`; `s` followed by `q` sends `2↦3↦9` and returns by `9↦3↦2`. The first composition completes the mission because it reaches the required output, while the second receives mathematically accurate feedback that it is reversible but reaches `9` instead of `5`.

## Interaction and feedback rules

- Every scene exposes the mathematical state before asking for a commit.
- Domain, codomain, and range remain named rather than appearing only in a definition card.
- The graph editor supports pointer dragging and arrow-key movement.
- Incorrect feedback identifies the violated function property or transformation order.
- Solving a scene makes Euler run to the right before the shared cinematic transition begins.
- First-use concept notes define each idea, remain reopenable, and do not interrupt retries.
- Reduced-motion mode preserves the same state changes with shorter traversal.

## Architecture

Chapter 0.2 is separate from Chapter 0.1's puzzle logic and CSS. Its reusable pieces include:

- Function graph
- Mapping diagram
- Function machine and pipeline layouts
- Concept note
- Shared progress and transition controls
- Chapter-specific progress hook and content model

The chapter is directly addressable at `/0.2`. Chapter 0.1 remains addressable at `/0.1`, and earlier `#mission` and `#functions` links remain recognized.
