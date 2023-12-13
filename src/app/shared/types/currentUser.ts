import { UserGeneral } from './userGeneral';
import { UserFactoring } from "./userFactoring";

export interface CurrentUser {
  userFactoring: UserFactoring;
  userGeneral: UserGeneral
}
