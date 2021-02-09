import { CryptoService } from './../../../shared/services/common/crypto.service';
import { CurrentUserFactoringInterface } from '../../../shared/types/currentUserFactoring.interface';
import { getCurrentUserAction } from './../actions/getCurrentUser.action';
import { Store, select } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from 'src/app/auth/store/actions/login.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((response: AuthResponseInterface) => {
            let crptInfo = this.cryptoService.encrypt(JSON.stringify(response));

            // current user
            this.cookieService.set('_cu', crptInfo);

            // base token
            let token = btoa(`${request.login}:${request.password}`);
            this.cookieService.set('_bt', token)

            let currentUserFactoring: CurrentUserFactoringInterface = response;

            return loginSuccessAction( {currentUserFactoring} );
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/cabinet');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private cryptoService: CryptoService,
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}
}
