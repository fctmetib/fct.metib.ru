import { CaptchaInterface } from './../../shared/types/common/captcha.interface';
import { ProfileInterface } from './../../shared/types/user/profile.interface';

export interface RegisterRequestInterface {
  profile: ProfileInterface
  password: string
  captcha: CaptchaInterface
}
