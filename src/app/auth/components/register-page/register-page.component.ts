import { DomSanitizer, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { RegisterConfirmRequestInterface } from '../../types/register/registerConfirmRequest.interface';
import {
  registerAction,
  registerConfirmAction,
} from './../../store/actions/register.action';
import { MaleOptionsInterface } from '../../types/common/maleOptions.interface';
import { resetMessagesAction } from './../../store/actions/common.action';
import { CommonService } from '../../../shared/services/common/common.service';
import { RegisterRequestInterface } from '../../types/register/registerRequest.interface';
import {
  validationErrorsSelector,
  isSubmittingSelector,
  confirmationCodeSelector,
} from './../../store/selectors';
import Validation from '../../tools/confirmPassword.tool';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public form: FormGroup;
  public formConfirm: FormGroup;
  public testForm: FormGroup;

  public genderOptions: MaleOptionsInterface[] = [];

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<string | null>;
  public confirmationCode$: Observable<string | null>;
  public isSubmitted: boolean = false;

  image: any;

  private captchaCode: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly commonService: CommonService,
    private readonly store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(resetMessagesAction());

    this.initializeForm();
    this.initializeValues();
  }

  private initializeForm(): void {
    this.form = new FormGroup(
      {
        captcha: new FormGroup({
          text: new FormControl('', Validators.required),
        }),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[^А-Яа-я]+$/)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[^А-Яа-я]+$/)]),
        profile: new FormGroup({
          login: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
          email: new FormControl('', [Validators.required, Validators.email]),
          isMale: new FormControl('', Validators.required),
          name: new FormGroup({
            first: new FormControl('', Validators.required),
            last: new FormControl('', Validators.required),
          }),
          phone: new FormControl('', Validators.required)
        }),
      }, [
      Validation.confirmedValidator('password', 'confirmPassword')
    ]
    );

    this.formConfirm = this.fb.group({
      pin: ['', Validators.required]
    });

    this.form
      .get('profile')
      .get('email')
      .valueChanges
      .subscribe((updatedEmail: string): void => {
        this.form.patchValue({
          profile: {
            login: updatedEmail
          },
        });
      });
  }

  private initializeValues(): void {
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
      }
    ];
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

    const request: RegisterRequestInterface = {
      Captcha: {
        Code: this.captchaCode,
        Text: this.form.value.captcha.text,
      },
      Password: this.form.value.password,
      Profile: {
        Email: this.form.value.profile.email,
        IsMale: this.form.value.profile.isMale,
        Login: this.form.value.profile.email,
        Name: {
          First: this.form.value.profile.name.first,
          Last: this.form.value.profile.name.last,
        },
        Phone: this.form.value.profile.phone,
      },
    };

    this.store.dispatch(registerAction({ request }));
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

    this.store.dispatch(registerConfirmAction({ request }));
  }
}
