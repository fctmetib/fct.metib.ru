export enum ActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',

  REGISTER_CONFIRM = '[Auth] Register confirm',
  REGISTER_CONFIRM_SUCCESS = '[Auth] Register confirm success',
  REGISTER_CONFIRM_FAILURE = '[Auth] Register confirm failure',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  RESET_PASSWORD = '[Auth] Reset password',
  RESET_PASSWORD_SUCCESS = '[Auth] Reset password success',
  RESET_PASSWORD_FAILURE = '[Auth] Reset password failure',

  RESET_PASSWORD_CONFIRM = '[Auth] Reset password confirm',
  RESET_PASSWORD_CONFIRM_SUCCESS = '[Auth] Reset password confirm success',
  RESET_PASSWORD_CONFIRM_FAILURE = '[Auth] Reset password confirm failure',

  RESET_PASSWORD_COMPLETE = '[Auth] Reset password complete',
  RESET_PASSWORD_COMPLETE_SUCCESS = '[Auth] Reset password complete success',
  RESET_PASSWORD_COMPLETE_FAILURE = '[Auth] Reset password complete failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  COMMON_RESET_MESSAGES = '[Auth] Common reset messages'
}
