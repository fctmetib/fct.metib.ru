
import {createAction, props} from '@ngrx/store'
import { DemandInterface } from '../../types/demand.interface'
import { ActionTypes } from '../actionTypes'

export const getDemandsAction = createAction(
  ActionTypes.GET_DEMANDS
)

export const getDemandsSuccessAction = createAction(
  ActionTypes.GET_DEMANDS_SUCCESS,
  props<{demands: DemandInterface<any>[]}>()
)

export const getDemandsFailureAction = createAction(ActionTypes.GET_DEMANDS_FAILURE)
