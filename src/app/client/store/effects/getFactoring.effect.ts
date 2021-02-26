import { HttpErrorResponse } from '@angular/common/http';
import { CustomerInterface } from './../../../shared/types/customer/customer.interface';
import {
  getFactoringFailureAction,
  getFactoringSuccessAction,
} from './../actions/getFactoring.action';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getFactoringAction } from '../actions/getFactoring.action';
import { ClientService } from 'src/app/shared/services/common/client.service';

@Injectable()
export class GetFactoringEffect {
  getFactoring$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFactoringAction),
      switchMap(({ organizationID }) => {
        return this.clientService.getClientFactoringById(organizationID).pipe(
          map((factoring: CustomerInterface) => {
            return getFactoringSuccessAction({ factoring });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFactoringFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private clientService: ClientService,
  ) {}
}