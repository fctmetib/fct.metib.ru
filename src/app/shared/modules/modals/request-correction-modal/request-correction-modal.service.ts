import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RequestCorrectionModalComponent} from './request-correction-modal.component';
import {modalConfig} from '../../../ui-kit/modal/modal.tools';

@Injectable()
export class RequestCorrectionModalService {
  constructor(
    private dialog: MatDialog
  ) {
  }

  open(): MatDialogRef<RequestCorrectionModalComponent> {
    return this.dialog.open(RequestCorrectionModalComponent, modalConfig(1168))
  }
}
