import { ClientStateInterface } from './../types/clientState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'

export const clientFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ClientStateInterface
>('client')

export const factoringSelector = createSelector(
  clientFeatureSelector,
  (clientState: ClientStateInterface) => clientState.factoring
)

export const successMessageSelector = createSelector(
  clientFeatureSelector,
  (clientState: ClientStateInterface) => clientState.successMessage
)

export const isLoadingSelector = createSelector(
  clientFeatureSelector,
  (clientState: ClientStateInterface) => clientState.isLoading
)
