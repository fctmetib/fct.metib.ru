import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-request-info-modal',
	templateUrl: './request-info-modal.component.html',
	styleUrls: ['./request-info-modal.component.scss']
})
export class RequestInfoModalComponent {
	constructor(public dialogRef: MatDialogRef<RequestInfoModalComponent>) {}
}
