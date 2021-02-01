import { AuthResponseInterface } from './../../auth/types/login/authResponse.interface';
import { CryptoService } from './common/crypto.service';
import { CookieService } from 'ngx-cookie-service';
import {Injectable} from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private cryptoService: CryptoService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let crptName = this.cryptoService.encrypt('currentUser');
    let user = JSON.parse(
      this.cryptoService.decrypt(this.cookieService.get(crptName))
    ) as AuthResponseInterface;

    const token = user.Code;
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : ''
      }
    })

    return next.handle(request)
  }
}
