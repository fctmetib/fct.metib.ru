import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-landing-request-modal',
	templateUrl: './landing-request-modal.component.html',
	styleUrls: ['./landing-request-modal.component.scss']
})
export class LandingRequestModalComponent implements OnInit {
	form: FormGroup
	// url = 'https://api-factoring.metib.ru/api/public/anket/factoring'

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<LandingRequestModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {}

	ngOnInit(): void {
		this.initForms()
	}

	private initForms() {
		this.form = this.fb.group({
			agent: ['', [Validators.required, Validators.minLength(2)]],
			name: ['', [Validators.required, Validators.minLength(2)]],
			phone: [
				'',
				[Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]
			],
			email: ['', [Validators.required, Validators.email]],
			inn: [
				'',
				[
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(12)
				]
			],
			comment: [''],
			agree: [false, Validators.requiredTrue]
		})
	}

	onSubmit() {
		console.log('send data>>>', this.form.value)
		this.dialogRef.close()
	}
}
