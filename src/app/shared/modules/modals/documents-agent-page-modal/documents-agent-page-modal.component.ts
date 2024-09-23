import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-documents-agent-page-modal',
	templateUrl: './documents-agent-page-modal.component.html',
	styleUrls: ['./documents-agent-page-modal.component.scss']
})
export class DocumentsAgentPageModalComponent {
	copied: boolean = false

	constructor(
		public dialogRef: MatDialogRef<DocumentsAgentPageModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
