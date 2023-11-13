import { RequestsService } from './../../services/requests.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { addRequestAction, addRequestFailureAction, addRequestSuccessAction } from '../actions/crud.action';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';

@Injectable()
export class CRUDEffect {
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRequestAction),
      switchMap(({ request }) => {
        return this.requestsService.add(request).pipe(
          map((response: RequestsResponseInterface) => {
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
    private requestsService: RequestsService,
  ) {}
}
