import { FormGroup, ValidatorFn } from '@angular/forms';

export function PasswordConfirmationValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!control || !matchingControl) {
      return;
    }
    if (
      matchingControl.errors &&
      !matchingControl.errors['passwords_mismatch']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwords_mismatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}
