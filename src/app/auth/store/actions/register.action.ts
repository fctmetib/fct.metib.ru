import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS
)

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{errors: string}>()
)
