import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function GameIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const condition1 = String(value).length === 20;
    const condition2 = !/\s/g.test(value);
    const condition3 = !/__\.\*__/g.test(value);
    const condition4 = !/(\.)+/g.test(value);
    const condition5 = !/\//g.test(value);

    return condition1 && condition2 && condition3 && condition4 && condition5
      ? null
      : { 'wrong-id': true };
  };
}
