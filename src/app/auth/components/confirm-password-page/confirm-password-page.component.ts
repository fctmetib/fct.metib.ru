import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import {
  validationErrorsSelector,
  isSubmittingSelector,
  confirmationCodeSelector,
} from '../../store/selectors';
import { resetMessagesAction } from '../../store/actions/common.action';

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

  image: any;

  isConfirm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetMessagesAction());

    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.confirmationCode$ = this.store.pipe(select(confirmationCodeSelector));
  }

  initializeForm(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
  }
}
