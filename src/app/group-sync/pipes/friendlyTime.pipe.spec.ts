import { FriendlyTimePipe } from './friendlyTime.pipe';

describe('group-sync > pipes > friendlyTime', () => {
  let TITLE = 'test';
  let pipe: any;

  beforeEach(() => {
    pipe = new FriendlyTimePipe();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TITLE} 2 > should add the suffix 'segons' if it is less than 60 seconds`, () => {
    const INPUT = 10;
    const EXPECTED = '10 segons.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should add the suffix 'segon' if it is 1 second`, () => {
    const INPUT = 1;
    const EXPECTED = '1 segon.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 4 > should add the suffix 'minuts' if it is 120 seconds`, () => {
    const INPUT = 120;
    const EXPECTED = '2 minuts.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 5 > should add the suffix 'minut' if it is 60 seconds`, () => {
    const INPUT = 60;
    const EXPECTED = '1 minut.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 6 > should add the suffix 'minuts' and 'segons' if it is 123 seconds`, () => {
    const INPUT = 123;
    const EXPECTED = '2 minuts i 3 segons.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 7 > should add the suffix 'minuts' and 'segon' if it is 61 seconds`, () => {
    const INPUT = 61;
    const EXPECTED = '1 minut i 1 segon.';
    const RESULT = pipe.transform(INPUT);
    expect(RESULT).toEqual(EXPECTED);
  });
});
