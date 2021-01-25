import { CookieService } from 'ngx-cookie-service';
import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

import {AuthService} from 'src/app/auth/services/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction
} from 'src/app/auth/store/actions/getCurrentUser.action'
import { select, Store } from '@ngrx/store'

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.cookieService.get('code')
        const userId = +this.cookieService.get('userId');

        if (!token) {
          return of(getCurrentUserFailureAction())
        }

        if (!userId) {
          return of(getCurrentUserFailureAction())
        }

        return this.authService.getCurrentUser(userId).pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser})
          }),

          catchError(() => {
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
}
