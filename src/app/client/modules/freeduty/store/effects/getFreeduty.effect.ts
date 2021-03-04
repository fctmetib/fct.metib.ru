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
              return new Date(b.DateDuty).getTime() - new Date(a.DateDuty).getTime()
            })
            console.log(list);
            // if (data.data.Free) {
            //   let currentDate = new Date();
            //   let dateTimeStamp = currentDate.getTime() - 12960000000;

            //   list = [];
            //   let newList: DutyInterface[] = [];
            //   resp.map((x) => {
            //     let itemDutyDate = new Date(x.DateDuty);
            //     console.log('Current ts: ', dateTimeStamp);
            //     console.log('Item date: ', itemDutyDate);
            //     console.log('Duty ts: ', itemDutyDate.getTime());

            //     if (itemDutyDate.getTime() > dateTimeStamp) {
            //       newList.push(x);
            //     }
            //   });

            //   console.log(list);
            // }

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
