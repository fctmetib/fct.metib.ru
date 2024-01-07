import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RequestCorrectionModalComponent} from './request-correction-modal.component';
import {modalConfig} from '../../../ui-kit/modal/modal.tools';
import {Shipment} from '../../../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface';

@Injectable()
export class RequestCorrectionModalService {
  constructor(
    private dialog: MatDialog
  ) {
  }

  open(data: Shipment[]): MatDialogRef<RequestCorrectionModalComponent> {
    if (!data.length) return
    return this.dialog.open(RequestCorrectionModalComponent, modalConfig(1168, data))
  }
}
