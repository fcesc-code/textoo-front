import { TextSelection } from 'src/app/models/ActivitySelectText.dto';
import { HighlightTextPipe } from './highlight-text.pipe';

describe('HighlightTextPipe', () => {
  let pipe: HighlightTextPipe;
  const TEST = 'test';
  const MOCK_TEXT = `És quan dormo que hi veig clar
Foll d'una dolça metzina,
Amb perles a cada mà
Visc al cor d'una petxina,
Só la font del comellar
I el jaç de la salvatgina,
-O la lluna que s'afina
En morir carena enllà.
És quan dormo que hi veig clar
Foll d'una dolça metzina.`;
  const MOCK_SELECTIONS_MULTIPLE: TextSelection[] = [
    { start: 0, end: 1, selected: 'És' },
    { start: 42, end: 54, selected: 'dolça metzina' },
  ];
  const MOCK_SELECTIONS_SINGLE: TextSelection[] = [
    { start: 42, end: 54, selected: 'dolça metzina' },
  ];

  beforeEach(() => {
    pipe = new HighlightTextPipe();
  });

  // TEST1: pipe should be instantiated with no errors
  it(`${TEST}:1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  // TEST2: should return a text with span elements for the selection
  it(`${TEST}:2 > should add <span> tags for a single selection`, () => {
    const expected = `És quan dormo que hi veig clar
Foll d'una <span class="bg-yellow-300">dolça metzina</span>,
Amb perles a cada mà
Visc al cor d'una petxina,
Só la font del comellar
I el jaç de la salvatgina,
-O la lluna que s'afina
En morir carena enllà.
És quan dormo que hi veig clar
Foll d'una dolça metzina.`;
    const result = pipe.transform(MOCK_TEXT, MOCK_SELECTIONS_SINGLE);
    expect(result).toEqual(expected);
  });

  // TEST3: should return a text with span elements for all selections
  it(`${TEST}:3 > should add <span> tags for each selection`, () => {
    const expected = `<span class="bg-yellow-300">És</span> quan dormo que hi veig clar
Foll d'una <span class="bg-yellow-300">dolça metzina</span>,
Amb perles a cada mà
Visc al cor d'una petxina,
Só la font del comellar
I el jaç de la salvatgina,
-O la lluna que s'afina
En morir carena enllà.
És quan dormo que hi veig clar
Foll d'una dolça metzina.`;
    const result = pipe.transform(MOCK_TEXT, MOCK_SELECTIONS_MULTIPLE);
    expect(result).toEqual(expected);
  });
});
