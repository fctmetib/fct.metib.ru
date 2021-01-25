import { PersonNameInterface } from './personName.interface';

export interface ProfileInterface {
  name: PersonNameInterface
  isMale: boolean
  phone: string
  email: string
  login: string
}
