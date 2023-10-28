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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((response: AuthResponseInterface) => {
            console.log('login res', response)
            let isAdmin = response.Roles.find((x) => x === 'Administrator');
            if (isAdmin) {
              // admin current user
              this.cookieService.put('_cu_admin', JSON.stringify(response));

              // admin base token
              let token = btoa(`${request.login}:${request.password}`);
              this.cookieService.put('_bt_admin', token);
              let adminUserFactoring: CurrentUserFactoringInterface = response;
              this.store.dispatch(getCurrentUserAction());

              return loginAdminSuccessAction({ adminUserFactoring });
            } else {
              // current user
              this.cookieService.put('_cu', JSON.stringify(response));

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
          console.log('redirectAfterSubmit$')
          this.router.navigateByUrl('client/cabinet');
        })
      ),
    { dispatch: false }
  );

  redirectAfterSubmitAdmin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAdminSuccessAction),
        tap(() => {
          console.log('redirectAfterSubmitAdmin$')
          this.router.navigateByUrl('/admin/cabinet');
        })
      ),
    { dispatch: false }
  );
}
