import { resetErrorAction } from './../../store/actions/common.action';
import { MaleOptionsInterface } from './../../types/maleOptions.interface';
import { RegisterConfirmRequestInterface } from './../../types/registerConfirmRequest.interface';
import { AuthService } from './../../services/auth.service';
import { registerAction, registerConfirmAction } from './../../store/actions/register.action';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from './../../../shared/services/common.service';
import { RegisterRequestInterface } from './../../types/registerRequest.interface';
import {
  validationErrorsSelector,
  isSubmittingSelector,
  confirmationCodeSelector,
} from './../../store/selectors';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  form: FormGroup;
  formConfirm: FormGroup;
  genderOptions: MaleOptionsInterface[] = [];

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<string | null>;
  confirmationCode$: Observable<string | null>;

  image: any;

  isConfirm: boolean = false;

  private captchaCode: string = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private commonService: CommonService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetErrorAction());

    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.confirmationCode$ = this.store.pipe(select(confirmationCodeSelector));

    this.updateCaptcha();
    this.genderOptions = [
      {
        name: 'Мужской',
        value: true,
      },
      {
        name: 'Женский',
        value: false,
      },
    ];
  }

  initializeForm(): void {
    this.form = this.fb.group({
      captcha: this.fb.group({
        text: ['', Validators.required],
      }),
      password: ['', Validators.required],
      profile: this.fb.group({
        login: ['', Validators.required],
        email: ['', Validators.required],
        isMale: ['', Validators.required],
        name: this.fb.group({
          first: ['', Validators.required],
          last: ['', Validators.required],
        }),
        phone: ['', Validators.required],
      }),
    });

    this.formConfirm = this.fb.group({
      pin: ['', Validators.required],
    });
  }

  updateCaptcha() {
    this.commonService.getCaptcha().subscribe((resp) => {
      var uint8View = new Uint8Array(resp.body);
      const STRING_CHAR = String.fromCharCode.apply(null, uint8View);
      let base64String = btoa(STRING_CHAR);
      this.image = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpg;base64, ` + base64String
      );

      this.captchaCode = resp.headers.get('Content-Disposition');
      this.captchaCode = this.captchaCode.split('=').pop();
      this.captchaCode = this.captchaCode.split('.')[0];
    });
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      Captcha: {
        Code: this.captchaCode,
        Text: this.form.value.captcha.text,
      },
      Password: this.form.value.password,
      Profile: {
        Email: this.form.value.profile.email,
        IsMale: this.form.value.profile.isMale,
        Login: this.form.value.profile.login,
        Name: {
          First: this.form.value.profile.name.first,
          Last: this.form.value.profile.name.last,
        },
        Phone: this.form.value.profile.phone,
      },
    };

    this.store.dispatch(registerAction({ request }));
  }

  onConfirmSubmit(): void {
    let ConfirmationCode = '';
    this.confirmationCode$.subscribe(c => {
      ConfirmationCode = c;
    })

    const request: RegisterConfirmRequestInterface = {
      ConfirmationCode,
      Pin: this.formConfirm.value.pin,
    };

    this.store.dispatch(registerConfirmAction({ request }));
  }
}
