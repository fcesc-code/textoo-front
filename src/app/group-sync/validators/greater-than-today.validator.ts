import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DatePickValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const today = new Date();
    const todayUTC = today.getTime();
    const earliest_lag = 2 * 60 * 1000; // minimum lag in milliseconds from now
    const earliestValidUTCDate = todayUTC + earliest_lag;
    const inputDate = new Date(value);
    const inputUTCDate = inputDate.getTime();
    const latest_lag = 30 * 24 * 60 * 60 * 1000; // maximum lag in milliseconds from now
    const latestValidUTCDate = todayUTC + latest_lag;

    const condition1 = earliestValidUTCDate >= inputUTCDate;
    const condition2 = latestValidUTCDate <= inputUTCDate;

    return condition1
      ? { 'early-date': true }
      : condition2
      ? { 'late-date': true }
      : null;
  };
}
