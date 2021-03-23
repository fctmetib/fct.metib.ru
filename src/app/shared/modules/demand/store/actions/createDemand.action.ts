import { createAction, props } from '@ngrx/store';
import { DemandInterface } from '../../types/demand.interface';
import { CreateDemandFactoringRequestInterface } from '../../types/requests/create-demand-factoring-request.interface';
import { SaveDemandRequestInterface } from '../../types/requests/save-demand-request.interface';
import { ActionTypes } from '../actionTypes';

export const createDemandFactoringAction = createAction(
  ActionTypes.CREATE_DEMAND_FACTORING,
  props<{
    data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface>;
  }>()
);

export const createDemandFactoringSuccessAction = createAction(
  ActionTypes.CREATE_DEMAND_FACTORING_SUCCESS,
  props<{ response: DemandInterface<CreateDemandFactoringRequestInterface> }>()
);

export const createDemandFactoringFailureAction = createAction(
  ActionTypes.CREATE_DEMAND_FACTORING_FAILURE,
  props<{ errors: string }>()
);
