import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {InputSize} from '../../../../../shared/ui-kit/input/interfaces/input.interface'
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'mib-demand-limit-drawer',
  templateUrl: './demand-limit-drawer.component.html',
  styleUrls: ['./demand-limit-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandLimitDrawerComponent {
  limit: number = 0
  form: FormGroup
  size: InputSize | ButtonSize = 'm'
  freeRequestType = 'Question'

  get documents(): FormArray<any> {
    return this.form.get('Documents') as FormArray
  }

  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    public dialogRef: MatDialogRef<DemandLimitDrawerComponent>,
    @Inject(MAT_DIALOG_DATA) public info: DrawerData
  ) {

    const data = info?.data
    this.form = this.fb.group({
      limit: [null, [Validators.required]],
      requestText: [null, [Validators.required]],
      Documents: this.fb.array([])
    })
    if (data?.isEdit) this.getDemandByID(data.id)
  }

  onDocumentLoad({file, url}: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
    this.addDocument(document)
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

  addDocument(data: DocumentReq): void {
    const control: FormGroup = this.fb.group({
      Number: [null],
      Title: [null],
      Description: [null],
      DocumentTypeID: [null],
      OwnerTypeID: [null],
      Data: [null],
      File: [null]
    })
    control.patchValue(data)
    this.documents.push(control)
  }

  private getDemandByID(id: number) {
    this.demandSrv.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        const demandData = JSON.parse(val.DemandData)
        this.form.patchValue({
          limit: demandData.Limit,
          requestText: demandData.Comment,
          Documents: demandData.Files
        })
      }
    })
  }
}
