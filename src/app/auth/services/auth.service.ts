import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { RegisterConfirmRequestInterface } from './../types/registerConfirmRequest.interface';
import { RegisterReponseInterface } from './../types/registerResponse.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  registerConfirm(data: RegisterConfirmRequestInterface): Observable<{}> {
    const url = environment.apiUrl + '/user/registration/confirm';
    return this.http.post<{}>(url, data);
  }

  register(
    data: RegisterRequestInterface
  ): Observable<RegisterReponseInterface> {
    const url = environment.apiUrl + '/user/registration/init';
    return this.http.post<RegisterReponseInterface>(url, data);
  }

  login(data: LoginRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/user/login';
    return this.http.post<AuthResponseInterface>(url, data);
  }

  getCurrentUser(id: number): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + `/user/${id}`;
    return this.http.get<CurrentUserInterface>(url);
  }

  isAuthenticated(): boolean {
    if (this.cookieService.get('code')) {
      return true;
    } else {
      return false;
    }
  }
}
