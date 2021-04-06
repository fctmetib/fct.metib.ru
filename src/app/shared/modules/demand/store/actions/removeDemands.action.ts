
import {createAction, props} from '@ngrx/store'
import { DemandInterface } from '../../types/demand.interface'
import { ActionTypes } from '../actionTypes'


export const removeDemandsAction = createAction(
  ActionTypes.REMOVE_DEMANDS,
  props<{ID: number}>()
)

export const removeDemandsSuccessAction = createAction(
  ActionTypes.REMOVE_DEMANDS_SUCCESS
)

export const removeDemandsFailureAction = createAction(ActionTypes.REMOVE_DEMANDS_FAILURE)

