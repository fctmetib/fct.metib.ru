import {Injectable} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

export type IForm<T> = {
  [K in keyof T]?: any;
}

@Injectable()
export class DemandDebtorDrawerStaticService {
  form!: IForm<any>

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = {
      INN: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      ShortTitle: ['', [Validators.required]],
      FullTitle: ['', [Validators.required]],
      KPP: ['', [Validators.required]],
      OGRN: ['', [Validators.required]],
      OKPO: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      LegalAddress: ['', [Validators.required]],
      FactAddressEquals: [''],
      FactAddress: ['', [Validators.required]],
      Files: this.fb.array([]),
    };
  }
}
