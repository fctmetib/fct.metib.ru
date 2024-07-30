import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, catchError, finalize, of, tap} from 'rxjs'
import {RequestLandingService} from 'src/app/public/service/request-landing.service'
import {RequestLandingInterface} from 'src/app/public/type/request-landing.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-landing-request-modal',
	templateUrl: './landing-request-modal.component.html',
	styleUrls: ['./landing-request-modal.component.scss']
})
export class LandingRequestModalComponent implements OnInit {
	form: FormGroup

	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public backendErrors$ = new BehaviorSubject<string>(null)

	constructor(
		private fb: FormBuilder,
		private requestLandingService: RequestLandingService,
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<LandingRequestModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {}

	ngOnInit(): void {
		this.initForms()
	}

	private initForms() {
		this.form = this.fb.group({
			Agent: ['', [Validators.required, Validators.minLength(2)]],
			Name: ['', [Validators.required, Validators.minLength(2)]],
			Phone: [
				'',
				[Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]
			],
			Email: ['', [Validators.required, Validators.email]],
			INN: ['', [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
			Comment: [''],
			Agree: [false, Validators.requiredTrue]
		})
	}

	onSubmit() {
		this.isSubmitting$.next(true)

		if (this.form.invalid) return
		const request: RequestLandingInterface = this.form.getRawValue()
		this.requestLandingService
			.sendRequestData(request)
			.pipe(
				tap(() => {
					this.toaster.show(
						'success',
						'Запрос отправлен',
						'',
						true,
						false,
						2500
					)
				}),
				catchError(error => {
					this.backendErrors$.next(error)
					this.toaster.show('failure', 'Ошибка сервера!', '', true, false, 2500)
					return of(error)
				}),
				finalize(() => {
					this.isSubmitting$.next(false)
					this.dialogRef.close()
				})
			)
			.subscribe()
	}
}
