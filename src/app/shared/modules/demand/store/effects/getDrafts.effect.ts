import { getDemandsFailureAction, getDemandsSuccessAction, getDemandsAction } from './../actions/getDemands.action';
import { DemandService } from './../../services/demand.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, concatMapTo, concatMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { DemandInterface } from '../../types/demand.interface';
import { getDraftsAction, getDraftsFailureAction, getDraftsSuccessAction } from '../actions/getDrafts.action';

@Injectable()
export class GetDraftsEffect {
  getDrafts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDraftsAction),
      switchMap(() => {
        return this.demandService.getDrafts().pipe(
          map((demands: DemandInterface<any>[]) => {
            return getDraftsSuccessAction({ demands });
          }),

          catchError(() => {
            return of(getDraftsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private demandService: DemandService
  ) {}
}
