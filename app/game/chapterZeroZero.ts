export type LogicConceptKey = 'and' | 'or' | 'not' | 'implies' | 'forall' | 'exists';

export type LogicScene = {
  concept: LogicConceptKey;
  prompt: string;
  archiveLine: string;
  eLine: string;
  mode: 'between' | 'before' | 'quantifier';
  leftClaim?: string;
  rightClaim: string;
  answer: LogicConceptKey;
  available: LogicConceptKey[];
  previewCorrect: string;
  previewWrong: string;
  success: string;
  hint: string;
};

export type LogicConceptNote = {
  symbol: string;
  line: string;
  example: string;
  texExample: string;
};

export const logicOperatorTex: Record<LogicConceptKey, string> = {
  and: '\\land',
  or: '\\lor',
  not: '\\neg',
  implies: '\\Rightarrow',
  forall: '\\forall',
  exists: '\\exists',
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
    example: '¬(door is locked)',
    texExample: '\\neg(\\text{door is locked})',
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
    example: '∀ door d ∈ D, ¬L(d)',
    texExample: '\\forall d\\in D,\\;\\neg L(d)',
  },
  exists: {
    symbol: '∃',
    line: 'THERE EXISTS asks for at least one witness in a stated collection.',
    example: '∃ door d ∈ D, ¬L(d)',
    texExample: '\\exists d\\in D,\\;\\neg L(d)',
  },
};

export const logicScenes: LogicScene[] = [
  {
    concept: 'and',
    prompt:
      'The first dialog lock needs both checks before it will reveal a way out. Insert the joining symbol.',
    archiveLine: 'Badge valid. Code remembered. Both checks must agree.',
    eLine: 'Join the two claims without making either one disappear.',
    mode: 'between',
    leftClaim: 'badge valid',
    rightClaim: 'code remembered',
    answer: 'and',
    available: ['or', 'and', 'implies'],
    previewCorrect: 'Both locks hold the line. The latch is listening.',
    previewWrong: 'The dialog misreads the lock: one requirement is missing or reversed.',
    success: 'Both locks click together. The first dialog opens.',
    hint: 'AND joins requirements: one missing witness makes the whole condition false.',
  },
  {
    concept: 'or',
    prompt: 'Only one route is available. Insert a symbol that keeps a single live route open.',
    archiveLine: 'Only the service route is available.',
    eLine: 'One live route is enough; do not make the two corridors depend on each other.',
    mode: 'between',
    leftClaim: 'north route clear',
    rightClaim: 'service route clear',
    answer: 'or',
    available: ['and', 'implies', 'or'],
    previewCorrect: 'The service route stays lit. One available route is enough.',
    previewWrong: 'The corridors still demand the wrong kind of agreement.',
    success: 'A single green signal is enough. The corridor lights up.',
    hint: 'OR needs at least one true statement; it does not require both.',
  },
  {
    concept: 'not',
    prompt: 'The archive door is locked. Add NOT to reverse the status and release Euler.',
    archiveLine: 'The door is locked.',
    eLine: 'Add NOT to reverse the lock, then send the changed sentence.',
    mode: 'before',
    rightClaim: 'door is locked',
    answer: 'not',
    available: ['and', 'forall', 'not'],
    previewCorrect: 'The sentence now reads “door is not locked.” The exit opens.',
    previewWrong: 'The lock remains unchanged. The exit stays sealed.',
    success:
      'The sentence now reads “door is not locked.” The lock releases; Euler reaches the door.',
    hint: 'NOT flips the truth of the entire claim: locked becomes not locked.',
  },
  {
    concept: 'implies',
    prompt:
      'The exit accepts a conditional instruction. Place the arrow between cause and consequence.',
    archiveLine: 'If e has no key, the silent door is the route.',
    eLine: 'Keep the condition on the left and the consequence on the right.',
    mode: 'between',
    leftClaim: 'no key',
    rightClaim: 'use silent door',
    answer: 'implies',
    available: ['and', 'or', 'implies'],
    previewCorrect: 'The silent door accepts a conditional instruction.',
    previewWrong: 'The exit cannot tell what causes the instruction and what follows it.',
    success: 'The conditional gate accepts the route without claiming its converse.',
    hint: 'IMPLIES points from a condition to a consequence. Do not reverse the arrow.',
  },
  {
    concept: 'forall',
    prompt:
      'The archive addresses every door. Prefix the claim so every lock in the set is released.',
    archiveLine: 'Every door in D is not locked.',
    eLine: 'Make the sentence hold for every d in D, not only a convenient door.',
    mode: 'quantifier',
    rightClaim: 'd ∈ D: d is not locked',
    answer: 'forall',
    available: ['exists', 'not', 'forall'],
    previewCorrect: 'Every lock shows green. The master latch wakes.',
    previewWrong: 'The promise is too narrow: some doors remain locked outside the sentence.',
    success: 'Every door is not locked. The archive releases the master latch.',
    hint: 'FOR ALL quantifies the complete collection: check every member, not a single witness.',
  },
  {
    concept: 'exists',
    prompt: 'One opening is enough. Prefix the claim with a witness-seeking symbol.',
    archiveLine: 'There is a door that is not locked. Name the witness.',
    eLine: 'One witness is enough; do not claim every door behaves the same.',
    mode: 'quantifier',
    rightClaim: 'd ∈ D: d is not locked',
    answer: 'exists',
    available: ['forall', 'not', 'exists'],
    previewCorrect: 'A single unlocked door appears on the map. Euler has an exit.',
    previewWrong: 'The sentence asks for too much—or searches for the wrong kind of witness.',
    success: 'A single witness is enough. Euler slips through the unlocked door.',
    hint: 'THERE EXISTS needs at least one witness; it makes no claim about every other door.',
  },
];
