import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const setLoadingAction = createAction(
  ActionTypes.SET_LOADING,
  props<{
    isLoading: boolean;
  }>()
);
