
import {createAction, props} from '@ngrx/store'
import { DemandInterface } from '../../types/demand.interface'
import { ActionTypes } from '../actionTypes'

export const getDraftsAction = createAction(
  ActionTypes.GET_DRAFTS
)

export const getDraftsSuccessAction = createAction(
  ActionTypes.GET_DRAFTS_SUCCESS,
  props<{demands: DemandInterface<any>[]}>()
)

export const getDraftsFailureAction = createAction(ActionTypes.GET_DRAFTS_SUCCESS)
