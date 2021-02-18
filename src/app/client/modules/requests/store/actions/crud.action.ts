import { ClientRequestInterface } from './../../../../../shared/types/client/client-request.interface';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';


export const addRequestAction = createAction(
  ActionTypes.ADD_REQUEST,
  props<{ request: ClientRequestInterface }>()
);

export const addRequestSuccessAction = createAction(ActionTypes.ADD_REQUEST_SUCCESS,
  props<{ response: RequestsResponseInterface }>());

export const addRequestFailureAction = createAction(
  ActionTypes.ADD_REQUEST_FAILURE,
  props<{ errors: string }>()
);
