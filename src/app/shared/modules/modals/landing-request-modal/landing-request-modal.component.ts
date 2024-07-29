import {Component, Inject} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-landing-request-modal',
	templateUrl: './landing-request-modal.component.html',
	styleUrls: ['./landing-request-modal.component.scss']
})
export class LandingRequestModalComponent {
	form: FormGroup

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<LandingRequestModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {
		this.form = this.fb.group({
			agree: [false]
		})
	}
}
