import { DomSanitizer } from '@angular/platform-browser'
import {BehaviorSubject, catchError, finalize, of, takeWhile, tap} from 'rxjs'
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
import {AutoUnsubscribeService} from '../../../shared/services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
  providers: [AutoUnsubscribeService],
})
export class RegisterPageComponent {
	public inputSize: InputSize = 'l'

  public form: FormGroup
  public refForm: FormGroup
	public formConfirm: FormGroup

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
		private authService: AuthService,
    private au: AutoUnsubscribeService
	) {}

  get lastAndFirstName() {
    return this.refForm.get('lastAndFirstName') as FormControl
  }

  get firstName() {
    return this.refForm.get('Profile.Name.First') as FormControl
  }

  get lastName() {
    return this.refForm.get('Profile.Name.Last') as FormControl
  }

	public ngOnInit(): void {
		this.initializeForm()
		this.initializeValues()
    this.watchForms()
	}





  private watchForms() {
    this.lastAndFirstName.valueChanges.pipe(
      tap((value: string) => {
        const [last, first] = value.split(' ');
        this.firstName.setValue(first);
        this.lastName.setValue(last);
      }),
      takeUntil(this.au.destroyer)
    ).subscribe()
  }










	private initializeForm(): void {

    const passwordValidators = [Validators.required, Validators.minLength(6), Validators.pattern(/^[^А-Яа-я]+$/)]

    this.refForm = this.fb.group( {
      Password: [null, passwordValidators],
      ConfirmPassword: [null, passwordValidators],
      lastAndFirstNames: [null, [Validators.required]],
      Profile: this.fb.group({
        Email: [null, [Validators.required, Validators.email]],
        IsMale: [true, [Validators.required]],
        Phone: [null, [Validators.required]],
        Name: this.fb.group({
          First: [null, [Validators.required]],
          Last: [null, [Validators.required]]
        }),
      }),
      Captcha: this.fb.group({
        Text: [null, [Validators.required]],
        Code: [null, [Validators.required]]
      }),
    })


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
