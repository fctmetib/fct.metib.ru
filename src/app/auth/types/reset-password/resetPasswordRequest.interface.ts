import { CaptchaInterface } from '../../../shared/types/common/captcha.interface';

export interface ResetPasswordRequestInterface {
  Login: string;
  Captcha: CaptchaInterface
}
