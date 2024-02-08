import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PasteModalComponent} from './paste-modal.component';
import {modalConfig} from '../../../ui-kit/modal/modal.tools';
import {ClipboardParserHeaders} from '../../../services/clipboard-parser.service';

export interface PasteModalData<T> {
  headersMap: ClipboardParserHeaders<T>
}

@Injectable({
  providedIn: 'root'
})
export class PasteModalService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public open<T>(data: PasteModalData<T>): MatDialogRef<PasteModalComponent, T[]> {
    return this.dialog.open(PasteModalComponent, modalConfig(432, data))
  }

}
