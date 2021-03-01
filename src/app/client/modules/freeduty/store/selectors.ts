import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { FreeDutyStateInterface } from '../types/freedutyState.interface';

export const freedutyFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FreeDutyStateInterface
>('freeduty');

export const isLoadingSelector = createSelector(
  freedutyFeatureSelector,
  (freedutyState: FreeDutyStateInterface) => freedutyState.isLoading
);

export const errorSelector = createSelector(
  freedutyFeatureSelector,
  (freedutyState: FreeDutyStateInterface) => freedutyState.error
);

export const freedutySelector = createSelector(
  freedutyFeatureSelector,
  (freedutyState: FreeDutyStateInterface) => freedutyState.data
);
