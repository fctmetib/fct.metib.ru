import {PassportInterface} from './user/passport.interface';
import {Profile} from './user/profile';

export interface UserGeneral {
  Passport: PassportInterface
  Profile: Profile;
  PassportFileCode: string;
  Avatar: string;
  ID: number;
}
