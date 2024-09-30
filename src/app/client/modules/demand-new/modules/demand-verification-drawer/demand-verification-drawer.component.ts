import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'mib-demand-verification-drawer',
  templateUrl: './demand-verification-drawer.component.html',
  styleUrls: ['./demand-verification-drawer.component.scss'],
  providers:[DestroyService]
})
export class DemandVerificationDrawerComponent {
  form: FormGroup

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandVerificationDrawerComponent>,
    private fb: FormBuilder,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const info = data?.data
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
      DebtorID: ['', [Validators.required]],
      VerificationType: ['Верификация А', [Validators.required]],
      GLN: [null, [Validators.required]],
      order: [false],
      notification: [false],
      Comment: ['', [Validators.required]]
    })

    if (info?.isEdit) this.getDemandByID(info.id)
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

  private getDemandByID(id: number) {
    this.demandSrv.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        const demandData = JSON.parse(val.DemandData)
        this.form.patchValue({
          DebtorID: demandData.DebtorID,
          VerificationType: demandData.VerificationType,
          Comment: demandData.Comment
        })
      }
    })
  }
}
