export type FunctionConceptKey =
  'function' | 'representations' | 'relation' | 'composition' | 'inverse' | 'restriction';

export type FunctionConceptNote = {
  symbol: string;
  texSymbol: string;
  line: string;
  example: string;
  texExample: string;
};

export type GraphPoint = {
  id: string;
  x: number;
  y: number;
};

export type InverseKind = 'left' | 'right' | 'total';

export type InverseCase = {
  id: string;
  domain: string[];
  codomain: string[];
  arrows: Array<[string, string]>;
  answer: InverseKind;
  prompt: string;
  success: string;
};

export const functionConcepts: Record<FunctionConceptKey, FunctionConceptNote> = {
  function: {
    symbol: 'f',
    texSymbol: String.raw`f\colon A\to B`,
    line: 'A function is a machine that gives exactly one output for every input in its domain.',
    example: 'f: {0,1,2} → {1,2,3,4},  f(x)=x+1',
    texExample: String.raw`f\colon\{0,1,2\}\to\{1,2,3,4\},\qquad f(x)=x+1`,
  },
  representations: {
    symbol: 'x↦x²',
    texSymbol: String.raw`x\mapsto x^2`,
    line: 'A formula, table, mapping, and graph can describe the same function. They must agree input by input.',
    example: '−2 ↦ 4, −1 ↦ 1, 0 ↦ 0, 1 ↦ 1, 2 ↦ 4',
    texExample: String.raw`-2\mapsto4,\;-1\mapsto1,\;0\mapsto0,\;1\mapsto1,\;2\mapsto4`,
  },
  relation: {
    symbol: 'R',
    texSymbol: String.raw`R`,
    line: 'A relation is a collection of possible routes between inputs and outputs. It is a function only when every domain input has exactly one active output route.',
    example: '−1 ↦ 1 and −1 ↦ 3: not a function',
    texExample: String.raw`-1\mapsto1,\;-1\mapsto3\quad\Longrightarrow\quad\text{not a function}`,
  },
  composition: {
    symbol: 'g∘f',
    texSymbol: String.raw`g\circ f`,
    line: 'Composition connects machines. In g∘f, the input passes through f first and then through g.',
    example: 'f(x)=x+1, g(x)=2x:  (g∘f)(1)=4',
    texExample: String.raw`f(x)=x+1,\;g(x)=2x\quad\Longrightarrow\quad(g\circ f)(1)=4`,
  },
  inverse: {
    symbol: 'f⁻¹',
    texSymbol: String.raw`f^{-1}`,
    line: 'A left inverse recovers every input, a right inverse reaches every codomain value, and a two-sided inverse does both.',
    example: 'ℓ∘f=id_domain,  f∘r=id_codomain',
    texExample: String.raw`\ell\circ f=\operatorname{id}_{A},\qquad f\circ r=\operatorname{id}_{B}`,
  },
  restriction: {
    symbol: 'f|D',
    texSymbol: String.raw`f\vert_D`,
    line: 'Changing the domain can change whether a function is invertible. Restricting x² to nonnegative inputs removes its duplicate outputs.',
    example: 'x↦x² on {0,1,2,3} is a bijection onto {0,1,4,9}',
    texExample: String.raw`x\mapsto x^2\colon\{0,1,2,3\}\xrightarrow{\sim}\{0,1,4,9\}`,
  },
};

export const functionChapterProgress = [0, 1, 2, 3, 4, 5];
export const functionConceptOrder: FunctionConceptKey[] = [
  'function',
  'representations',
  'relation',
  'composition',
  'inverse',
  'restriction',
];

export const machineInputs = [0, 1, 2];
export const machineCodomain = [1, 2, 3, 4];
export const squareDomain = [-2, -1, 0, 1, 2];
export const squareCodomain = [0, 1, 2, 3, 4];
export const squareRange = [0, 1, 4];

export const initialSquareValues: Record<number, number> = {
  [-2]: 3,
  [-1]: 2,
  0: 0,
  1: 2,
  2: 3,
};

export const relationPoints: GraphPoint[] = [
  { id: 'p-a', x: -2, y: 1 },
  { id: 'p-b', x: -1, y: 1 },
  { id: 'p-c', x: -1, y: 3 },
  { id: 'p-d', x: 0, y: 2 },
  { id: 'p-e', x: 1, y: 3 },
  { id: 'p-f', x: 2, y: 1 },
];

export const inverseCases: InverseCase[] = [
  {
    id: 'injective',
    domain: ['a', 'b'],
    codomain: ['1', '2', '3'],
    arrows: [
      ['a', '1'],
      ['b', '2'],
    ],
    answer: 'left',
    prompt: 'Every input can be recovered, but one codomain port is never reached.',
    success: 'Left return cable locked: the original input can always be recovered.',
  },
  {
    id: 'surjective',
    domain: ['a', 'b', 'c'],
    codomain: ['1', '2'],
    arrows: [
      ['a', '1'],
      ['b', '1'],
      ['c', '2'],
    ],
    answer: 'right',
    prompt: 'Every codomain port is reached, but two inputs merge.',
    success: 'Right return cable locked: every target has a chosen route back.',
  },
  {
    id: 'bijective',
    domain: ['a', 'b'],
    codomain: ['1', '2'],
    arrows: [
      ['a', '2'],
      ['b', '1'],
    ],
    answer: 'total',
    prompt: 'Every target is reached exactly once.',
    success: 'Two-sided inverse locked: the passage is perfectly reversible.',
  },
];

export function rangeOf(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}

export function formatNumberSet(values: number[]) {
  return `{ ${values.join(', ')} }`;
}
