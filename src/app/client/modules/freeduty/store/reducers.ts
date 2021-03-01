import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { FreeDutyStateInterface } from '../types/freedutyState.interface';
import { getFreedutyAction, getFreedutyFailureAction, getFreedutySuccessAction } from './actions/getFreeduty.action';

const initialState: FreeDutyStateInterface = {
  data: null,
  isLoading: false,
  error: null,
  crudError: null,
  crudSuccessMessage: null,
  isSubmitting: false,
};

const freedutyReducer = createReducer(
  initialState,
  on(
    getFreedutyAction,
    (state): FreeDutyStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFreedutySuccessAction,
    (state, action): FreeDutyStateInterface => ({
      ...state,
      isLoading: false,
      data: action.list,
    })
  ),
  on(
    getFreedutyFailureAction,
    (state): FreeDutyStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): FreeDutyStateInterface => initialState)
);

export function reducers(state: FreeDutyStateInterface, action: Action) {
  return freedutyReducer(state, action);
}
