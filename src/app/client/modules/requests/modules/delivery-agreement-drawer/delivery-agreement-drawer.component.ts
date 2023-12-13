import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {AdvancedRequests} from '../../pages/requests-page/interfaces/requests-page.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mib-delivery-agreement-drawer',
  templateUrl: './delivery-agreement-drawer.component.html',
  styleUrls: ['./delivery-agreement-drawer.component.scss']
})
export class DeliveryAgreementDrawerComponent implements OnInit {

  public form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<AdvancedRequests[]>,
    public dialogRef: MatDialogRef<DeliveryAgreementDrawerComponent>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = this.fb.group({
      AccountNumber: [null, [Validators.required]],
      AccountDate: [null, [Validators.required]],
      InvoiceNumber: [null, [Validators.required]],
      InvoiceDate: [null, [Validators.required]],
      WaybillNumber: [null, [Validators.required]],
      WaybillDate: [null, [Validators.required]],
      DateShipment: [null, [Validators.required]],
      DatePayment: [null, [Validators.required]],
      Summ: [null, [Validators.required]],
      SummToFactor: [null, [Validators.required]],
    })
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue())
  }
}
