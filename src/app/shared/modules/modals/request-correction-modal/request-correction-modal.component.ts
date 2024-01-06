import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'mib-request-correction-modal',
  templateUrl: './request-correction-modal.component.html',
  styleUrls: ['./request-correction-modal.component.scss']
})
export class RequestCorrectionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestCorrectionModalComponent>
  ) {
  }
}
