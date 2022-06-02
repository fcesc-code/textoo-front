import { FormControl, FormGroup } from '@angular/forms';
import { PasswordConfirmationValidator } from './confirm-password.validator';

describe('group-sync > validators > gameId', () => {
  let TITLE = 'test';
  let validator: any;

  beforeEach(() => {
    validator = PasswordConfirmationValidator('password', 'confirmPassword');
  });

  it(`${TITLE} 1 > should create an instance`, () => {
    expect(validator).toBeTruthy();
  });

  it(`${TITLE} 2 > should return null if both form controls have the same value`, () => {
    const VALID_INPUT = '12345678';
    const password = new FormControl(VALID_INPUT);
    const confirmPassword = new FormControl(VALID_INPUT);
    const FORM = new FormGroup({
      password: password,
      confirmPassword: confirmPassword,
    });
    const EXPECTED = null;
    const RESULT = validator(FORM);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > should return undefined if the target form controls could not be found`, () => {
    const VALID_INPUT = '12345678';
    const wrong_name = new FormControl(VALID_INPUT);
    const another_wrong_name = new FormControl(VALID_INPUT);
    const FORM = new FormGroup({
      wrong_name: wrong_name,
      another_wrong_name: another_wrong_name,
    });
    const EXPECTED = undefined;
    const RESULT = validator(FORM);
    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 4 > should return a passwords-mismatch error if the form controls have a different value`, () => {
    const VALID_INPUT = '12345678';
    const ANOTHER_VALID_INPUT = '87654321';
    const password = new FormControl(VALID_INPUT);
    const confirmPassword = new FormControl(ANOTHER_VALID_INPUT);
    const FORM = new FormGroup({
      password: password,
      confirmPassword: confirmPassword,
    });
    const EXPECTED = true;
    validator(FORM);
    const RESULT = FORM.get('confirmPassword')?.hasError('passwords_mismatch');
    expect(RESULT).toEqual(EXPECTED);
  });
});
