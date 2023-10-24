import { resetPasswordAction, resetPasswordSuccessAction, resetPasswordFailureAction, resetPasswordConfirmAction, resetPasswordConfirmSuccessAction, resetPasswordConfirmFailureAction, resetPasswordCompleteAction, resetPasswordCompleteSuccessAction, resetPasswordCompleteFailureAction } from './actions/resetPassword.action';
import { createReducer, on, Action } from '@ngrx/store';


import { resetMessagesAction } from './actions/common.action';
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from './actions/getCurrentUser.action';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import {
  loginAction,
  loginAdminSuccessAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action';
import {
  registerConfirmAction,
  registerConfirmSuccessAction,
  registerConfirmFailureAction,
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from './actions/register.action';
import { reauthAction, reauthFailureAction, reauthSuccessAction } from './actions/reauth.action';
import { getCurrentUserAdminAction, getCurrentUserAdminFailureAction, getCurrentUserAdminSuccessAction } from './actions/getCurrentAdmin.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUserGeneral: null,
  currentUserFactoring: null,
  adminUserFactoring: null,
  validationErrors: null,
  isLoggedIn: null,
  successMessage: null,
  confirmCode: null,
};

const authReducer = createReducer(
  initialState,
  on(
    resetMessagesAction,
    (state): AuthStateInterface => ({
      ...state,
      validationErrors: null,
      confirmCode: null,
    })
  ),
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      successMessage: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      successMessage: null,
      confirmCode: action.confirmCode,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: null,
      successMessage: null,
      validationErrors: action.errors,
    })
  ),
  on(
    registerConfirmAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      successMessage: null,
    })
  ),
  on(
    registerConfirmSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    registerConfirmFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      successMessage: null,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUserFactoring: action.currentUserFactoring,
      isLoggedIn: true,
    })
  ),
  on(
    loginAdminSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      adminUserFactoring: action.adminUserFactoring,
      isLoggedIn: true,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      successMessage: null,
      validationErrors: action.errors,
    })
  ),
  on(
    reauthAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      successMessage: null,
      validationErrors: null,
    })
  ),
  on(
    reauthSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUserFactoring: action.currentUserFactoring,
      isLoggedIn: true,
    })
  ),
  on(
    reauthFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      successMessage: null,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUserGeneral: action.currentUser.userGeneral,
      currentUserFactoring: action.currentUser.userFactoring,
    })
  ),
  on(
    getCurrentUserAdminAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserAdminSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      adminUserFactoring: action.adminUserFactoring,
    })
  ),
  on(
    getCurrentUserAdminFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUserGeneral: null,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUserGeneral: null,
    })
  ),
  on(
    resetPasswordAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      confirmCode: null,
      successMessage: null,
    })
  ),
  on(
    resetPasswordSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: action.confirmCode,
    })
  ),
  on(
    resetPasswordFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: null,
      successMessage: null,
      validationErrors: action.errors,
    })
  ),

  on(
    resetPasswordConfirmAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      confirmCode: null,
      successMessage: null,
    })
  ),
  on(
    resetPasswordConfirmSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      confirmCode: null,
      successMessage: action.successMessage,
    })
  ),
  on(
    resetPasswordConfirmFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      successMessage: null,
      confirmCode: null,
      validationErrors: action.errors,
    })
  ),

  on(
    resetPasswordCompleteAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      successMessage: null,
      validationErrors: null,
    })
  ),
  on(
    resetPasswordCompleteSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    resetPasswordCompleteFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: null,
      successMessage: null,
      validationErrors: action.errors,
    })
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
