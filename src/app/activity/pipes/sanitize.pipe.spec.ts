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

  // TEST3: pipe should strip a <script> tag
  it(`${TITLE} 3 > should strip a <script> tag`, () => {
    const TEXT = `<script>alert('xss');</script>`;
    const EXPECTED = '';
    const RESULT = pipe.transform(TEXT);
    const STRINGIFIED_RESULT = RESULT.toString()
      .replace('SafeValue must use [property]=binding: ', '')
      .replace('(see https://g.co/ng/security#xss)', '')
      .trim();

    expect(STRINGIFIED_RESULT).toEqual(EXPECTED);
  });

  // TEST4: pipe should strip <script> tags with bad syntax
  it(`${TITLE} 4 > should strip <script> tags with bad syntax`, () => {
    const TESTS = [
      { test: '<script>', result: '' },
      { test: '<script>alert("xss");</script>', result: '' },
      { test: '<script >alert(document.cookie)</script >', result: '' },
      { test: '"><ScRiPt>alert(document.cookie)</ScRiPt>', result: '">' },
      { test: '"%3cscript%3ealert(document.cookie)%3c/script%3e', result: '"' },
      {
        test: '<scr<script>ipt>alert(document.cookie)</script>',
        result: '<scr',
      },
      {
        test: '< sc<scr<script>ipt>riPt >alert(document.cookie)</script>',
        result: '< sc<scr',
      },
      {
        test: 'http://example/?var=<SCRIPT%20a=">"%20SRC="http://attacker/xss.js"></SCRIPT>',
        result: 'http://example/?var=',
      },
      {
        test: 'http://example/page.php?param=<script&param=>[...]</&param=script>',
        result: 'http://example/page.php?param=',
      },
      {
        test: `<script type="text/javascript">var test1 = "</script>";var test2 = '\'</script>';var test1 = "\"</script>";var test1 = "<script>\"";var test2 = '<scr\'ipt>';/* </script> */// </script>/* ' */// var foo=" '</script>`,
        result: `";var test2 = ''';var test1 = """;var test1 = "`,
      },
      {
        test: `<script type="text/javascript">var test1 = "</script>";</script>`,
        result: `";`,
      },
      {
        test: `<script type="text/javascript">var test2 = '\'</script>';</script>`,
        result: `';`,
      },
      {
        test: `<script type="text/javascript">var test3 = "\"</script>";</script>`,
        result: `";`,
      },
      {
        test: `<script type="text/javascript">var test4 = "<script>\"";</script>`,
        result: ``,
      },
      {
        test: `<script type="text/javascript">var test5 = '<scr\'ipt>';</script>`,
        result: ``,
      },
    ];

    for (let test of TESTS) {
      const RESULT = pipe.transform(test.test);
      const STRINGIFIED_RESULT = RESULT.toString()
        .replace('SafeValue must use [property]=binding: ', '')
        .replace('(see https://g.co/ng/security#xss)', '')
        .trim();
      console.log(
        `${test.test} >>> "${STRINGIFIED_RESULT}" =?= "${test.result}" >>> ${
          STRINGIFIED_RESULT === test.result
        }`
      );
      expect(STRINGIFIED_RESULT).toEqual(test.result);
    }
  });
});
