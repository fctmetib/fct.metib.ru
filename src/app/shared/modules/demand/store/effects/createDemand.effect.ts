import { createDemandFactoringFailureAction } from './../actions/createDemand.action';
import { DemandService } from './../../services/demand.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DemandInterface } from '../../types/demand.interface';
import {
  createDemandFactoringAction,
  createDemandFactoringSuccessAction,
} from '../actions/createDemand.action';
import { Router } from '@angular/router';
import { CreateDemandFactoringRequestInterface } from '../../types/requests/create-demand-factoring-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CreateDemandFactoringEffect {
  createDemandFactoring$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDemandFactoringAction),
      switchMap(({ data }) => {
        return this.demandService.add(data).pipe(
          map(
            (
              response: DemandInterface<CreateDemandFactoringRequestInterface>
            ) => {
              return createDemandFactoringSuccessAction({ response });
            }
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createDemandFactoringFailureAction({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createDemandFactoringSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/demand/history');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private demandService: DemandService
  ) {}
}
