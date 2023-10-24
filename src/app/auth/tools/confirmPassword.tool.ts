import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class Validation {
  public static confirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors => {
      const control = controls.get(controlName);
      const matchingControl = controls.get(matchingControlName);

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }

      if (control?.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
