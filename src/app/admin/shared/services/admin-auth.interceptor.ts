import {CookieService} from 'ngx-cookie';
import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/services/auth.service';
import {Router} from '@angular/router';
import {AuthRes} from 'src/app/auth/types/login/authRes';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let bt = this.cookieService.get('_bt_admin');
    let adminCookie = this.cookieService.get('_cu_admin');

    let user;
    let token;
    if (adminCookie) {
      user = JSON.parse(adminCookie)
      token = user.Code
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
      this.router.navigate(['/auth/login'],     {
        queryParams: {
          sessionFailed: true,
        },
      })
    }

    return throwError(error);
  }
}
