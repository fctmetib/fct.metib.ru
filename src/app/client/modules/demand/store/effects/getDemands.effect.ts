import { getDemandsFailureAction, getDemandsSuccessAction, getDemandsAction } from './../actions/getDemands.action';
import { DemandService } from './../../services/demand.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DemandInterface } from '../../types/demand.interface';

@Injectable()
export class GetDemandsEffect {
  getDemands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDemandsAction),
      switchMap(() => {
        return this.demandService.fetch().pipe(
          map((demands: DemandInterface[]) => {
            return getDemandsSuccessAction({ demands });
          }),

          catchError(() => {
            return of(getDemandsFailureAction());
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
