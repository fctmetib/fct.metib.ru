import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-free-duty-page-modal',
	templateUrl: './free-duty-page-modal.component.html',
	styleUrls: ['./free-duty-page-modal.component.scss']
})
export class FreeDutyPageModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<FreeDutyPageModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log('data :>> ', data)
	}

	public copyData(datas) {
		this.clipboard.copy(datas)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
