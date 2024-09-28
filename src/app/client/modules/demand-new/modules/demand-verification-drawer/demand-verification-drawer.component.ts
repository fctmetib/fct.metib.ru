import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'mib-demand-verification-drawer',
  templateUrl: './demand-verification-drawer.component.html',
  styleUrls: ['./demand-verification-drawer.component.scss']
})
export class DemandVerificationDrawerComponent {
  form: FormGroup

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandVerificationDrawerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const info = data?.data?.info
    // {
    //   "DebtorID": 0,
    //   "VerificationType": "",
    //   "GLN": "",
    //   "Comment": "",
    //   "DocumentTypes": [],
    //   "Type": "VerificationChannel",
    //   "Files": []
    // }
    this.form = this.fb.group({
      DebtorID: [info?.DebtorID ?? null, [Validators.required]],
      VerificationType: [info?.VerificationType ?? 'Верификация А', [Validators.required]],
      GLN: [null, [Validators.required]],
      order: [false],
      notification: [false],
      Comment: [info?.Comment ?? null, [Validators.required]]
    })
  }


  public submitData() {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
    // this.dialogRef.close()
  }
}
