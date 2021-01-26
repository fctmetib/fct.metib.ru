import { registerAction, registerSuccessAction, registerFailureAction } from './../actions/register.action';
import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'


import {AuthService} from '../../services/auth.service'
import {of} from 'rxjs'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.registerConfirm(request).pipe(
          map(() => {
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
          this.router.navigate(['/login'], {
            queryParams: {
              successRegistration: true
            }
          })
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
