import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          console.warn('ErrorInterceptor. Client-side error');
          errorMessage =error.error.message;
        } else {
          // server-side error
          console.warn('ErrorInterceptor. Server-side error');
          //TODO: if dev env => this.showError(`Error Code: ${error.status}\nMessage: ${error.message}`)
          // ELSE =>
          errorMessage ='При загрузке данных произошла ошибка.'
        }

        this.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private showError(errorMessage: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: errorMessage,
      sticky: true,
    });
  }
}
