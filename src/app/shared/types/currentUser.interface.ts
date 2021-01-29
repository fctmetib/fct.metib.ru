import { PassportInterface } from './user/passport.interface';
import { ProfileInterface } from './user/profile.interface';

export interface CurrentUserInterface {
  Id: number
  Profile: ProfileInterface
  Passport: PassportInterface
  PassportFileCode: string
  Avatar: string
}
