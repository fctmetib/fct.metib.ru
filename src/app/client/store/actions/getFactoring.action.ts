import { CustomerInterface } from './../../../shared/types/customer/customer.interface';

import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const getFactoringAction = createAction(
  ActionTypes.GET_FACTORING,
  props<{
    organizationID: number;
  }>()
);

export const getFactoringSuccessAction = createAction(
  ActionTypes.GET_FACTORING_SUCCESS,
  props<{ factoring: CustomerInterface }>()
);

export const getFactoringFailureAction = createAction(
  ActionTypes.GET_FACTORING_FAILURE
);
