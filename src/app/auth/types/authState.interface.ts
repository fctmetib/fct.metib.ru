import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean | null
  validationErrors: string | null
  successMessage: string
  isLoading: boolean
  confirmCode: string
}
