import {
  DocumentsType
} from '../../../client/modules/demand-new/modules/demand-limit-drawer/demand-limit-drawer.component';

export interface FileMode {
  ID: number;
  Identifier: DocumentsType;
  Code: string;
  FileName: string;
  Size: number;
  DemandFileID: number;
}
