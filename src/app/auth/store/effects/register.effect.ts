import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { CookieService } from 'ngx-cookie-service';
import { registerAction, registerSuccessAction, registerFailureAction } from './../actions/register.action';
import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'


import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {of} from 'rxjs'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((response: AuthResponseInterface) => {
            this.cookieService.set('code', response.Code)
            this.cookieService.set('userId', response.UserID.toString())

            return registerSuccessAction()
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/dashboard')
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}
}
