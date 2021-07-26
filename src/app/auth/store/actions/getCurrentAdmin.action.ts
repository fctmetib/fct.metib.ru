
import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';

export const getCurrentUserAdminAction = createAction(ActionTypes.GET_CURRENT_ADMIN);

export const getCurrentUserAdminSuccessAction = createAction(
  ActionTypes.GET_CURRENT_ADMIN_SUCCESS,
  props<{ adminUserFactoring: CurrentUserFactoringInterface }>()
);

export const getCurrentUserAdminFailureAction = createAction(
  ActionTypes.GET_CURRENT_ADMIN_FAILURE
);

