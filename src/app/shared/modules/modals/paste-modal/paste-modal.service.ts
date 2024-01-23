import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PasteModalComponent} from './paste-modal.component';
import {modalConfig} from '../../../ui-kit/modal/modal.tools';
import {ShipmentReq} from '../../../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface';

@Injectable({
  providedIn: 'root'
})
export class PasteModalService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public open(): MatDialogRef<PasteModalComponent, ShipmentReq[]> {
    return this.dialog.open(PasteModalComponent, modalConfig())
  }

}
