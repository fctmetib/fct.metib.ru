import { ResetPasswordRequestInterface } from '../../types/reset-password/resetPasswordRequest.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { RegisterConfirmReq } from '../../types/register/registerConfirmReq';
import { CommonService } from '../../../shared/services/common/common.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent {
  public form: FormGroup;
  public formConfirm: FormGroup;

  public isSubmitting$ = new BehaviorSubject<boolean>(false);
  public backendErrors$ = new BehaviorSubject<any>(null);
  public confirmationCode$ = new BehaviorSubject<any>(null);
  public successMessage$ = new BehaviorSubject<any>(null);

  image: any;

  public isConfirm: boolean = false;

  private captchaCode: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  public initializeValues(): void {
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
    this.isSubmitting$.next(true);

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

    this.authService.resetPassword(request).pipe(
      tap((res) => {
        this.confirmationCode$.next(res.ConfirmationCode)
      }),
      finalize(() => {
        this.isSubmitting$.next(false);
      })
    ).subscribe();
  }

  public onConfirmSubmit(): void {
    this.isSubmitting$.next(true);

    const request: RegisterConfirmReq = {
      ConfirmationCode: this.confirmationCode$.value,
      Pin: this.formConfirm.value.pin,
    };

    this.authService.resetPasswordConfirm(request).pipe(
      tap(() => {
        this.successMessage$.next('На указанную почту отправлена ссылка. Пожалуйста, перейдите по ней, для смены пароля')
      }),
      finalize(() => {
        this.isSubmitting$.next(false);
      })
    ).subscribe();
  }
}
