import { CaptchaInterface } from '../../../shared/types/common/captcha.interface';
import { ProfileInterface } from '../../../shared/types/user/profile.interface';

export interface RegisterReq {
  Profile: ProfileInterface
  Password: string
  Captcha: CaptchaInterface
}
