import {
  resetPasswordAction,
  resetPasswordConfirmAction,
} from './../../store/actions/resetPassword.action';
import { ResetPasswordRequestInterface } from './../../types/reset-password/resetPasswordRequest.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { RegisterConfirmRequestInterface } from '../../types/register/registerConfirmRequest.interface';
import { CommonService } from '../../../shared/services/common/common.service';
import {
  validationErrorsSelector,
  isSubmittingSelector,
  confirmationCodeSelector,
  successMessageSelector,
} from './../../store/selectors';
import { resetMessagesAction } from '../../store/actions/common.action';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent {
  public form: FormGroup;
  public formConfirm: FormGroup;

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<string | null>;
  public confirmationCode$: Observable<string | null>;
  public successMessage$: Observable<string | null>;
  public isSubmitted: boolean = false;

  image: any;

  public isConfirm: boolean = false;

  private captchaCode: string = '';

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly commonService: CommonService,
    private readonly store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(resetMessagesAction());

    this.initializeForm();
    this.initializeValues();
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.confirmationCode$ = this.store.pipe(select(confirmationCodeSelector));
    this.successMessage$ = this.store.pipe(select(successMessageSelector));

    this.updateCaptcha();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      captcha: new FormGroup({
        text: new FormControl('', Validators.required),
      }),
      login: new FormControl('', Validators.required),
    });

    this.formConfirm = new FormGroup({
      pin: new FormControl('', Validators.required),
    });
  }

  public updateCaptcha(): void {
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

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const request: ResetPasswordRequestInterface = {
      Captcha: {
        Code: this.captchaCode,
        Text: this.form.value.captcha.text,
      },
      Login: this.form.value.login,
    };

    this.store.dispatch(resetPasswordAction({ request }));
  }

  public onConfirmSubmit(): void {
    let ConfirmationCode = '';
    this.confirmationCode$.subscribe((c) => {
      ConfirmationCode = c;
    });

    const request: RegisterConfirmRequestInterface = {
      ConfirmationCode,
      Pin: this.formConfirm.value.pin,
    };

    this.store.dispatch(resetPasswordConfirmAction({ request }));
  }
}