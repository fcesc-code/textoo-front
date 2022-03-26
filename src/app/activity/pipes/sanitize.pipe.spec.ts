import { SanitizePipe } from './sanitize.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;
  let sanitizer: DomSanitizer;
  let TITLE = 'sanitize pipe';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanitizePipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SanitizePipe(sanitizer);
  });

  // TEST1: pipe should be instantiated with no errors
  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  // TEST2: pipe should return a sanitized text
  it(`${TITLE} 2 > should return a sanitized text`, () => {
    const TEXT = `1. Duia pantalons curts, és a dir, que no <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-0"><option value="" disabled selected hidden>...</option><option class="" value="hauria fet">hauria fet</option><option class="" value="devia haver fet">devia haver fet</option></select> encara els dotze anys.
  2. S'han suspès tots els vols <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-1"><option value="" disabled selected hidden>...</option><option class="" value="degut a">degut a</option><option class="" value="a causa de">a causa de</option></select> la boira.
  3. Proposem un enfocament <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-2"><option value="" disabled selected hidden>...</option><option class="" value="en base a">en base a</option><option class="" value="a partir de">a partir de</option></select> les polítiques de mercat.
  4. A la nit podríem fer peix <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-3"><option value="" disabled selected hidden>...</option><option class="" value="enlloc">enlloc</option><option class="" value="en lloc de">en lloc de</option></select> de carn.
  5. <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-4"><option value="" disabled selected hidden>...</option><option class="" value="Malgrat">Malgrat</option><option class="" value="Malgrat que">Malgrat que</option></select> plovia, vam jugar el partit.
  6. <select class="border-b-2 border-solid border-teal-700 hover:bg-yellow-100" id="SEL-5"><option value="" disabled selected hidden>...</option><option class="" value="Al no haver">Al no haver</option><option class="" value="Com que no ha">Com que no ha</option></select> estaliat, ara no té més diners que el sou.`;

    const EXPECTED = TEXT.trim();
    const RESULT = pipe.transform(TEXT);
    const STRINGIFIED_RESULT = RESULT.toString()
      .replace('SafeValue must use [property]=binding: ', '')
      .replace('(see https://g.co/ng/security#xss)', '')
      .trim();

    expect(STRINGIFIED_RESULT).toEqual(EXPECTED);
  });
});
