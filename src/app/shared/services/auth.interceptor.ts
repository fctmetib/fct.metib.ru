import { AuthResponseInterface } from './../../auth/types/login/authResponse.interface';
import { CryptoService } from './common/crypto.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private cryptoService: CryptoService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userCookie = this.cookieService.get('_cu');
    let bt = this.cookieService.get('_bt');

    let user: AuthResponseInterface;
    let token;
    if (userCookie) {
      user = JSON.parse(
        this.cryptoService.decrypt(userCookie)
      ) as AuthResponseInterface;
      token = user.Code;
    }

    request = request.clone({
      setHeaders: {
       //Authorization: token ? `Token ${token}` : '',
        Authorization: bt ? `Basic ${bt}` : ''
      },
    });

    return next.handle(request);
  }
}
