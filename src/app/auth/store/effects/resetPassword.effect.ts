import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ResetPasswordReponseInterface } from '../../types/reset-password/resetPasswordResponse.interface';
import {
  resetPasswordAction,
  resetPasswordSuccessAction,
  resetPasswordFailureAction,
  resetPasswordConfirmAction,
  resetPasswordConfirmSuccessAction,
  resetPasswordCompleteSuccessAction,
  resetPasswordCompleteAction,
  resetPasswordCompleteFailureAction,
} from './../actions/resetPassword.action';

@Injectable()
export class ResetPasswordEffect {
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordAction),
      switchMap(({ request }) => {
        return this.authService.resetPassword(request).pipe(
          map((response: ResetPasswordReponseInterface) => {
            let confirmCode = response.ConfirmationCode;
            return resetPasswordSuccessAction({ confirmCode });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              resetPasswordFailureAction({ errors: errorResponse.error })
            );
          })
        );
      })
    )
  );

  resetConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordConfirmAction),
      switchMap(({ request }) => {
        return this.authService.resetPasswordConfirm(request).pipe(
          map((response: string) => {
            let successMessage = 'На указанную почту отправлена ссылка. Пожалуйста, перейдите по ней, для смены пароля'
            return resetPasswordConfirmSuccessAction({ successMessage });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              resetPasswordFailureAction({ errors: errorResponse.error })
            );
          })
        );
      })
    )
  );

  resetComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordCompleteAction),
      switchMap(({ request }) => {
        return this.authService.resetPasswordComplete(request).pipe(
          map(() => {
            return resetPasswordCompleteSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              resetPasswordCompleteFailureAction({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetPasswordCompleteSuccessAction),
        tap(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              successPasswordReset: true,
            },
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
