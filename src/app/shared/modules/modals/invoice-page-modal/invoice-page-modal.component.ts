import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-invoice-page-modal',
	templateUrl: './invoice-page-modal.component.html',
	styleUrls: ['./invoice-page-modal.component.scss']
})
export class InvoicePageModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<InvoicePageModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log('data :>> ', data)
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
