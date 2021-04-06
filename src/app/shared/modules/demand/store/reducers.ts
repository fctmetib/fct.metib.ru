import { createDemandFactoringAction, createDemandFactoringSuccessAction, createDemandFactoringFailureAction } from './actions/createDemand.action';
import { DemandsStateInterface } from './../types/demandsState.interface';
import { getDemandsAction, getDemandsSuccessAction, getDemandsFailureAction } from './actions/getDemands.action';
import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { removeDemandsAction, removeDemandsFailureAction, removeDemandsSuccessAction } from './actions/removeDemands.action';


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
      error: null,
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
  on(
    createDemandFactoringAction,
    (state): DemandsStateInterface => ({
      ...state,
      error: null,
      isLoading: true,
    })
  ),
  on(
    createDemandFactoringSuccessAction,
    (state, action): DemandsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createDemandFactoringFailureAction,
    (state, action): DemandsStateInterface => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
  on(
    removeDemandsAction,
    (state): DemandsStateInterface => ({
      ...state,
      error: null,
      isLoading: true,
    })
  ),
  on(
    removeDemandsSuccessAction,
    (state, action): DemandsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    removeDemandsFailureAction,
    (state, action): DemandsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): DemandsStateInterface => initialState)
);

export function reducers(state: DemandsStateInterface, action: Action) {
  return demandsReducer(state, action);
}
