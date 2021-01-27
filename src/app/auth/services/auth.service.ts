import { ResetPasswordCompleteRequestInterface } from './../types/reset-password/resetPasswordCompleteRequest.interface';
import { ResetPasswordConfirmRequestInterface } from './../types/reset-password/resetPasswordConfirmRequest.interface';
import { ResetPasswordReponseInterface } from './../types/reset-password/resetPasswordResponse.interface';
import { ResetPasswordRequestInterface } from '../types/reset-password/resetPasswordRequest.interface';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from 'src/app/auth/types/register/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { LoginRequestInterface } from 'src/app/auth/types/login/loginRequest.interface';
import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';
import { RegisterConfirmRequestInterface } from '../types/register/registerConfirmRequest.interface';
import { RegisterReponseInterface } from '../types/register/registerResponse.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(
    data: RegisterRequestInterface
  ): Observable<RegisterReponseInterface> {
    const url = environment.apiUrl + '/user/registration/init';
    return this.http.post<RegisterReponseInterface>(url, data);
  }

  registerConfirm(data: RegisterConfirmRequestInterface): Observable<{}> {
    const url = environment.apiUrl + '/user/registration/confirm';
    return this.http.post<{}>(url, data);
  }

  login(data: LoginRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/user/login';
    return this.http.post<AuthResponseInterface>(url, data);
  }

  getCurrentUser(id: number): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + `/user/${id}`;
    return this.http.get<CurrentUserInterface>(url);
  }

  /**
   * Called first
   * @param data
   */
  resetPassword(data: ResetPasswordRequestInterface): Observable<ResetPasswordReponseInterface> {
    const url = environment.apiUrl + '/user/password/forget';
    return this.http.post<ResetPasswordReponseInterface>(url, data);
  }

  /**
   * Called second
   * @param data
   */
  resetPasswordConfirm(data: ResetPasswordConfirmRequestInterface): Observable<ResetPasswordReponseInterface> {
    const url = environment.apiUrl + '/user/password/recovery/confirm';
    return this.http.post<ResetPasswordReponseInterface>(url, data);
  }

  /**
   * Called last
   * @param data
   */
  resetPasswordComplete(data: ResetPasswordCompleteRequestInterface): Observable<{}> {
    const url = environment.apiUrl + '/user/password/recovery/complete';
    return this.http.post<{}>(url, data);
  }

  isAuthenticated(): boolean {
    if (this.cookieService.get('code')) {
      return true;
    } else {
      return false;
    }
  }
}
