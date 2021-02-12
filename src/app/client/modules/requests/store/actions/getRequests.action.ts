
import {createAction, props} from '@ngrx/store'
import { RequestsResponseInterface } from '../../types/requestResponse.interface'
import { ActionTypes } from '../actionTypes'

export const getRequestsAction = createAction(
  ActionTypes.GET_REQUESTS
)

export const getRequestsSuccessAction = createAction(
  ActionTypes.GET_REQUESTS_SUCCESS,
  props<{requests: RequestsResponseInterface[]}>()
)

export const getRequestsFailureAction = createAction(ActionTypes.GET_REQUESTS_FAILURE)

