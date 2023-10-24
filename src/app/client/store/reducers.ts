import { setLoadingAction } from './actions/loading.action';
import { ClientStateInterface } from './../types/clientState.interface';
import { createReducer, on, Action } from '@ngrx/store';
import {
  getFactoringAction,
  getFactoringSuccessAction,
  getFactoringFailureAction,
} from './actions/getFactoring.action';

const initialState: ClientStateInterface = {
  isSubmitting: false,
  isLoading: false,
  factoring: null,
  validationErrors: null,
  successMessage: null,
};

const clientReducer = createReducer(
  initialState,
  on(
    getFactoringAction,
    (state): ClientStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFactoringSuccessAction,
    (state, action): ClientStateInterface => ({
      ...state,
      isLoading: false,
      factoring: action.factoring,
    })
  ),
  on(
    getFactoringFailureAction,
    (state): ClientStateInterface => ({
      ...state,
      isLoading: false,
      factoring: null,
    })
  ),
  on(
    setLoadingAction,
    (state, action): ClientStateInterface => ({
      ...state,
      isLoading: action.isLoading,
    })
  )
);

export function reducers(state: ClientStateInterface, action: Action) {
  return clientReducer(state, action);
}
