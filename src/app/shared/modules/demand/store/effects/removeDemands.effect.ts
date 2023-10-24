import { removeDemandsFailureAction } from './../actions/removeDemands.action';
import {
  getDemandsAction,
} from '../actions/getDemands.action';
import { DemandService } from '../../services/demand.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  removeDemandsAction,
  removeDemandsSuccessAction,
} from '../actions/removeDemands.action';
import { Store } from '@ngrx/store';

@Injectable()
export class RemoveDemandsEffect {
  removeDemands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeDemandsAction),
      switchMap(({ ID }) => {
        return this.demandService.deleteDraftById(ID).pipe(
          map(() => {
            this.store.dispatch(getDemandsAction());

            return removeDemandsSuccessAction();
          }),

          catchError(() => {
            return of(removeDemandsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private demandService: DemandService
  ) {}
}
