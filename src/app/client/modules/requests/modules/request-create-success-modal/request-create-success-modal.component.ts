import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-request-create-success-modal',
	templateUrl: './request-create-success-modal.component.html',
	styleUrls: ['./request-create-success-modal.component.scss']
})
export class RequestCreateSuccessModalComponent {
	constructor(
		public dialogRef: MatDialogRef<RequestCreateSuccessModalComponent>
	) {}
}
