import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import {
  getFreedutyAction,
  getFreedutyFailureAction,
  getFreedutySuccessAction,
} from '../actions/getFreeduty.action';
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface';

@Injectable()
export class GetFreedutyEffect {
  getFreeduty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFreedutyAction),
      switchMap((data) => {
        return this.dutyService.fetch(data.data).pipe(
          map((resp: DutyInterface[]) => {
            let list = resp.reverse();

            list.sort((a, b) => {
              return b.ID - a.ID
            })
            return getFreedutySuccessAction({ list });
          }),

          catchError(() => {
            return of(getFreedutyFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private dutyService: DutyService) {}
}
