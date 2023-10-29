import {reauthAction, reauthFailureAction, reauthSuccessAction} from '../actions/reauth.action';
import {CurrentUserFactoringInterface} from '../../../shared/types/currentUserFactoring.interface';
import {CookieService} from 'ngx-cookie';
import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {of} from 'rxjs';

import {AuthResponseInterface} from 'src/app/auth/types/login/authResponse.interface';
import {AuthService} from 'src/app/auth/services/auth.service';

@Injectable()
export class ReauthEffect {
  reauth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reauthAction),
      switchMap(({request}) => {
        return this.authService.reauth(request).pipe(
          map((response: AuthResponseInterface) => {
            // second user
            this.cookieService.put('_cu', null);

            // second base token
            let token = response.Code;
            this.cookieService.put('_bt', token)

            let currentUserFactoring: CurrentUserFactoringInterface = response;

            return reauthSuccessAction({currentUserFactoring});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(reauthFailureAction({errors: errorResponse.error}));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reauthSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/cabinet');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }
}
