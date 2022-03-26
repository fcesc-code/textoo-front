import { AddOptionPipe } from './add-option.pipe';
import { Question_ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { SELECT, OPTION } from './add-option.marks';

describe('AddOptionPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: AddOptionPipe;
  const TITLE = 'AddOption pipe test';
  const MOCK_TEXT = `1. Duia pantalons curts, és a dir, que no encara els dotze anys.
2. S'han suspès tots els vols la boira.
3. Proposem un enfocament les polítiques de mercat.
4. A la nit podríem fer peix de carn.
5. plovia, vam jugar el partit.
6. estaliat, ara no té més diners que el sou.`;
  const MOCK_QUESTIONS: Question_ActivityBestOption[] = [
    {
      position: 41,
      options: [
        { text: 'hauria fet', correct: false, index: 1 },
        { text: 'devia haver fet', correct: true, index: 2 },
      ],
    },
    {
      position: 94,
      options: [
        { text: 'degut a', correct: false, index: 1 },
        { text: 'a causa de', correct: true, index: 2 },
      ],
    },
    {
      position: 130,
      options: [
        { text: 'en base a', correct: false, index: 1 },
        { text: 'a partir de', correct: true, index: 2 },
      ],
    },
    {
      position: 185,
      options: [
        { text: 'enlloc', correct: false, index: 1 },
        { text: 'en lloc de', correct: true, index: 2 },
      ],
    },
    {
      position: 197,
      options: [
        { text: 'Malgrat', correct: false, index: 1 },
        { text: 'Malgrat que', correct: true, index: 2 },
      ],
    },
    {
      position: 229,
      options: [
        { text: 'Al no haver', correct: false, index: 1 },
        { text: 'Com que no ha', correct: true, index: 2 },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddOptionPipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new AddOptionPipe(sanitizer);
  });

  // TEST1: pipe should be instantiated with no errors
  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  // TEST2: pipe should return a parsed text
  it(`${TITLE} 2 > should return a parsed text`, () => {
    const TEXT = `1. Duia pantalons curts, és a dir, que no <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-0"><option value="" disabled selected hidden>...</option><option class="" value="hauria fet">hauria fet</option><option class="" value="devia haver fet">devia haver fet</option></select> encara els dotze anys.
2. S'han suspès tots els vols <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-1"><option value="" disabled selected hidden>...</option><option class="" value="degut a">degut a</option><option class="" value="a causa de">a causa de</option></select> la boira.
3. Proposem un enfocament <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-2"><option value="" disabled selected hidden>...</option><option class="" value="en base a">en base a</option><option class="" value="a partir de">a partir de</option></select> les polítiques de mercat.
4. A la nit podríem fer peix <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-3"><option value="" disabled selected hidden>...</option><option class="" value="enlloc">enlloc</option><option class="" value="en lloc de">en lloc de</option></select> de carn.
5. <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-4"><option value="" disabled selected hidden>...</option><option class="" value="Malgrat">Malgrat</option><option class="" value="Malgrat que">Malgrat que</option></select> plovia, vam jugar el partit.
6. <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-5"><option value="" disabled selected hidden>...</option><option class="" value="Al no haver">Al no haver</option><option class="" value="Com que no ha">Com que no ha</option></select> estaliat, ara no té més diners que el sou.`;

    const EXPECTED = TEXT.trim();
    const RESULT = pipe.transform(MOCK_TEXT, MOCK_QUESTIONS);
    const STRINGIFIED_RESULT = RESULT.toString()
      .replace('SafeValue must use [property]=binding: ', '')
      .replace('(see https://g.co/ng/security#xss)', '')
      .trim();
    expect(STRINGIFIED_RESULT).toEqual(EXPECTED);
  });
});
