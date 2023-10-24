import { PassportInterface } from './user/passport.interface';
import { ProfileInterface } from './user/profile.interface';

export interface CurrentUserGeneralInterface {
  Id: number
  Profile: ProfileInterface
  Passport: PassportInterface
  PassportFileCode: string
  Avatar: string
}
