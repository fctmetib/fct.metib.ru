import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Observable, of, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (isPlatformBrowser(this.platformId)) {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            console.warn('ErrorInterceptor. Client-side error');
            errorMessage = error.error.message;
          } else {
            // server-side error
            console.warn(`ErrorInterceptor. Error Code: ${error.status}\nMessage: ${error.message}`);
            errorMessage = `${error.error}`;
          }
          this.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        }

        return of(null)
      })
    );
  }

  private showError(errorMessage: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: errorMessage,
      sticky: false,
    });
  }
}
