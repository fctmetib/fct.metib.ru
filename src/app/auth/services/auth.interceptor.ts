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
import { AuthRes } from 'src/app/auth/types/login/authRes';
import {ToolsService} from '../../shared/services/tools.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    private router: Router,
    private toolsService: ToolsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let bt: string;
    let cookie: string;
    const suggesctionUrl = 'https://suggestions.dadata.ru/';

    if (this.auth.isAdminAuthenticated()) {
      bt = this.cookieService.get('_bt_admin');
      cookie = this.cookieService.get('_cu_admin');
    } else if (this.auth.isAuthenticated()) {
      bt = this.cookieService.get('_bt');
      cookie = this.cookieService.get('_cu');
    }

    let user: AuthRes;
    let token;
    if (cookie) {
      user = this.toolsService.safeJson(cookie)
      token = user.Code;
    }

    if (request.url.includes(suggesctionUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Token bb7a3abe7995f91132c083549aaae9fdf332b66e'
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: bt ? `Basic ${bt}` : '',
        },
      });
    }

    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error))
      );
  }

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.auth.logout();
      this.router.navigate(['/auth/login'],   {
        queryParams: {
          sessionFailed: true,
        },
      })

    }

    return throwError(error);
  }
}
