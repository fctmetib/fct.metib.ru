import { CookieService } from 'ngx-cookie';
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
import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let bt: string;
    let cookie: string;

    if (this.auth.isAdminAuthenticated()) {
      bt = this.cookieService.get('_bt_admin');
      cookie = this.cookieService.get('_cu_admin');
    } else if (this.auth.isAuthenticated()) {
      bt = this.cookieService.get('_bt');
      cookie = this.cookieService.get('_cu');
    }

    let user: AuthResponseInterface;
    let token;
    if (cookie) {
      user = JSON.parse(cookie)
      token = user.Code;
    }

    request = request.clone({
      setHeaders: {
        //  Authorization: token ? `Token ${token}` : '',
        Authorization: bt ? `Basic ${bt}` : '',
      },
    });

    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error))
      );
  }

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.auth.logout();
      this.router.navigate(['/login'],   {
        queryParams: {
          sessionFailed: true,
        },
      })

    }

    return throwError(error);
  }
}
