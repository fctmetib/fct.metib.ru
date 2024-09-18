import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-new-delays-page-modal',
	templateUrl: './new-delays-page-modal.component.html',
	styleUrls: ['./new-delays-page-modal.component.scss']
})
export class NewDelaysPageModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<NewDelaysPageModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log('data :>> ', data)
	}

	getTitle() {
		return `Просрочка - ${this.data.duty[0].Customer}`
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
