import { ActivatedRoute, Params } from '@angular/router'
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonService } from '../../../shared/services/common/common.service'
import { LoginRequestInterface } from '../../types/login/loginRequest.interface'
import { AuthService } from '../../services/auth.service'
import { InputSize } from 'src/app/shared/ui-kit/input/interfaces/input.interface'

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
	public form: FormGroup

	public inputSizeXL: InputSize = 'xl'

	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	private currentIp: string = ''

	alert: boolean = false
	alertMessage: string = ''

	alertWarning: boolean = false
	alertWarningMessage: string = ''

	public fieldTextType: boolean = false

	constructor(
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
			.login(request)
			.pipe(
				finalize(() => {
					this.isSubmitting$.next(false)
				})
			)
			.subscribe()
	}
}
