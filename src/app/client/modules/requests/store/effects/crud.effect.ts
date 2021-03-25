import { RequestsService } from './../../services/requests.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { addRequestAction, addRequestFailureAction, addRequestSuccessAction } from '../actions/crud.action';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';
import { Store } from '@ngrx/store';
import { getRequestsAction } from '../actions/getRequests.action';

@Injectable()
export class CRUDEffect {
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRequestAction),
      switchMap(({ request }) => {
        return this.requestsService.add(request).pipe(
          map((response: RequestsResponseInterface) => {
            this.store.dispatch(getRequestsAction());
            return addRequestSuccessAction( {response} );
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(addRequestFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store,
    private requestsService: RequestsService,
  ) {}
}
