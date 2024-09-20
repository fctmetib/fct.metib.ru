import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClipboardParserService} from '../../../services/clipboard-parser.service';
import {PasteModalData} from './paste-modal.service';

@Component({
  selector: 'mib-paste-modal',
  templateUrl: './paste-modal.component.html',
  styleUrls: ['./paste-modal.component.scss']
})
export class PasteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<PasteModalComponent>,
    private clipboardParserService: ClipboardParserService,
    @Inject(MAT_DIALOG_DATA) private data: PasteModalData<any>
  ) { }

  @HostListener('window:paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pasteContent = clipboardData.getData('text');
      const parsedData = this.clipboardParserService.parseClipboardData(pasteContent, this.data.headersMap);
      this.dialogRef.close(parsedData);
    }
  }
}
