import { CryptoService } from './../../../shared/services/common/crypto.service';
import { CurrentUserFactoringInterface } from '../../../shared/types/currentUserFactoring.interface';
import { CookieService } from 'ngx-cookie';
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
  loginAdminSuccessAction,
} from 'src/app/auth/store/actions/login.action';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from '../actions/getCurrentUser.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((response: AuthResponseInterface) => {
            let isAdmin = response.Roles.find((x) => x === 'Administrator');
            if (isAdmin) {
              let crptInfo = this.cryptoService.encrypt(
                JSON.stringify(response)
              );

              // admin current user
              this.cookieService.put('_cu_admin', crptInfo);

              // admin base token
              let token = btoa(`${request.login}:${request.password}`);
              this.cookieService.put('_bt_admin', token);
              let adminUserFactoring: CurrentUserFactoringInterface = response;
              this.store.dispatch(getCurrentUserAction());

              return loginAdminSuccessAction({ adminUserFactoring });
            } else {
              let crptInfo = this.cryptoService.encrypt(
                JSON.stringify(response)
              );

              // current user
              this.cookieService.put('_cu', crptInfo);

              // base token
              let token = btoa(`${request.login}:${request.password}`);
              this.cookieService.put('_bt', token);
              let currentUserFactoring: CurrentUserFactoringInterface =
                response;

              this.store.dispatch(getCurrentUserAction());

              return loginSuccessAction({ currentUserFactoring });
            }
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

  redirectAfterSubmitAdmin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAdminSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/admin/cabinet');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private cryptoService: CryptoService,
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store
  ) {}
}
