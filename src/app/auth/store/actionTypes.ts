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

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  COMMON_RESET_MESSAGES = '[Auth] Common reset messages'
}
