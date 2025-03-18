import { PassportInterface } from './user/passport.interface';
import { Profile } from './user/profile';

export interface UserGeneral {
  UserID: number;
  Profile: Profile;
  Passport: PassportInterface;
}


