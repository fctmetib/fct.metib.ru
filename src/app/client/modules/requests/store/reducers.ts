import { RequestsStateInterface } from './../types/requestsState.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import {
  getRequestsAction,
  getRequestsSuccessAction,
  getRequestsFailureAction,
} from './actions/getRequests.action';

const initialState: RequestsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const requestsReducer = createReducer(
  initialState,
  on(
    getRequestsAction,
    (state): RequestsStateInterface => ({
      ...state,
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
  on(routerNavigationAction, (): RequestsStateInterface => initialState)
);

export function reducers(state: RequestsStateInterface, action: Action) {
  return requestsReducer(state, action);
}
