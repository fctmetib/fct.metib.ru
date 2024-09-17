import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-documents-page-factoring-modal',
	templateUrl: './documents-page-factoring-modal.component.html',
	styleUrls: ['./documents-page-factoring-modal.component.scss']
})
export class DocumentsPageFactoringModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<DocumentsPageFactoringModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log('data :>> ', data)
	}

	downloadCurrentFile() {
		console.log('DOWNLOAD DOC>>>')
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
