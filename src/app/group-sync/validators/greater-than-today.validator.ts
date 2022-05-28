import { AbstractControl, ValidatorFn } from '@angular/forms';

export function GreaterThanTodayValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const today = new Date();
    const todayUTC = today.getTime();
    const inputDate = control.value;
    const inputUTCDate = inputDate.getTime();

    return todayUTC < inputUTCDate ? null : { 'greater-than-today': true };
  };
}
