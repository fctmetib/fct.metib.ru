import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-invoice-page-modal',
	templateUrl: './invoice-page-modal.component.html',
	styleUrls: ['./invoice-page-modal.component.scss']
})
export class InvoicePageModalComponent {
	public copyData = 'COPY TEST'
	constructor(
		public dialogRef: MatDialogRef<InvoicePageModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}
}
