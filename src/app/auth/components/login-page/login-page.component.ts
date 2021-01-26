import { ActivatedRoute, Params, Router } from '@angular/router';
import { resetErrorAction } from './../../store/actions/common.action';
import { CommonService } from './../../../shared/services/common.service';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from './../../store/selectors';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';
import { BackendErrorsInterface } from 'src/app/shared/types/common/backendErrors.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<string | null>;

  currentIp: string = '';
  successRegistration: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetErrorAction());

    this.initializeForm();
    this.initializeValues();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['successRegistration']) {
        this.successRegistration = true;
      }
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));

    this.commonService.getIP().subscribe((resp) => {
      this.currentIp = resp.ip;
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      login: ['', Validators.required],
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
}
