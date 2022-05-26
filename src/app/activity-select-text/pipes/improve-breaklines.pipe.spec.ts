import { ImproveBreaklinesPipe } from './improve-breaklines.pipe';

describe('ImprovedBreaklinesPipe', () => {
  let pipe: ImproveBreaklinesPipe;
  const TITLE = 'test';
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

  beforeEach(() => {
    pipe = new ImproveBreaklinesPipe();
  });

  // TEST1: pipe should be instantiated with no errors
  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  // TEST2: should return a text with span elements for the selection
  it(`${TITLE} 2 > should add <p> elements and remove <br> or \b elements`, () => {
    const EXPECTED = `<p>És quan dormo que hi veig clar</p><p>Foll d'una dolça metzina,</p><p>Amb perles a cada mà</p><p>Visc al cor d'una petxina,</p><p>Só la font del comellar</p><p>I el jaç de la salvatgina,</p><p>-O la lluna que s'afina</p><p>En morir carena enllà.</p><p>És quan dormo que hi veig clar</p><p>Foll d'una dolça metzina.</p>`;
    const RESULT = pipe.transform(MOCK_TEXT);
    // expect(result).toEqual(expected);
    expect(RESULT).toBe(EXPECTED);
  });
});
