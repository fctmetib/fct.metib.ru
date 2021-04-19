import { DemandsStateInterface } from './../types/demandsState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/appState.interface';

export const demandsListSelector = createFeatureSelector<
  AppStateInterface,
  DemandsStateInterface
>('demands');

export const isLoadingSelector = createSelector(
  demandsListSelector,
  (demandsState: DemandsStateInterface) => demandsState.isLoading
);

export const errorSelector = createSelector(
  demandsListSelector,
  (demandsState: DemandsStateInterface) => demandsState.error
);

export const demandssSelector = createSelector(
  demandsListSelector,
  (demandsState: DemandsStateInterface) => demandsState.data
);

export const draftsSelector = createSelector(
  demandsListSelector,
  (demandsState: DemandsStateInterface) => demandsState.drafts
);
