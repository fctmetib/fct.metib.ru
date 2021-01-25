import { PassportInterface } from './user/passport.interface';
import { ProfileInterface } from './user/profile.interface';

export interface CurrentUserInterface {
  id: number
  profile: ProfileInterface
  passport: PassportInterface
  passportFileCode: string
  avatar: string
}
