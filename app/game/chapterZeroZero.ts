export type LogicConceptKey = 'and' | 'or' | 'not' | 'implies' | 'forall' | 'exists';

export type LogicOption = {
  id: string;
  tex: string;
  fallback: string;
  label: string;
};

export type LogicScene = {
  concept: LogicConceptKey;
  prompt: string;
  archiveLine: string;
  eLine: string;
  expression: string;
  expressionFallback: string;
  options: LogicOption[];
  answer: string;
  success: string;
  hint: string;
};

export type LogicConceptNote = {
  symbol: string;
  line: string;
  example: string;
  texExample: string;
};

export const logicProgress = [0, 1, 2, 3, 4, 5];

export const logicConceptOrder: LogicConceptKey[] = [
  'and',
  'or',
  'not',
  'implies',
  'forall',
  'exists',
];

export const logicConceptNotes: Record<LogicConceptKey, LogicConceptNote> = {
  and: {
    symbol: '∧',
    line: 'AND is true only when both statements are true. It joins requirements.',
    example: 'badge valid ∧ code remembered',
    texExample: '\\text{badge valid}\\land\\text{code remembered}',
  },
  or: {
    symbol: '∨',
    line: 'OR is true when at least one statement is true. Both may be true too.',
    example: 'route A ∨ route B',
    texExample: '\\text{route A}\\lor\\text{route B}',
  },
  not: {
    symbol: '¬',
    line: 'NOT flips a statement: it is true exactly when the original statement is false.',
    example: '¬(guard is watching)',
    texExample: '\\neg(\\text{guard is watching})',
  },
  implies: {
    symbol: '⇒',
    line: 'IMPLIES gives a condition and its consequence. It does not say the reverse.',
    example: 'no key ⇒ use the silent door',
    texExample: '\\text{no key}\\Rightarrow\\text{use silent door}',
  },
  forall: {
    symbol: '∀',
    line: 'FOR ALL makes one claim about every member of a stated collection.',
    example: '∀ door d ∈ D, ¬K(d)',
    texExample: '\\forall d\\in D,\\;\\neg K(d)',
  },
  exists: {
    symbol: '∃',
    line: 'THERE EXISTS asks for at least one witness in a stated collection.',
    example: '∃ door d ∈ D, ¬K(d)',
    texExample: '\\exists d\\in D,\\;\\neg K(d)',
  },
};

const option = (id: string, tex: string, fallback: string, label: string): LogicOption => ({
  id,
  tex,
  fallback,
  label,
});

export const logicScenes: LogicScene[] = [
  {
    concept: 'and',
    prompt: 'The first dialog lock needs both witnesses before it will reveal a way out.',
    archiveLine: 'ARCHIVE: badge valid. code remembered. Both answers must agree.',
    eLine: 'e: state the lock as one sentence.',
    expression: 'p\\land q',
    expressionFallback: 'p ∧ q',
    options: [
      option('either', 'p\\lor q', 'p ∨ q', 'one witness is enough'),
      option('both', 'p\\land q', 'p ∧ q', 'both witnesses are required'),
      option('neither', '\\neg p\\land q', '¬p ∧ q', 'one witness must fail'),
    ],
    answer: 'both',
    success: 'Both locks click together. The first dialog opens.',
    hint: 'AND joins requirements: one missing witness makes the whole condition false.',
  },
  {
    concept: 'or',
    prompt: 'Two corridors carry the same message. One clear route is enough to leave the room.',
    archiveLine:
      'ARCHIVE: north route clear or service route clear. Keep moving if either answers yes.',
    eLine: 'e: choose the statement that allows at least one route.',
    expression: 'r\\lor s',
    expressionFallback: 'r ∨ s',
    options: [
      option('both', 'r\\land s', 'r ∧ s', 'both routes must be clear'),
      option('neither', '\\neg r\\land\\neg s', '¬r ∧ ¬s', 'both routes are blocked'),
      option('either', 'r\\lor s', 'r ∨ s', 'at least one route is clear'),
    ],
    answer: 'either',
    success: 'A single green signal is enough. The corridor lights up.',
    hint: 'OR needs at least one true statement; it does not require both.',
  },
  {
    concept: 'not',
    prompt: 'A guard message is reflected in the dark glass. Turn the claim into its opposite.',
    archiveLine: 'GUARD: I am watching the east stair.',
    eLine: 'e: send the negation, not the original report.',
    expression: '\\neg p',
    expressionFallback: '¬p',
    options: [
      option('plain', 'p', 'p', 'the guard is watching'),
      option('double', '\\neg\\neg p', '¬¬p', 'the guard is watching again'),
      option('negated', '\\neg p', '¬p', 'the guard is not watching'),
    ],
    answer: 'negated',
    success: 'The mirror goes dark. The east stair is temporarily unseen.',
    hint: 'NOT flips the truth of the entire claim: watching becomes not watching.',
  },
  {
    concept: 'implies',
    prompt: 'The exit accepts a conditional instruction. Read the arrow in its given direction.',
    archiveLine: 'ARCHIVE: if e has no key, e uses the silent door.',
    eLine: 'e: keep the condition on the left and its consequence on the right.',
    expression: '\\neg K(e)\\Rightarrow S(e)',
    expressionFallback: '¬K(e) ⇒ S(e)',
    options: [
      option('reverse', 'S(e)\\Rightarrow\\neg K(e)', 'S(e) ⇒ ¬K(e)', 'reverse the arrow'),
      option('and', '\\neg K(e)\\land S(e)', '¬K(e) ∧ S(e)', 'demand both at once'),
      option(
        'condition',
        '\\neg K(e)\\Rightarrow S(e)',
        '¬K(e) ⇒ S(e)',
        'condition leads to consequence',
      ),
    ],
    answer: 'condition',
    success: 'The conditional gate accepts the route without claiming its converse.',
    hint: 'IMPLIES points from a condition to a consequence. Do not reverse the arrow.',
  },
  {
    concept: 'forall',
    prompt: 'The archive addresses every door. No door may demand a key Euler does not carry.',
    archiveLine: 'ARCHIVE: speak about the whole set of doors, not just one doorway.',
    eLine: 'e: make the promise hold for every d in D.',
    expression: '\\forall d\\in D,\\;\\neg K(d)',
    expressionFallback: '∀ d ∈ D, ¬K(d)',
    options: [
      option('exists', '\\exists d\\in D,\\;\\neg K(d)', '∃ d ∈ D, ¬K(d)', 'one door has no key'),
      option('none', '\\forall d\\in D,\\;K(d)', '∀ d ∈ D, K(d)', 'every door has a key'),
      option('forall', '\\forall d\\in D,\\;\\neg K(d)', '∀ d ∈ D, ¬K(d)', 'every door has no key'),
    ],
    answer: 'forall',
    success: 'Every door repeats the same promise. The archive releases the master latch.',
    hint: 'FOR ALL quantifies the complete collection: check every member, not a single witness.',
  },
  {
    concept: 'exists',
    prompt: 'One opening is enough. Find a door for which Euler has no matching key.',
    archiveLine: 'ARCHIVE: there is a door I do not have a key for. Name the witness.',
    eLine: 'e: use the smallest claim that proves one such door exists.',
    expression: '\\exists d\\in D,\\;\\neg K(d)',
    expressionFallback: '∃ d ∈ D, ¬K(d)',
    options: [
      option('one', '\\exists d\\in D,\\;K(d)', '∃ d ∈ D, K(d)', 'one door has a key'),
      option('forall', '\\forall d\\in D,\\;\\neg K(d)', '∀ d ∈ D, ¬K(d)', 'every door has no key'),
      option('exists', '\\exists d\\in D,\\;\\neg K(d)', '∃ d ∈ D, ¬K(d)', 'one door has no key'),
    ],
    answer: 'exists',
    success: 'A single witness is enough. Euler slips through the unkeyed door.',
    hint: 'THERE EXISTS needs at least one witness; it makes no claim about every other door.',
  },
];
