import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'src/app/auth/store/actionTypes';

import { LoginRequestInterface } from 'src/app/auth/types/login/loginRequest.interface';
import { CurrentUserFactoringInterface } from '../../../shared/types/currentUserFactoring.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUserFactoring: CurrentUserFactoringInterface }>()
);

export const loginAdminSuccessAction = createAction(
  ActionTypes.LOGIN_ADMIN_SUCCESS,
  props<{ adminUserFactoring: CurrentUserFactoringInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: string }>()
);
