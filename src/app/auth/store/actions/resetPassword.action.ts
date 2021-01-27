import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { ResetPasswordConfirmRequestInterface } from './../../types/reset-password/resetPasswordConfirmRequest.interface';
import { ResetPasswordRequestInterface } from './../../types/reset-password/resetPasswordRequest.interface';
import { ResetPasswordCompleteRequestInterface } from './../../types/reset-password/resetPasswordCompleteRequest.interface';

export const resetPasswordAction = createAction(
  ActionTypes.RESET_PASSWORD,
  props<{ request: ResetPasswordRequestInterface }>()
);

export const resetPasswordSuccessAction = createAction(
  ActionTypes.RESET_PASSWORD_SUCCESS,
  props<{ confirmCode: string }>()
);

export const resetPasswordFailureAction = createAction(
  ActionTypes.RESET_PASSWORD_FAILURE,
  props<{ errors: string }>()
);

export const resetPasswordConfirmAction = createAction(
  ActionTypes.RESET_PASSWORD_CONFIRM,
  props<{ request: ResetPasswordConfirmRequestInterface }>()
);

export const resetPasswordConfirmSuccessAction = createAction(
  ActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS,
  props<{ confirmCode: string }>()
);

export const resetPasswordConfirmFailureAction = createAction(
  ActionTypes.RESET_PASSWORD_CONFIRM_FAILURE,
  props<{ errors: string }>()
);

export const resetPasswordCompleteAction = createAction(
  ActionTypes.RESET_PASSWORD_COMPLETE,
  props<{ request: ResetPasswordCompleteRequestInterface }>()
);

export const resetPasswordCompleteSuccessAction = createAction(
  ActionTypes.RESET_PASSWORD_COMPLETE_SUCCESS
);

export const resetPasswordCompleteFailureAction = createAction(
  ActionTypes.RESET_PASSWORD_COMPLETE_FAILURE,
  props<{ errors: string }>()
);
