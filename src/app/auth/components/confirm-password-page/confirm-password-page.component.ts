import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import {
  validationErrorsSelector,
  isSubmittingSelector,
  confirmationCodeSelector,
} from '../../store/selectors';
import { resetMessagesAction } from '../../store/actions/common.action';
import { resetPasswordCompleteAction } from '../../store/actions/resetPassword.action';
import { ResetPasswordCompleteRequestInterface } from './../../types/reset-password/resetPasswordCompleteRequest.interface';
import { ConfirmedValidator } from '../../tools/confirmPassword.tool';

@Component({
  selector: 'app-confirm-password-page',
  templateUrl: './confirm-password-page.component.html',
  styleUrls: ['./confirm-password-page.component.scss'],
})
export class ConfirmPasswordPageComponent {
  form: FormGroup;

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<string | null>;
  confirmationCode$: Observable<string | null>;

  completionCode: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetMessagesAction());

    this.initializeForm();
    this.initializeValues();

    this.route.params.subscribe((params: Params) => {
      this.completionCode = params['id'];
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.confirmationCode$ = this.store.pipe(select(confirmationCodeSelector));
  }

  initializeForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  onSubmit(): void {
    const request: ResetPasswordCompleteRequestInterface = {
      CompletionCode: this.completionCode,
      Password: this.form.value.password
    };

    this.store.dispatch(resetPasswordCompleteAction({ request }));
  }
}

