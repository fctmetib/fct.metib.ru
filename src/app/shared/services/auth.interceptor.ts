import { AuthResponseInterface } from './../../auth/types/login/authResponse.interface';
import { CryptoService } from './common/crypto.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private cryptoService: CryptoService,
    private auth: AuthService,
    private router: Router
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

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) =>  this.handleAuthError(error)
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.auth.logout()
      this.router.navigate(['/login']), {
        queryParams: {
          sessionFailed: true
        }
      }
    }

    return throwError(error)
  }
}
