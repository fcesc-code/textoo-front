import { FormControl } from '@angular/forms';
import { DatePickValidator } from './greater-than-today.validator';

describe('group-sync > validators > datePick', () => {
  let TITLE = 'test';
  let validator: any;

  beforeEach(() => {
    validator = DatePickValidator();
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(validator).toBeTruthy();
  });

  it(`${TITLE} 2 > should return null if the date is greater than 30 days from now`, () => {
    const NOW = new Date();
    const VALID_TIME = NOW.getTime() + 1 * 60 * 60 * 1000;
    const EXPECTED = null;
    const RESULT = validator(new FormControl(new Date(VALID_TIME)));
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should return an early-date error if the date is earlier than now + 2 minutes`, () => {
    const NOW = new Date();
    const INVALID_TIME = NOW.getTime() - 8 * 60 * 60 * 1000;
    const EXPECTED = true;
    const RESULT = validator(new FormControl(new Date(INVALID_TIME)));
    expect(RESULT['early-date']).toEqual(EXPECTED);
  });

  it(`${TITLE} 4 > should return a late-date error if the date is greater than 30 days from now`, () => {
    const NOW = new Date();
    const INVALID_TIME = NOW.getTime() + 45 * 24 * 60 * 60 * 1000;
    const EXPECTED = true;
    const RESULT = validator(new FormControl(new Date(INVALID_TIME)));
    expect(RESULT['late-date']).toEqual(EXPECTED);
  });

  it(`${TITLE} 5 > should return null if there is no input`, () => {
    const INPUT = '';
    const EXPECTED = null;
    const RESULT = validator(new FormControl(INPUT));
    expect(RESULT).toEqual(EXPECTED);
  });
});
