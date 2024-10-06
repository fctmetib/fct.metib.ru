import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {FileDnd} from '../../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../../../requests/interfaces/request.interface'
import {extractBase64} from '../../../../../../../shared/services/tools.service'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-signature-third-step',
  templateUrl: './demand-signature-third-step.component.html',
  styleUrls: ['./demand-signature-third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandSignatureThirdStepComponent {
  @Input() personalDataForm: FormGroup

  public onDocumentLoad({file, url}: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
  }
}
