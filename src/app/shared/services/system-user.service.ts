import {Injectable} from '@angular/core'
import {CookieService} from "ngx-cookie-service";
import {AuthRes} from '../../auth/types/login/authRes';

@Injectable()
export class SystemUserService {
  constructor(
    private cookieService: CookieService,
  ) {
  }

  getAccessToken = (): string | null => {
    const user = this.getCookieUser()
    return user?.Code
  };

  getCookieUser = (): AuthRes | null => {
    const data = this.cookieService.get('_cu')
    if (data) return JSON.parse(data)
    return null
  }

}
