import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-landing-request-modal',
	templateUrl: './landing-request-modal.component.html',
	styleUrls: ['./landing-request-modal.component.scss']
})
export class LandingRequestModalComponent {
	constructor(public dialogRef: MatDialogRef<LandingRequestModalComponent>) {}
}
