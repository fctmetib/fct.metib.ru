import { DemandsStateInterface } from './../types/demandsState.interface';
import { getDemandsAction, getDemandsSuccessAction, getDemandsFailureAction } from './actions/getDemands.action';
import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';


const initialState: DemandsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const demandsReducer = createReducer(
  initialState,
  on(
    getDemandsAction,
    (state): DemandsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getDemandsSuccessAction,
    (state, action): DemandsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.demands,
    })
  ),
  on(
    getDemandsFailureAction,
    (state): DemandsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): DemandsStateInterface => initialState)
);

export function reducers(state: DemandsStateInterface, action: Action) {
  return demandsReducer(state, action);
}