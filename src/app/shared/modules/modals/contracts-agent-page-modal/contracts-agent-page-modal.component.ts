import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-contracts-agent-page-modal',
	templateUrl: './contracts-agent-page-modal.component.html',
	styleUrls: ['./contracts-agent-page-modal.component.scss']
})
export class ContractsAgentPageModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<ContractsAgentPageModalComponent>,
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
