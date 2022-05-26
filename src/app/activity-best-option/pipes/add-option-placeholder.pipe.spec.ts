import { AddPlaceholderPipe } from './add-option-placeholder.pipe';
import { Question_ActivityBestOption } from '../models/ActivityBestOption.dto';

describe('Activities > Pipes > AddPlaceholder', () => {
  let pipe: AddPlaceholderPipe;
  const TEST = 'test';
  const MOCK_TEXT = `<p>Duia pantalons curts, és a dir, que no encara els dotze anys.</p><p>S'han suspès tots els vols la boira.</p><p>Proposem un enfocament les polítiques de mercat.</p><p>A la nit podríem fer peix de carn.</p><p> plovia, vam jugar el partit.</p><p> estalviat, ara no té més diners que el sou.</p>`;
  const MOCK_QUESTIONS: Question_ActivityBestOption[] = [
    {
      id: '1',
      position: 41,
      options: [
        { text: 'hauria fet', correct: false, index: 1 },
        { text: 'devia haver fet', correct: true, index: 2 },
      ],
    },
    {
      id: '2',
      position: 97,
      options: [
        { text: 'degut a', correct: false, index: 1 },
        { text: 'a causa de', correct: true, index: 2 },
      ],
    },
    {
      id: '3',
      position: 136,
      options: [
        { text: 'en base a', correct: false, index: 1 },
        { text: 'a partir de', correct: true, index: 2 },
      ],
    },
    {
      id: '4',
      position: 194,
      options: [
        { text: 'enlloc', correct: false, index: 1 },
        { text: 'en lloc de', correct: true, index: 2 },
      ],
    },
    {
      id: '5',
      position: 210,
      options: [
        { text: 'Malgrat', correct: false, index: 1 },
        { text: 'Malgrat que', correct: true, index: 2 },
      ],
    },
    {
      id: '6',
      position: 246,
      options: [
        { text: 'Al no haver', correct: false, index: 1 },
        { text: 'Com que no ha', correct: true, index: 2 },
      ],
    },
  ];

  beforeEach(() => {
    pipe = new AddPlaceholderPipe();
  });

  // TEST1: pipe should be instantiated with no errors
  it(`${TEST} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  // TEST2: pipe should return a parsed text
  it(`${TEST} 2 > should return a parsed text`, () => {
    const TEXT = `<p>Duia pantalons curts, és a dir, que no <strong style="background-color: yellow;">PREGUNTA N. 1</strong> encara els dotze anys.</p><p>S'han suspès tots els vols <strong style="background-color: yellow;">PREGUNTA N. 2</strong> la boira.</p><p>Proposem un enfocament <strong style="background-color: yellow;">PREGUNTA N. 3</strong> les polítiques de mercat.</p><p>A la nit podríem fer peix <strong style="background-color: yellow;">PREGUNTA N. 4</strong> de carn.</p><p><strong style="background-color: yellow;">PREGUNTA N. 5</strong> plovia, vam jugar el partit.</p><p><strong style="background-color: yellow;">PREGUNTA N. 6</strong> estalviat, ara no té més diners que el sou.</p>`;

    const EXPECTED = TEXT.trim();
    const RESULT = pipe.transform(MOCK_TEXT, MOCK_QUESTIONS);
    expect(RESULT).toEqual(EXPECTED);
  });
});
