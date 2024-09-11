import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-payments-page-modal',
	templateUrl: './payments-page-modal.component.html',
	styleUrls: ['./payments-page-modal.component.scss']
})
export class PaymentsPageModalComponent {
	constructor(
		public dialogRef: MatDialogRef<PaymentsPageModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		// console.log('data :>> ', data)
	}
}
