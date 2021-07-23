import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';
import { CryptoService } from './../../../shared/services/common/crypto.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from 'src/app/auth/store/actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        let userCookie = this.cookieService.get('_cu');
        let user: AuthResponseInterface;
        if (userCookie) {
          user = JSON.parse(
            this.cryptoService.decrypt(userCookie)
          ) as AuthResponseInterface;
        }

        let userId;

        if(user) {
          const token = user.Code;
          userId = +user.UserID;

          if (!token) {
            return of(getCurrentUserFailureAction());
          }

          if (!userId) {
            return of(getCurrentUserFailureAction());
          }
        } else {
          return of(getCurrentUserFailureAction());
        }

        return this.authService.getCurrentUser(userId).pipe(
          map((currentUserResponse: CurrentUserGeneralInterface) => {
            let userCookie = this.cookieService.get('_cu');
            let currentUserFactoring: AuthResponseInterface;
            if (userCookie) {
              currentUserFactoring = JSON.parse(
                this.cryptoService.decrypt(userCookie)
              ) as AuthResponseInterface;
            }

            let currentUser: CurrentUserInterface = {
              userGeneral: currentUserResponse,
              userFactoring: currentUserFactoring,
            };

            return getCurrentUserSuccessAction({ currentUser });
          }),

          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private cryptoService: CryptoService,
    private cookieService: CookieService
  ) {}
}
