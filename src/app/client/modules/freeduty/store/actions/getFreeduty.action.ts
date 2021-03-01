
import {createAction, props} from '@ngrx/store'
import { DutyFilterRequestInterface } from 'src/app/shared/types/duty/duty-filter-request.interface'
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface'
import { ActionTypes } from '../actionTypes'

export const getFreedutyAction = createAction(
  ActionTypes.GET_FREEDUTY,
  props<{data: DutyFilterRequestInterface}>()
)

export const getFreedutySuccessAction = createAction(
  ActionTypes.GET_FREEDUTY_SUCCESS,
  props<{list: DutyInterface[]}>()
)

export const getFreedutyFailureAction = createAction(ActionTypes.GET_FREEDUTY_FAILURE)

