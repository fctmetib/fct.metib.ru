import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormBuilder, FormGroup} from '@angular/forms'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'mib-demand-editing-drawer',
  templateUrl: './demand-editing-drawer.component.html',
  styleUrls: ['./demand-editing-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandEditingDrawerComponent {
  form: FormGroup

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandEditingDrawerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData,
    private fb: FormBuilder,
    private demandSrv: DemandService,
    private destroy$: DestroyService
  ) {
    console.log(data.data?.id)
    this.form = this.fb.group({
      surname: '',
      name: '',
      male: false,
      female: false,
      phone: '',
      mail: '',
      nationality: true,
      series: '',
      passportNumber: '',
      date: '',
      code: '',
      whoGave: ''
    })
    if (data.data?.isEdit) this.getDemandByID(data.data?.id)
  }


  onDocumentLoad({file, url}: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
    // this.addDocument(document)
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
        this.form.patchValue({
          DebtorID: demandData.DebtorID,
          VerificationType: demandData.VerificationType,
          Comment: demandData.Comment
        })
      }
    })
  }
}
