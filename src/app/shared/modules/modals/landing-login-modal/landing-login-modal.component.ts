import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-landing-login-modal',
	templateUrl: './landing-login-modal.component.html',
	styleUrls: ['./landing-login-modal.component.scss']
})
export class LandingLoginModalComponent implements OnInit {
	public form: FormGroup

	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	constructor(public dialogRef: MatDialogRef<LandingLoginModalComponent>) {}

	ngOnInit(): void {
		this.initForm()
	}

	initForm() {
		this.form = new FormGroup({
			login: new FormControl('', [Validators.required]),
			password: new FormControl('', Validators.required)
		})
	}

	public onSubmit(): void {
		console.log('halo submit')
		this.dialogRef.close()
	}
}
