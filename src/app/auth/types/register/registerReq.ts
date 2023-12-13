import { CaptchaInterface } from '../../../shared/types/common/captcha.interface';
import { Profile } from '../../../shared/types/user/profile';

export interface RegisterReq {
  Profile: Profile
  Password: string
  Captcha: CaptchaInterface
}
