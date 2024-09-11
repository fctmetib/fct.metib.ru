import { CaptchaInterface } from '../../../shared/types/common/captcha.interface';

export interface ResetPasswordReq {
  Login: string;
  Captcha: CaptchaInterface
}
