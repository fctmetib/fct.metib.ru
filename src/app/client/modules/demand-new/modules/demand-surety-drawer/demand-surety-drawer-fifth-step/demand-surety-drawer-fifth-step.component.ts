import { Component } from '@angular/core';
import {FileDnd} from '../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../../requests/interfaces/request.interface'
import {extractBase64} from '../../../../../../shared/services/tools.service'

@Component({
  selector: 'mib-demand-surety-drawer-fifth-step',
  templateUrl: './demand-surety-drawer-fifth-step.component.html',
  styleUrls: ['./demand-surety-drawer-fifth-step.component.scss']
})
export class DemandSuretyDrawerFifthStepComponent {
  onDocumentLoad({file, url}: FileDnd): void {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
    // this.addDocument(document)
  }

}
