export type ConceptKey = 'equality' | 'union' | 'intersection' | 'difference' | 'cartesian';

export type ObjectKind = 'key' | 'photo' | 'map' | 'seal' | 'ticket' | 'tracker';

export type WorldObject = {
  id: string;
  kind: ObjectKind;
  label: string;
};

export type ConceptNote = {
  symbol: string;
  line: string;
  example: string;
};

export type DoorScene = {
  concept: Exclude<ConceptKey, 'equality'>;
  symbol: string;
  prompt: string;
  left: WorldObject[];
  right: WorldObject[];
  expected: ObjectKind[];
  success: string;
  hint: string;
  caughtHint?: string;
  missingHint?: string;
};

export type CipherStep = {
  concept: ConceptKey;
  instruction: string;
  left: string;
  right: string;
  result: string;
};

export const conceptNotes: Record<ConceptKey, ConceptNote> = {
  equality: {
    symbol: '=',
    line: 'Two sets match when the same kinds of things are inside. Order and repeats do not matter.',
    example: '{ key, ID card } = { ID card, key, key }',
  },
  union: {
    symbol: '∪',
    line: 'Union packs everything found in A or B, keeping one of each kind.',
    example: '{ key, ID card } ∪ { ID card, map } = { key, ID card, map }',
  },
  intersection: {
    symbol: '∩',
    line: 'Intersection keeps only the things found in both A and B.',
    example: '{ key, ID card } ∩ { ID card, ticket } = { ID card }',
  },
  difference: {
    symbol: '∖',
    line: 'Difference starts with A and leaves behind anything marked in B.',
    example: '{ key, ID card, tracker } ∖ { tracker } = { key, ID card }',
  },
  cartesian: {
    symbol: '×',
    line: 'A Cartesian product pairs every member of the first set with every member of the second. Pair order matters.',
    example: '{ ID, map } × { α, β } = { (ID, α), (ID, β), (map, α), (map, β) }',
  },
};

export const archiveObjects: WorldObject[] = [
  { id: 'key-a', kind: 'key', label: 'brass key' },
  { id: 'photo', kind: 'photo', label: 'ID card' },
  { id: 'map', kind: 'map', label: 'route map' },
  { id: 'key-b', kind: 'key', label: 'spare key' },
];

export const doorNeed: ObjectKind[] = ['key', 'photo'];

const object = (id: string, kind: ObjectKind, label: string): WorldObject => ({ id, kind, label });

export const doorScenes: DoorScene[] = [
  {
    concept: 'union',
    symbol: '∪',
    prompt: 'In the document room, take everything named in document A or document B.',
    left: [object('a-key', 'key', 'key'), object('a-photo', 'photo', 'ID card')],
    right: [object('b-photo', 'photo', 'ID card'), object('b-map', 'map', 'map')],
    expected: ['key', 'photo', 'map'],
    success: 'The case contains everything the message requires.',
    hint: 'Take every kind named by at least one document.',
  },
  {
    concept: 'intersection',
    symbol: '∩',
    prompt: 'Take only what appears on both exchange lists and bring it to the spy.',
    left: [object('a-photo', 'photo', 'ID card'), object('a-key', 'key', 'key'), object('a-seal', 'seal', 'seal')],
    right: [object('b-photo', 'photo', 'ID card'), object('b-ticket', 'ticket', 'ticket')],
    expected: ['photo'],
    success: 'The spy accepts the shared item and passes back the route.',
    hint: 'The spy wants only what both exchange lists share.',
  },
  {
    concept: 'difference',
    symbol: '∖',
    prompt: 'Leave the tracker behind: take carry set A without anything flagged in B.',
    left: [object('a-key', 'key', 'key'), object('a-photo', 'photo', 'ID card'), object('a-tracker', 'tracker', 'tracker')],
    right: [object('b-tracker', 'tracker', 'tracker')],
    expected: ['key', 'photo'],
    success: 'The camera turns toward the abandoned tracker. e slips through its blind side into the relay room.',
    hint: 'Start with the carry set and leave every flagged tracker behind.',
    caughtHint: 'the tracker is still in the carry set.',
    missingHint: 'e still needs both the key and ID card.',
  },
];

export const copyFiles = [
  { id: 'id', label: 'ID' },
  { id: 'map', label: 'map' },
] as const;

export const copyChannels = [
  { id: 'alpha', label: 'α' },
  { id: 'beta', label: 'β' },
] as const;

export const requiredCopies = copyFiles.flatMap((file) =>
  copyChannels.map((channel) => `${file.id}:${channel.id}`),
);

export const cipherSteps: CipherStep[] = [
  {
    concept: 'union',
    instruction: 'recover every digit found on either torn strip',
    left: '{ 2, 7 }',
    right: '{ 7, 9 }',
    result: '{ 2, 7, 9 }',
  },
  {
    concept: 'intersection',
    instruction: 'keep only digits confirmed by the verifier',
    left: '{ 2, 7, 9 }',
    right: '{ 2, 7, 4 }',
    result: '{ 2, 7 }',
  },
  {
    concept: 'difference',
    instruction: 'remove the compromised digit',
    left: '{ 2, 7 }',
    right: '{ 7 }',
    result: '{ 2 }',
  },
  {
    concept: 'cartesian',
    instruction: 'pair the clean digit with both code positions',
    left: '{ 2 }',
    right: '{ 1, 2 }',
    result: '{ (2,1), (2,2) }',
  },
  {
    concept: 'equality',
    instruction: 'confirm the assembled pairs match the lock signature',
    left: '{ (2,1), (2,2) }',
    right: '{ (2,2), (2,1) }',
    result: 'code 22',
  },
];

export function unique<T>(values: T[]) {
  return [...new Set(values)];
}

export function equalSets<T>(left: T[], right: T[]) {
  const a = unique(left);
  const b = unique(right);
  return a.length === b.length && a.every((item) => b.includes(item));
}

export function formatSet(values: string[]) {
  const members = unique(values);
  return members.length ? `{ ${members.join(', ')} }` : '{ }';
}
