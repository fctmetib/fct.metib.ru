import {createFeatureSelector, createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {AuthStateInterface} from 'src/app/auth/types/authState.interface'

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth')

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false
)

export const currentUserGeneralSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUserGeneral
)

export const currentUserFactoringSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUserFactoring
)

export const confirmationCodeSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.confirmCode
)

export const successMessageSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.successMessage
)

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
)
