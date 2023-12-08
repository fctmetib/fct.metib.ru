import { DomSanitizer } from '@angular/platform-browser'
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs'
import { Component } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { RegisterConfirmRequestInterface } from '../../types/register/registerConfirmRequest.interface'
import { MaleOptionsInterface } from '../../types/common/maleOptions.interface'
import { CommonService } from '../../../shared/services/common/common.service'
import { RegisterRequestInterface } from '../../types/register/registerRequest.interface'
import Validation from '../../tools/confirmPassword.tool'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { InputSize } from 'src/app/shared/ui-kit/input/interfaces/input.interface'

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
	public inputSizeXL: InputSize = 'xl'

	public form: FormGroup
	public formConfirm: FormGroup
	public testForm: FormGroup

	public genderOptions: MaleOptionsInterface[] = []

	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public backendErrors$ = new BehaviorSubject<string>(null)
	public confirmationCode$ = new BehaviorSubject<string>('')

	image: any

	private captchaCode: string = ''

	constructor(
		private fb: FormBuilder,
		private sanitizer: DomSanitizer,
		private commonService: CommonService,
		private router: Router,
		private authService: AuthService
	) {}

	public ngOnInit(): void {
		this.initializeForm()
		this.initializeValues()
	}

	private initializeForm(): void {
		this.form = new FormGroup(
			{
				captcha: new FormGroup({
					text: new FormControl('', Validators.required)
				}),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(6),
					Validators.pattern(/^[^А-Яа-я]+$/)
				]),
				confirmPassword: new FormControl('', [
					Validators.required,
					Validators.minLength(6),
					Validators.pattern(/^[^А-Яа-я]+$/)
				]),
				profile: new FormGroup({
					login: new FormControl({ value: '', disabled: true }, [
						Validators.required,
						Validators.minLength(6)
					]),
					email: new FormControl('', [Validators.required, Validators.email]),
					isMale: new FormControl('', Validators.required),
					name: new FormGroup({
						first: new FormControl('', Validators.required),
						last: new FormControl('', Validators.required)
					}),
					phone: new FormControl('', Validators.required)
				})
			},
			[Validation.confirmedValidator('password', 'confirmPassword')]
		)

		this.formConfirm = this.fb.group({
			pin: ['', Validators.required]
		})

		this.form
			.get('profile')
			.get('email')
			.valueChanges.subscribe((updatedEmail: string): void => {
				this.form.patchValue({
					profile: {
						login: updatedEmail
					}
				})
			})
	}

	private initializeValues(): void {
		this.updateCaptcha()
		this.genderOptions = [
			{
				name: 'Мужской',
				value: true
			},
			{
				name: 'Женский',
				value: false
			}
		]
	}

	public updateCaptcha(): void {
		this.commonService.getCaptcha().subscribe(resp => {
			var uint8View = new Uint8Array(resp.body)
			const STRING_CHAR = String.fromCharCode.apply(null, uint8View)
			let base64String = btoa(STRING_CHAR)
			this.image = this.sanitizer.bypassSecurityTrustUrl(
				`data:image/jpg;base64, ` + base64String
			)

			this.captchaCode = resp.headers.get('Content-Disposition')
			this.captchaCode = this.captchaCode.split('=').pop()
			this.captchaCode = this.captchaCode.split('.')[0]
		})
	}

	public onSubmit(): void {
		this.isSubmitting$.next(true)

		if (this.form.invalid) {
			return
		}

		const request: RegisterRequestInterface = {
			Captcha: {
				Code: this.captchaCode,
				Text: this.form.value.captcha.text
			},
			Password: this.form.value.password,
			Profile: {
				Email: this.form.value.profile.email,
				IsMale: this.form.value.profile.isMale,
				Login: this.form.value.profile.email,
				Name: {
					First: this.form.value.profile.name.first,
					Last: this.form.value.profile.name.last
				},
				Phone: this.form.value.profile.phone
			}
		}

		this.authService
			.register(request)
			.pipe(
				tap(result => {
					this.confirmationCode$.next(result.ConfirmationCode)
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

		const request: RegisterConfirmRequestInterface = {
			ConfirmationCode: this.confirmationCode$.value,
			Pin: this.formConfirm.value.pin
		}

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
				finalize(() => {
					this.isSubmitting$.next(false)
				})
			)
			.subscribe()
	}
}
