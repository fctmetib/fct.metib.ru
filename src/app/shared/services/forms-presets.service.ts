import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ToolsService} from './tools.service';
import {ShipmentReq} from '../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface';
import {tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FormsPresetsService {

  constructor(
    private fb: FormBuilder,
    private toolsService: ToolsService,
  ) {
  }

  linkWithCheckbox(control: AbstractControl, form: AbstractControl, inverse: boolean = false, callback?: (checkbox: boolean) => void) {
    return control?.valueChanges.pipe(
      tap(checkbox => {
        if ((checkbox && !inverse) || (!checkbox && inverse)) {
          this.setValidators(form, [Validators.required])
        } else {
          this.removeValidators(form, [Validators.required])
        }
        callback?.(checkbox)
      })
    )
  }

  private applyValidatorsToControl(control: AbstractControl, validators: ValidatorFn[] | null) {
    validators?.forEach(validator => {
      if (!control.hasValidator(validator)) {
        control.addValidators(validator);
        control.updateValueAndValidity({emitEvent: false});
      }
    });
  }

  private removeValidatorsFromControl(control: AbstractControl, validators: ValidatorFn[] | null) {
    validators?.forEach(validator => {
      if (control.hasValidator(validator)) {
        control.removeValidators(validator);
        control.updateValueAndValidity({emitEvent: false});
      }
    });
  }

  public setValidators(control: any, validators: ValidatorFn[] | null = []): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        if ((control as any)?.noValidators?.includes(key)) {
          return;
        }
        const childControl = control.get(key);
        if (childControl) {
          this.setValidators(childControl, validators);
        }
      });
    } else {
      this.applyValidatorsToControl(control, validators);
    }
  }

  public removeValidators(control: any, validators: ValidatorFn[] | null = []): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        if ((control as any)?.noValidators?.includes(key)) {
          return;
        }
        const childControl = control.get(key);
        if (childControl) {
          this.removeValidators(childControl, validators);
        }
      });
    } else {
      this.removeValidatorsFromControl(control, validators);
    }
  }

  /**
   * Description: метод модифицирует стандартный объект FormGroup, добавляя в него поле noValidators. Это поле
   * хранит ключи тех полей, которые не принимают валидаторы (переменную validators или фиксировано заложенные) из шаблона
   * */
  updateNoValidators(form: FormGroup): FormGroup {
    const noValidators: string[] = [];
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (!control?.validator) {
        noValidators.push(key);
      }
    });
    (form as any).noValidators = noValidators;
    return form
  }

  shipment(validators: ValidatorFn | ValidatorFn[] | null = [], data?: Partial<ShipmentReq>) {
    const fg = this.updateNoValidators(this.fb.group({
      // AccountNumber: [null, validators],//
      // AccountDate: [null, validators], //
      InvoiceNumber: [null, validators],
      InvoiceDate: [null, validators],
      WaybillNumber: [null, validators],
      WaybillDate: [null, validators],
      DateShipment: [null, validators],
      // DatePayment: [null, validators], //
      Summ: [null, validators],
      // SummToFactor: [null, validators], //
    }))
    fg.patchValue(data as any)
    fg.markAllAsTouched()
    return fg
  }

}
