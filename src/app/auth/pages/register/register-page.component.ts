import {DomSanitizer} from '@angular/platform-browser'
import {BehaviorSubject, catchError, finalize, of, takeWhile, tap} from 'rxjs'
import {Component} from '@angular/core'
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms'
import {RegisterConfirmReq} from '../../types/register/registerConfirmReq'
import {CommonService} from '../../../shared/services/common/common.service'
import {RegisterReq} from '../../types/register/registerReq'
import Validation from '../../tools/confirmPassword.tool'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {AutoUnsubscribeService} from '../../../shared/services/auto-unsubscribe.service'
import {delay, takeUntil} from 'rxjs/operators'
import {Properties} from 'csstype';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class RegisterPageComponent {
	public inputSize: InputSize = 'l'

	public form: FormGroup
	public formConfirm: FormGroup

	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public backendErrors$ = new BehaviorSubject<string>(null)
  public isCaptchaLoading$ = new BehaviorSubject<boolean>(false)

	public image: string
  public captchaSkeleton: Properties = {
    width: '100%',
    height: '80px',
    borderRadius: '8px',
    border: '1px solid var(--wgr-tertiary)'
  }

	constructor(
		private fb: FormBuilder,
		private sanitizer: DomSanitizer,
		private commonService: CommonService,
		private router: Router,
		private authService: AuthService,
		private au: AutoUnsubscribeService
	) {}

	// get lastAndFirstName() {
	//   return this.form.get('lastAndFirstNames') as FormControl
	// }

	get firstName() {
		return this.form.get('Profile.First') as FormControl
	}

	get phone() {
		return this.form.get('Profile.Phone') as FormControl
	}

	get lastName() {
		return this.form.get('Profile.Last') as FormControl
	}

	get email() {
		return this.form.get('Profile.Email') as FormControl
	}

	get login() {
		return this.form.get('Profile.Login') as FormControl
	}

	get captchaText() {
		return this.form.get('Captcha.Text') as FormControl
	}

	get captchaCode() {
		return this.form.get('Captcha.Code') as FormControl
	}

	get confirmationCode() {
		return this.formConfirm.get('ConfirmationCode') as FormControl
	}

	get pin() {
		return this.formConfirm.get('Pin') as FormControl
	}

	public ngOnInit(): void {
		this.initForms()
		this.initValues()
		this.watchForms()
	}

	private watchForms() {
		this.email.valueChanges
			.pipe(
				tap(email => {
					this.login.setValue(email)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()

		this.form.valueChanges
			.pipe(
				tap(form => {
					console.log('form', form)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	private initForms(): void {
		const passwordValidators = [
			Validators.required,
			Validators.minLength(6),
			Validators.pattern(/^[^А-Яа-я]+$/)
		]

		this.form = this.fb.group(
			{
				Password: [null, passwordValidators],
				ConfirmPassword: [null, passwordValidators],
				Profile: this.fb.group({
					Name: this.fb.group({
            First: [null, [Validators.required]],
            Last: [null, [Validators.required]],
          }),
					Email: [null, [Validators.required, Validators.email]],
					IsMale: [true, [Validators.required]],
					Login: [null, [Validators.required, Validators.minLength(6)]],
					Phone: [null, [Validators.required]]
				}),
				Captcha: this.fb.group({
          Text: [null
            , [Validators.required]
          ],
          Code: [null
            , [Validators.required]
          ]
				})
			},
			{
				validators: [
					Validation.confirmedValidator('Password', 'ConfirmPassword')
				]
			}
		)

		this.formConfirm = this.fb.group({
			ConfirmationCode: [null, Validators.required],
			Pin: [null, [Validators.required]]
		})
	}

	private initValues(): void {
		this.updateCaptcha()
	}

	public updateCaptcha(): void {
    this.isCaptchaLoading$.next(true)
		this.commonService.getCaptcha().pipe(
      tap(({image, code}) => {
        this.image = image
        console.log("captchaCode",this.captchaCode.value);
        this.captchaCode.setValue(code)
        console.log("captchaCode",this.captchaCode.value);
      }),
      finalize(() => {
        this.isCaptchaLoading$.next(false)
      })
    ).subscribe()
	}

	public onSubmit(): void {
		this.isSubmitting$.next(true)

		if (this.form.invalid) return

		const request: RegisterReq = this.form.getRawValue()

		this.authService
			.register(request)
			.pipe(
				tap(result => {
					this.confirmationCode.setValue(result)
				}),
				catchError(error => {
					this.backendErrors$.next(error)
					return of(error)
				}),
				finalize(() => {
					this.isSubmitting$.next(false)
				})
			)
			.subscribe()
	}

	public onConfirmSubmit(): void {
		this.isSubmitting$.next(true)

		const request: RegisterConfirmReq = this.formConfirm.getRawValue()

		this.authService
			.registerConfirm(request)
			.pipe(
				tap(result => {
					this.router.navigate(['/auth/login'], {
						queryParams: {
							successRegistration: true
						}
					})
				}),
				catchError(error => {
					this.backendErrors$.next(error)
					return of(error)
				}),
				finalize(() => this.isSubmitting$.next(false))
			)
			.subscribe()
	}

	onConfirm($event: string) {
		this.pin.setValue($event)
		this.onConfirmSubmit()
	}

	onResend() {
		this.onSubmit()
	}

	onBack() {
		this.captchaText.reset()
		this.confirmationCode.reset()
		this.updateCaptcha()
	}
}
