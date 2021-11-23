import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { resetMessagesAction } from './../../store/actions/common.action';
import { CommonService } from '../../../shared/services/common/common.service';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from './../../store/selectors';
import { LoginRequestInterface } from '../../types/login/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<string | null>;

  currentIp: string = '';

  alert: boolean = false;
  alertMessage: string = '';

  alertWarning: boolean = false;
  alertWarningMessage: string = '';

  public fieldTextType: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetMessagesAction());

    this.initializeForm();
    this.initializeValues();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['inActive']) {
        this.alertWarning = true;
        this.alertWarningMessage = `
        Ваша сессия была прервана в целях безопасности,
        \n так как Вы не пользовались сервисом более 15 минут.`
      }
      if (params['successRegistration']) {
        this.alert = true;
        this.alertMessage = 'Регистрация успешно завершена. Войдите в сервис, используя свои данные.'
      }
      if (params['successPasswordReset']) {
        this.alert = true;
        this.alertMessage = 'Пароль успешно изменен. Войдите в сервис, используя свои данные.'
      }
      if(params['sessionFailed']) {
        this.alert = true;
        this.alertMessage = 'Пожалуйста, войдите в систему снова.'
      }
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));

    this.commonService.getIP().subscribe((resp) => {
      this.currentIp = resp;
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      ip: this.currentIp,
      login: this.form.value.login,
      password: this.form.value.password,
    };

    this.store.dispatch(loginAction({ request }));
  }

  public showPassword() {
    this.fieldTextType = !this.fieldTextType;
  }
}
