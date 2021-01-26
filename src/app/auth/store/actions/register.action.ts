import { RegisterConfirmRequestInterface } from './../../types/registerConfirmRequest.interface';
import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterConfirmRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS
)

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{errors: string}>()
)
