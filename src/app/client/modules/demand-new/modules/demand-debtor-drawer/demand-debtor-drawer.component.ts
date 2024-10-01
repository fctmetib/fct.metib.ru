import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'mib-demand-debtor-drawer',
  templateUrl: './demand-debtor-drawer.component.html',
  styleUrls: ['./demand-debtor-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandDebtorDrawerComponent {
  form: FormGroup

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandDebtorDrawerComponent>,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
    this.form = this.fb.group({
      addingType: 1,
      debitor: null,
      organizationType: '',
      shortOrganizationName: '',
      fullOrganizationName: '',
      inn: '',
      kpp: '',
      ogrn: '',
      okpo: '',
      phone: '',
      mail: '',
      address: '',
      addressMatch: false,
      realAddress: '',
      organizationInn: ''
    })

    if (data?.data?.isEdit) this.getDemandByID(data?.data?.id)
  }

  submitData() {
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

  private getDemandByID(id: number): void {
    this.demandSrv.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        const demandData = JSON.parse(val.DemandData)
        this.form.patchValue({})
      }
    })
  }
}
