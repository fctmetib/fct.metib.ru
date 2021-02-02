import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { RequestsStateInterface } from '../types/requestsState.interface';

export const requestsListSelector = createFeatureSelector<
  AppStateInterface,
  RequestsStateInterface
>('requests');

export const isLoadingSelector = createSelector(
  requestsListSelector,
  (requestsState: RequestsStateInterface) => requestsState.isLoading
);

export const errorSelector = createSelector(
  requestsListSelector,
  (requestsState: RequestsStateInterface) => requestsState.error
);

export const requestsSelector = createSelector(
  requestsListSelector,
  (requestsState: RequestsStateInterface) => requestsState.data
);
