import {
  getRequestsFailureAction,
  getRequestsSuccessAction,
} from './../actions/getRequests.action';
import { RequestsService } from './../../services/requests.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getRequestsAction } from '../actions/getRequests.action';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';

@Injectable()
export class GetRequestsEffect {
  getRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRequestsAction),
      switchMap(() => {
        return this.requestService.fetch().pipe(
          map((requests: RequestsResponseInterface[]) => {
            return getRequestsSuccessAction({ requests });
          }),

          catchError(() => {
            return of(getRequestsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private requestService: RequestsService
  ) {}
}
