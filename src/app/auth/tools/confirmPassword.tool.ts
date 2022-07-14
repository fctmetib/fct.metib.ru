import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static ConfirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
}
