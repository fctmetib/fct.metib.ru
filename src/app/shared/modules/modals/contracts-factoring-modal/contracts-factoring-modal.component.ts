import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-contracts-factoring-modal',
	templateUrl: './contracts-factoring-modal.component.html',
	styleUrls: ['./contracts-factoring-modal.component.scss']
})
export class ContractsFactoringModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<ContractsFactoringModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
	}

	getTitle() {
		return `Договор №${this.data.c.Number}`
	}

	getDelayCell() {
		return `${this.data.c.Delay.Count} к.д.`
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
