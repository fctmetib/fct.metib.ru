import { AuthResponseInterface } from './../../types/login/authResponse.interface';
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
        let crptName = this.cryptoService.encrypt('currentUser');
        let user = JSON.parse(
          this.cryptoService.decrypt(this.cookieService.get(crptName))
        ) as AuthResponseInterface;

        const token = user.Code;
        const userId = +user.UserID;

        if (!token) {
          return of(getCurrentUserFailureAction());
        }

        if (!userId) {
          return of(getCurrentUserFailureAction());
        }

        return this.authService.getCurrentUser(userId).pipe(
          map((currentUserResponse: CurrentUserGeneralInterface) => {
            let currentUserFactoring = JSON.parse(
              this.cryptoService.decrypt(this.cookieService.get(crptName))
            ) as AuthResponseInterface;

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
