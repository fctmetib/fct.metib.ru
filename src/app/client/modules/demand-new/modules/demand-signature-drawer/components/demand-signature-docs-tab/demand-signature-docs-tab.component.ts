import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilesTypeEnum } from '../../enum/demand-signature-drawer.enum';

@Component({
  selector: 'mib-demand-signature-docs-tab',
  templateUrl: './demand-signature-docs-tab.component.html',
  styleUrls: ['./demand-signature-docs-tab.component.scss']
})
export class DemandSignatureDocsTabComponent {
  @Output() deleteFile: EventEmitter<any> = new EventEmitter<any>()
  @Input() filesWithTypes: any[]

  get filesTypeEnum(): typeof FilesTypeEnum {
    return FilesTypeEnum;
  }
}
