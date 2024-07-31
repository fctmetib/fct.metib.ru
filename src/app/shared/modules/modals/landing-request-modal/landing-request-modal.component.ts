import {HttpResponse} from '@angular/common/http'
import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, catchError, finalize, of, tap} from 'rxjs'
import {GetAgentRequestService} from 'src/app/public/service/get-agent-request.service'
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

	public getInnRequestControl = new FormControl(null, [Validators.required])
	public existingRequest?: any

	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public backendErrors$ = new BehaviorSubject<string>(null)

	Items = [
		{ID: 'TEST', Title: 'First Title'},
		{ID: 2, Title: 'Second Title'},
		{ID: 3, Title: 'Third Title'},
		{ID: 4, Title: 'Fourth Title'},
		{ID: 5, Title: 'Fifth Title'},
		{ID: 6, Title: 'Sixth Title'},
		{ID: 7, Title: 'Seventh Title'},
		{ID: 8, Title: 'Eighth Title'},
		{ID: 9, Title: 'Ninth Title'},
		{ID: 10, Title: 'Tenth Title'}
	]

	constructor(
		private fb: FormBuilder,
		private requestLandingService: RequestLandingService,
		private toaster: ToasterService,
		private getAgentRequestService: GetAgentRequestService,
		public dialogRef: MatDialogRef<LandingRequestModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	) {}

	ngOnInit(): void {
		this.initForms()
		this.getAgentRequestService.getAgentData('7707083893').subscribe(
			(response: HttpResponse<any>) => {
				console.log('Response Body:', response.body)
				console.log('Response Headers:', response.headers.keys())
				response.headers.keys().forEach(key => {
					console.log(`${key}: ${response.headers.get(key)}`)
				})
			},
			error => console.log('Error:', error)
		)

		// this.getAgentRequestService
		// 	.getAgentData('7707083893')
		// 	.pipe(
		// 		tap(data => {
		// 			console.log('data :>> ', data)
		// 		})
		// 	)
		// 	.subscribe()
		// this.existingRequest

		/* 
		.subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response Body:', response.body);
        console.log('Response Headers:', response.headers.keys());
        response.headers.keys().forEach(key => {
          console.log(`${key}: ${response.headers.get(key)}`);
        });
      },
      error => console.log('Error:', error)
    );
  }
		*/
	}

	private initForms() {
		this.form = this.fb.group({
			FormName: ['Сайт'],
			// Agent: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
			Agent: ['', [Validators.required]],
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

	private formatPhoneNumber(phoneNumber: string): string {
		phoneNumber = phoneNumber.replace(/\D/g, '')

		if (phoneNumber.length !== 11) {
			throw new Error('Phone number must be 11 digits long.')
		}

		const country = phoneNumber[0]
		const area = phoneNumber.substring(1, 4)
		const local = phoneNumber.substring(4, 7)
		const middle = phoneNumber.substring(7, 9)
		const last = phoneNumber.substring(9, 11)

		return `+${country} (${area}) ${local}-${middle}-${last}`
	}

	onSubmit() {
		// this.isSubmitting$.next(true)

		// if (this.form.invalid) return
		// const request: RequestLandingInterface = this.form.getRawValue()

		const rawPhoneNumber = this.form.value.Phone
		try {
			const formattedPhoneNumber = this.formatPhoneNumber(rawPhoneNumber)
			const formData = {
				FormName: this.form.value.FormName,
				Name: this.form.value.Name,
				Phone: formattedPhoneNumber,
				Email: this.form.value.Email,
				INN: this.form.value.INN,
				Agent: this.form.value.Agent,
				Component: this.form.value.Comment,
				Agree: this.form.value.Agree
			}

			console.log('formData :>> ', formData)
		} catch (error) {}

		/* 
					FormName: ['Сайт'],
			Agent: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
			Name: ['', [Validators.required, Validators.minLength(2)]],
			Phone: [
				'',
				[Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]
			],
			Email: ['', [Validators.required, Validators.email]],
			INN: ['', [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
			Comment: [''],
			Agree: [false, Validators.requiredTrue]
		*/

		// 	this.requestLandingService
		// 		.sendRequestData(request)
		// 		.pipe(
		// 			tap(() => {
		// 				this.toaster.show(
		// 					'success',
		// 					'Запрос отправлен',
		// 					'',
		// 					true,
		// 					false,
		// 					2500
		// 				)
		// 			}),
		// 			catchError(error => {
		// 				this.backendErrors$.next(error)
		// 				this.toaster.show('failure', 'Ошибка сервера!', '', true, false, 2500)
		// 				return of(error)
		// 			}),
		// 			finalize(() => {
		// 				this.isSubmitting$.next(false)
		// 				this.dialogRef.close()
		// 			})
		// 		)
		// 		.subscribe()

		this.dialogRef.close()
	}
}
