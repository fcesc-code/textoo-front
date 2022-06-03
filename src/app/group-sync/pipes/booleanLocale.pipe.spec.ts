import { BooleanLocalePipe } from './booleanLocale.pipe';

describe('group-sync > pipes > booleanLocale', () => {
  let TITLE = 'test';
  let pipe: any;

  beforeEach(() => {
    pipe = new BooleanLocalePipe();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TITLE} 2 > should return 'si' if it is true`, () => {
    const INPUT = true;
    const EXPECTED = 'si';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should return 'no' if it is false`, () => {
    const INPUT = false;
    const EXPECTED = 'no';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });
});
