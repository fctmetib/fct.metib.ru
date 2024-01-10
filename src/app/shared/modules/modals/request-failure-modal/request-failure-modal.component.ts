import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-request-failure-modal',
	templateUrl: './request-failure-modal.component.html',
	styleUrls: ['./request-failure-modal.component.scss']
})
export class RequestFailureModalComponent {
	constructor(public dialogRef: MatDialogRef<RequestFailureModalComponent>) {}
}
