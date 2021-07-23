import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'src/app/auth/store/actionTypes';

import { CurrentUserFactoringInterface } from '../../../shared/types/currentUserFactoring.interface';
import { ReauthRequestInterface } from '../../types/login/reauthRequest.interface';

export const reauthAction = createAction(
  ActionTypes.REAUTH,
  props<{ request: ReauthRequestInterface }>()
);

export const reauthSuccessAction = createAction(ActionTypes.REAUTH_SUCCESS,
  props<{ secondUserFactoring: CurrentUserFactoringInterface }>());

export const reauthFailureAction = createAction(
  ActionTypes.REAUTH_FAILURE,
  props<{ errors: string }>()
);
