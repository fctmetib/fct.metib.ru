import { CurrentUserGeneralInterface } from './currentUserGeneral.interface';
import { CurrentUserFactoringInterface } from "./currentUserFactoring.interface";

export interface CurrentUserInterface {
  userFactoring: CurrentUserFactoringInterface;
  userGeneral: CurrentUserGeneralInterface
}
