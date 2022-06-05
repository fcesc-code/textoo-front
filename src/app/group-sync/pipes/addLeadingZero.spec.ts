import { AddLeadingZeroPipe } from './addLeadingZero';

describe('group-sync > pipes > addLeadingZero', () => {
  let TITLE = 'test';
  let pipe: any;

  beforeEach(() => {
    pipe = new AddLeadingZeroPipe();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${TITLE} 2 > should add a zero if a number is less than 10 and greater or equal than 1`, () => {
    const NUMBER = 9;
    const EXPECTED = '09';
    const RESULT = pipe.transform(NUMBER);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should use 00 whenever number 0 is the input`, () => {
    const NUMBER = 0;
    const EXPECTED = '--';
    const RESULT = pipe.transform(NUMBER);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should do nothing if the number is equal or greater than 10`, () => {
    const NUMBER = 10;
    const EXPECTED = '10';
    const RESULT = pipe.transform(NUMBER);
    expect(RESULT).toEqual(EXPECTED);
  });
});
