import { RequestsStateInterface } from './../types/requestsState.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import {
  getRequestsAction,
  getRequestsSuccessAction,
  getRequestsFailureAction,
} from './actions/getRequests.action';
import {
  addRequestAction,
  addRequestFailureAction,
  addRequestSuccessAction,
  setErrorAction,
} from './actions/crud.action';

const initialState: RequestsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
  crudError: null,
  crudSuccessMessage: null,
  isSubmitting: false,
};

const requestsReducer = createReducer(
  initialState,
  on(
    getRequestsAction,
    (state): RequestsStateInterface => ({
      ...state,
      crudError: null,
      isSubmitting: false,
      crudSuccessMessage: null,
      isLoading: true,
    })
  ),
  on(
    getRequestsSuccessAction,
    (state, action): RequestsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.requests,
    })
  ),
  on(
    getRequestsFailureAction,
    (state): RequestsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    addRequestAction,
    (state): RequestsStateInterface => ({
      ...state,
      isSubmitting: true,
      crudSuccessMessage: null,
      crudError: null,
    })
  ),
  on(
    addRequestSuccessAction,
    (state, action): RequestsStateInterface => ({
      ...state,
      isSubmitting: false,
      crudSuccessMessage: 'Успешно',
    })
  ),
  on(
    addRequestFailureAction,
    (state, action): RequestsStateInterface => ({
      ...state,
      isSubmitting: false,
      crudSuccessMessage: null,
      crudError: action.errors,
    })
  ),
  on(
    setErrorAction,
    (state, action): RequestsStateInterface => ({
      ...state,
      crudError: action.errors,
    })
  ),
  on(routerNavigationAction, (): RequestsStateInterface => initialState)
);

export function reducers(state: RequestsStateInterface, action: Action) {
  return requestsReducer(state, action);
}
