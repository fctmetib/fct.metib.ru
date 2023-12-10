import {ResetPasswordReq} from '../../types/reset-password/resetPasswordReq';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject, Observable, finalize, tap} from 'rxjs';
import {Component} from '@angular/core';
import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {RegisterConfirmReq} from '../../types/register/registerConfirmReq';
import {CommonService} from '../../../shared/services/common/common.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
  public successMessage$ = new BehaviorSubject<any>(null);

  public image: string;

  constructor(
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
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

  get pin() {
    return this.formConfirm.get('Pin') as FormControl
  }

  get confirmationCode() {
    return this.formConfirm.get('ConfirmationCode') as FormControl
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initValues(): void {
    this.updateCaptcha();
  }

  private initForm(): void {
    this.form = this.fb.group({
      Captcha: this.fb.group({
        Text: [null, [Validators.required]],
        Code: [null, [Validators.required]]
      }),
      Login: [null, [Validators.required, Validators.minLength(6)]],
    })

    this.formConfirm = this.fb.group({
      Pin: [null, Validators.required],
      ConfirmationCode: [null, Validators.required],
    });
  }

  public updateCaptcha(): void {
    this.commonService.getCaptcha().subscribe(({ image, code }) => {
      this.image = image;
      this.captchaCode.setValue(code);
    });
  }

  public onSubmit(): void {
    this.isSubmitting$.next(true);

    if (this.form.invalid) return;

    const request: ResetPasswordReq = this.form.getRawValue()

    this.authService.resetPassword(request).pipe(
      tap(res => {
        this.confirmationCode.setValue(res.ConfirmationCode)
      }),
      finalize(() => this.isSubmitting$.next(false))
    ).subscribe();
  }

  public onConfirmSubmit(): void {
    this.isSubmitting$.next(true);

    const request: RegisterConfirmReq = this.formConfirm.getRawValue()

    this.authService.resetPasswordConfirm(request).pipe(
      tap(() => {
        this.successMessage$.next('На указанную почту отправлена ссылка. Пожалуйста, перейдите по ней, для смены пароля')
      }),
      finalize(() => this.isSubmitting$.next(false))
    ).subscribe();
  }

  onConfirm($event: string) {
    this.pin.setValue($event)
    this.onConfirmSubmit()
  }

  onResend() {
    this.onSubmit()
  }

  onBack() {
    this.confirmationCode.reset()
    this.captchaText.reset()
    this.updateCaptcha()
  }
}
