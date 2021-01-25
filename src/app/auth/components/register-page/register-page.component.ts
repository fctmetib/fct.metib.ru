import { registerAction } from './../../store/actions/register.action';
import { Observable } from 'rxjs';
import { CommonService } from './../../../shared/services/common.service';
import {
  validationErrorsSelector,
  isSubmittingSelector,
} from './../../store/selectors';
import { RegisterRequestInterface } from './../../types/registerRequest.interface';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  form: FormGroup;
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<string | null>;

  currentIp: string = '';
  image: any;

  private captchaCode: string = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));

    this.commonService.getCaptcha().subscribe(resp => {
      var uint8View = new Uint8Array(resp.body);
      const STRING_CHAR = String.fromCharCode.apply(null, uint8View);
      let base64String = btoa(STRING_CHAR);
      this.image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);

      this.captchaCode = resp.headers.get('X-Captcha-Code')
    })
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
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      Captcha: {
        Code: this.captchaCode,
        Text: this.form.value.captcha.text,
      },
      Password: '',
      Profile: {
        Email: '',
        IsMale: false,
        Login: '',
        Name: {
          First: '',
          Last: '',
        },
        Phone: '',
      },
    };


    this.store.dispatch(registerAction({request}))
  }
}
