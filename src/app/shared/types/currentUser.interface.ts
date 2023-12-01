import { CurrentUserGeneral } from './currentUserGeneral';
import { CurrentUserFactoring } from "./currentUserFactoring";

export interface CurrentUserInterface {
  userFactoring: CurrentUserFactoring;
  userGeneral: CurrentUserGeneral
}
