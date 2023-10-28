import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';
import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { getCurrentUserAdminAction, getCurrentUserAdminFailureAction, getCurrentUserAdminSuccessAction } from '../actions/getCurrentAdmin.action';

@Injectable()
export class GetCurrentUserAdminEffect {
  getCurrentAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAdminAction),
      switchMap(() => {
        let userCookie = this.cookieService.get('_cu_admin');
        let user: AuthResponseInterface;
        if (userCookie) {
          user = JSON.parse(userCookie)
        }

        let userId;

        if(user) {
          const token = user.Code;
          userId = +user.UserID;

          if (!token) {
            return of(getCurrentUserAdminFailureAction());
          }

          if (!userId) {
            return of(getCurrentUserAdminFailureAction());
          }
        } else {
          return of(getCurrentUserAdminFailureAction());
        }

        return of(getCurrentUserAdminSuccessAction(null));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
}
