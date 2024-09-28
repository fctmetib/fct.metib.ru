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

@Component({
  selector: 'mib-demand-limit-drawer',
  templateUrl: './demand-limit-drawer.component.html',
  styleUrls: ['./demand-limit-drawer.component.scss']
})
export class DemandLimitDrawerComponent {
  limit: number = null
  form: FormGroup
  size: InputSize | ButtonSize = 'm'
  freeRequestType = 'Question'
  get infoVal() {
    return this.info?.data?.info
  }

  get documents(): FormArray<any> {
    return this.form.get('Documents') as FormArray
  }

  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DemandLimitDrawerComponent>,
    @Inject(MAT_DIALOG_DATA) public info: DrawerData
  ) {

    const data = info?.data?.info;
    this.form = this.fb.group({
      limit: [null, [Validators.required]],
      requestText: [this.infoVal?.Comment ?? null, [Validators.required]],
      Documents: this.fb.array(data.Files ?? [])
    })
    this.limit = this.infoVal?.Limit
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
}
