import { RequestsStateInterface } from './../types/requestsState.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
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
