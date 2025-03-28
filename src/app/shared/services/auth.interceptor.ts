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
import {ToolsService} from './tools.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    private router: Router,
    private toolsService: ToolsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userCookie = this.cookieService.get('_cu');
    let bt = this.cookieService.get('_bt');

    let user;
    let token;
    if (userCookie) {
      user = this.toolsService.safeJson(userCookie)
      token = user.Code
    }

    if (this.auth.isUserAdmin()) {
      request = request.clone({
        setHeaders: {
          Authorization: token ? `Token ${token}` : '',
          "MetibToken": token ? token : '',
        },
      });

    } else {
      request = request.clone({
        setHeaders: {
          Authorization: bt ? `Basic ${bt}` : '',
          "MetibToken": token ? token : '',
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
      this.router.navigate(['/auth/login'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }

    return throwError(error);
  }
}
