import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { RegisterRequestInterface } from './../../types/registerRequest.interface';
import { RegisterConfirmRequestInterface } from './../../types/registerConfirmRequest.interface';

export const registerConfirmAction = createAction(
  ActionTypes.REGISTER_CONFIRM,
  props<{ request: RegisterConfirmRequestInterface }>()
);

export const registerConfirmSuccessAction = createAction(
  ActionTypes.REGISTER_CONFIRM_SUCCESS
);

export const registerConfirmFailureAction = createAction(
  ActionTypes.REGISTER_CONFIRM_FAILURE,
  props<{ errors: string }>()
);

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ confirmCode: string }>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: string }>()
);
