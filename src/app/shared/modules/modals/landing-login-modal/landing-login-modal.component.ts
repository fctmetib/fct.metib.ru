import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {ActivatedRoute, Params} from '@angular/router'
import {BehaviorSubject, finalize} from 'rxjs'
import {AuthService} from 'src/app/auth/services/auth.service'
import {LoginRequestInterface} from 'src/app/auth/types/login/loginRequest.interface'
import {CommonService} from 'src/app/shared/services/common/common.service'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'

@Component({
	selector: 'mib-landing-login-modal',
	templateUrl: './landing-login-modal.component.html',
	styleUrls: ['./landing-login-modal.component.scss']
})
export class LandingLoginModalComponent implements OnInit {
	public form: FormGroup

	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	public inputSize: InputSize = 'l'

	private currentIp: string = ''

	alert: boolean = false
	alertMessage: string = ''

	alertWarning: boolean = false
	alertWarningMessage: string = ''

	public fieldTextType: boolean = false

	constructor(
		public dialogRef: MatDialogRef<LandingLoginModalComponent>,
		private readonly commonService: CommonService,
		private readonly route: ActivatedRoute,
		private readonly authService: AuthService
	) {}

	public ngOnInit(): void {
		this.initializeForm()
		this.initializeValues()
		this.isSubmitting$.next(false)

		this.route.queryParams.subscribe((params: Params) => {
			if (params['inActive']) {
				this.alertWarning = true
				this.alertWarningMessage = `
        Ваша сессия была прервана в целях безопасности,
        \n так как Вы не пользовались сервисом более 15 минут.`
			}
			if (params['successRegistration']) {
				this.alert = true
				this.alertMessage =
					'Регистрация успешно завершена. Войдите в сервис, используя свои данные.'
			}
			if (params['successPasswordReset']) {
				this.alert = true
				this.alertMessage =
					'Пароль успешно изменен. Войдите в сервис, используя свои данные.'
			}
			if (params['sessionFailed']) {
				this.alert = true
				this.alertMessage = 'Пожалуйста, войдите в систему снова.'
			}
		})
	}

	private initializeForm(): void {
		this.form = new FormGroup({
			login: new FormControl('', [Validators.required]),
			password: new FormControl('', Validators.required)
		})
	}

	private initializeValues(): void {
		this.commonService.getIP().subscribe(resp => {
			this.currentIp = resp
		})
	}

	public onSubmit(): void {
		this.isSubmitting$.next(true)
		if (this.form.invalid) return

		const request: LoginRequestInterface = {
			ip: this.currentIp,
			login: this.form.value.login,
			password: this.form.value.password
		}

		this.authService
			.loginModal(request)
			.pipe(
				finalize(() => {
					this.isSubmitting$.next(false)
					this.dialogRef.close(true)
				})
			)
			.subscribe()
	}
}
