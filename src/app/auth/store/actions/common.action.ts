import {createAction} from '@ngrx/store'
import {ActionTypes} from 'src/app/auth/store/actionTypes'

export const resetErrorAction = createAction(ActionTypes.COMMON_RESET_ERRORS)
