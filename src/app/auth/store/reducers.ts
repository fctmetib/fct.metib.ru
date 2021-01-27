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

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
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
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: action.confirmCode,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: null,
      validationErrors: action.errors,
    })
  ),
  on(
    registerConfirmAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
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
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
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
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),


  on(
    resetPasswordAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      confirmCode: null,
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
    })
  ),
  on(
    resetPasswordConfirmSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: action.confirmCode,
    })
  ),
  on(
    resetPasswordConfirmFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      confirmCode: null,
      validationErrors: action.errors,
    })
  ),

  on(
    resetPasswordCompleteAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    resetPasswordCompleteSuccessAction,
    (state): AuthStateInterface => ({
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
      validationErrors: action.errors,
    })
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
