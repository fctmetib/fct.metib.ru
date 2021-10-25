import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {
  registerConfirmAction,
  registerConfirmSuccessAction,
  registerConfirmFailureAction,
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from './../actions/register.action';
import { RegisterReponseInterface } from '../../types/register/registerResponse.interface';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((response: RegisterReponseInterface) => {
            let confirmCode = response.ConfirmationCode;
            return registerSuccessAction({ confirmCode });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  registerConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmAction),
      switchMap(({ request }) => {
        return this.authService.registerConfirm(request).pipe(
          map(() => {
            return registerConfirmSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerConfirmFailureAction({ errors: errorResponse.error })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerConfirmSuccessAction),
        tap(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              successRegistration: true,
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
