import { FormControl } from '@angular/forms';
import { GameIdValidator } from './game-id.validator';

describe('group-sync > validators > gameId', () => {
  let TITLE = 'test';
  let validator: any;

  beforeEach(() => {
    validator = GameIdValidator();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(validator).toBeTruthy();
  });

  it(`${TITLE} 2 > should return null if the input has a length of 20`, () => {
    const INPUT = '12345678901234567890';
    const EXPECTED = null;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should return a wrong-id error if the string does not have a length of 20`, () => {
    const INPUT = '123456789';
    const EXPECTED = true;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT['wrong-id']).toEqual(EXPECTED);
  });

  it(`${TITLE} 4 > should return a wrong-id error if the string has a whitespace`, () => {
    const INPUT = '123456789 1234567890';
    const EXPECTED = true;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT['wrong-id']).toEqual(EXPECTED);
  });

  it(`${TITLE} 5 > should return a wrong-id error if the string has a dot`, () => {
    const INPUT = '123456789.1234567890';
    const EXPECTED = true;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT['wrong-id']).toEqual(EXPECTED);
  });

  it(`${TITLE} 6 > should return a wrong-id error if the string has a slash`, () => {
    const INPUT = '123456789/1234567890';
    const EXPECTED = true;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT['wrong-id']).toEqual(EXPECTED);
  });

  it(`${TITLE} 7 > should return a wrong-id error if the string has a special character combination`, () => {
    const INPUT = '1234567__.__34567890';
    const EXPECTED = true;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT['wrong-id']).toEqual(EXPECTED);
  });

  it(`${TITLE} 8 > should return null if there is no input`, () => {
    const INPUT = '';
    const EXPECTED = null;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT).toEqual(EXPECTED);
  });
});
