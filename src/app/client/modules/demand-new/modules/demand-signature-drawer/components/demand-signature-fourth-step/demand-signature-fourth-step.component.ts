import { Component } from '@angular/core';
import {FileDnd} from '../../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../../../requests/interfaces/request.interface'
import {extractBase64} from '../../../../../../../shared/services/tools.service'

@Component({
  selector: 'mib-demand-signature-fourth-step',
  templateUrl: './demand-signature-fourth-step.component.html',
  styleUrls: ['./demand-signature-fourth-step.component.scss']
})
export class DemandSignatureFourthStepComponent {
  public onDocumentLoad({file, url}: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
  }

  public downloadFile() {
  }
}
