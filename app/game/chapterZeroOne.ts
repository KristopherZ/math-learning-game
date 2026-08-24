export type ConceptKey = 'equality' | 'union' | 'intersection' | 'difference';

export type ConceptBriefing = {
  key: ConceptKey;
  eyebrow: string;
  title: string;
  symbol: string;
  explanation: string;
  rule: string;
  example: string;
  insight: string;
};

export type SetObstacle = {
  concept: Exclude<ConceptKey, 'equality'>;
  codename: string;
  title: string;
  instruction: string;
  leftLabel: string;
  rightLabel: string;
  left: string[];
  right: string[];
  expression: string;
  options: string[][];
  correct: number;
  success: string;
  retry: string;
};

export const targetManifest = ['Cipher key', 'Red dossier'];

export const archiveItems = [
  { id: 'cipher-a', label: 'Cipher key', symbol: '◇', tone: 'teal' },
  { id: 'route', label: 'Route map', symbol: '⌁', tone: 'violet' },
  { id: 'dossier', label: 'Red dossier', symbol: '▰', tone: 'coral' },
  { id: 'cipher-b', label: 'Cipher key', symbol: '◇', tone: 'teal' },
] as const;

export const conceptBriefings: Record<ConceptKey, ConceptBriefing> = {
  equality: {
    key: 'equality',
    eyebrow: 'FIELD NOTE 00',
    title: 'A set records what belongs.',
    symbol: 'A = B',
    explanation:
      'A set is a collection of distinct objects. We write its elements between braces, such as {key, dossier}.',
    rule:
      'Two sets are equal when they contain exactly the same elements. Order does not matter, and repeating an element does not change the set.',
    example: '{key, dossier} = {dossier, key, key}',
    insight: 'Same members → same set.',
  },
  union: {
    key: 'union',
    eyebrow: 'FIELD NOTE 01',
    title: 'Union gathers everything.',
    symbol: 'A ∪ B',
    explanation:
      'The union of A and B contains every element that appears in A, in B, or in both.',
    rule: 'Combine the sets, then remove repeated elements.',
    example: '{key, mask} ∪ {mask, map} = {key, mask, map}',
    insight: 'Union means OR.',
  },
  intersection: {
    key: 'intersection',
    eyebrow: 'FIELD NOTE 02',
    title: 'Intersection keeps what overlaps.',
    symbol: 'A ∩ B',
    explanation:
      'The intersection of A and B contains only the elements that belong to both sets.',
    rule: 'Keep an element only when you can find it on both sides.',
    example: '{red, blue, green} ∩ {blue, gold} = {blue}',
    insight: 'Intersection means AND.',
  },
  difference: {
    key: 'difference',
    eyebrow: 'FIELD NOTE 03',
    title: 'Difference removes a set.',
    symbol: 'A ∖ B',
    explanation:
      'The difference A minus B contains the elements that belong to A but do not belong to B.',
    rule: 'Begin with A. Cross out anything also found in B.',
    example: '{key, dossier, map} ∖ {map} = {key, dossier}',
    insight: 'Difference means IN A, NOT IN B.',
  },
};

export const obstacles: SetObstacle[] = [
  {
    concept: 'union',
    codename: 'LASER GRID',
    title: 'Combine both access lists.',
    instruction: 'The grid accepts anyone cleared by team A or team B.',
    leftLabel: 'A',
    rightLabel: 'B',
    left: ['key', 'mask'],
    right: ['mask', 'map'],
    expression: 'A ∪ B',
    options: [
      ['key', 'mask', 'map'],
      ['mask'],
      ['key', 'map'],
    ],
    correct: 0,
    success: 'Union verified. The entire clearance list is accepted.',
    retry: 'The union must include every distinct item from either set.',
  },
  {
    concept: 'intersection',
    codename: 'IDENTITY SCAN',
    title: 'Find the shared signal.',
    instruction: 'Only a signal present in both channels will disable the scanner.',
    leftLabel: 'A',
    rightLabel: 'B',
    left: ['red', 'blue', 'green'],
    right: ['blue', 'gold'],
    expression: 'A ∩ B',
    options: [
      ['red', 'blue', 'green', 'gold'],
      ['blue'],
      ['red', 'green', 'gold'],
    ],
    correct: 1,
    success: 'Intersection isolated. The blue signal exists in both channels.',
    retry: 'Intersection keeps only elements that appear in both sets.',
  },
  {
    concept: 'difference',
    codename: 'FINAL CHECKPOINT',
    title: 'Remove the compromised file.',
    instruction: 'Start with the extraction set, then remove everything flagged by B.',
    leftLabel: 'A',
    rightLabel: 'B',
    left: ['cipher', 'dossier', 'map'],
    right: ['map'],
    expression: 'A ∖ B',
    options: [
      ['map'],
      ['cipher', 'dossier'],
      ['cipher', 'dossier', 'map'],
    ],
    correct: 1,
    success: 'Difference verified. The compromised map has been removed.',
    retry: 'A ∖ B begins with A, then removes anything also in B.',
  },
];

export function unique(values: string[]) {
  return [...new Set(values)];
}

export function equalSets(left: string[], right: string[]) {
  const a = unique(left);
  const b = unique(right);
  return a.length === b.length && a.every((item) => b.includes(item));
}

export function formatSet(values: string[]) {
  const members = unique(values);
  return members.length ? `{ ${members.join(', ')} }` : '{ }';
}
