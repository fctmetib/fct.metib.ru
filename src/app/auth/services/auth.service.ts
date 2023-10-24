import { CryptoService } from './../../shared/services/common/crypto.service';
import { Router } from '@angular/router';
import { ResetPasswordCompleteRequestInterface } from './../types/reset-password/resetPasswordCompleteRequest.interface';
import { ResetPasswordConfirmRequestInterface } from './../types/reset-password/resetPasswordConfirmRequest.interface';
import { ResetPasswordReponseInterface } from './../types/reset-password/resetPasswordResponse.interface';
import { ResetPasswordRequestInterface } from '../types/reset-password/resetPasswordRequest.interface';
import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from 'src/app/auth/types/register/registerRequest.interface';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { LoginRequestInterface } from 'src/app/auth/types/login/loginRequest.interface';
import { AuthResponseInterface } from 'src/app/auth/types/login/authResponse.interface';
import { RegisterConfirmRequestInterface } from '../types/register/registerConfirmRequest.interface';
import { RegisterReponseInterface } from '../types/register/registerResponse.interface';
import { ReauthRequestInterface } from '../types/login/reauthRequest.interface';
import { RequestStoreService } from 'src/app/shared/services/store/request.store.service';
import { FreedutyStoreService } from 'src/app/shared/services/store/freeduty.store.service';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private cryptoService: CryptoService,
    // Store services
    private requestStoreService: RequestStoreService,
    private freedutyStoreService: FreedutyStoreService
  ) {}

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

  reauth(user: ReauthRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + `/user/reauth/${user.userId}`;
    return this.http.post<AuthResponseInterface>(url, null);
  }

  login(data: LoginRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/user/login';
    return this.http.post<AuthResponseInterface>(url, data);
  }

  getCurrentUser(id: number): Observable<CurrentUserGeneralInterface> {
    const url = environment.apiUrl + `/user/${id}`;
    return this.http.get<CurrentUserGeneralInterface>(url);
  }

  /**
   * Called first
   * @param data
   */
  resetPassword(
    data: ResetPasswordRequestInterface
  ): Observable<ResetPasswordReponseInterface> {
    const url = environment.apiUrl + '/user/password/forget';
    return this.http.post<ResetPasswordReponseInterface>(url, data);
  }

  /**
   * Called second
   * @param data
   */
  resetPasswordConfirm(
    data: ResetPasswordConfirmRequestInterface
  ): Observable<string> {
    const url = environment.apiUrl + '/user/password/recovery/confirm';
    return this.http.post<string>(url, data);
  }

  /**
   * Called last
   * @param data
   */
  resetPasswordComplete(
    data: ResetPasswordCompleteRequestInterface
  ): Observable<{}> {
    const url = environment.apiUrl + '/user/password/recovery/complete';
    return this.http.post<{}>(url, data);
  }

  //#region common logic
  isUserAdmin(): boolean {
    const roles = this.getUserRoles();

    if (
      roles.includes('Administrator') ||
      roles.includes('Manager') ||
      roles.includes('Factoring Head')
    ) {
      return true;
    } else {
      return false;
    }
  }

  public getUserFromStore(): AuthResponseInterface {
    const userCookie = this.cookieService.get('_cu');
    if (userCookie) {
      const user = JSON.parse(
        this.cryptoService.decrypt(userCookie)
      ) as AuthResponseInterface;
      return user;
    }
    return null;
  }

  /**
   * Проверяет подтвержден ли пользователь.
   * Если да, то открывает доступ к полноценному кабинету, иначе открывает доступ только к 1 вкладке меню "Запросы"
   */
  public isUserVerified(): boolean {
    const user = this.getUserVerificationType();
    if (user.CustomerID === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Проверяет привязан ли пользователь к Организации, в CRM.
   * Если да, то в дальнейшем отправляет запрос на получение организации.
   */
  public isUserLinked(): any {
    const user = this.getUserVerificationType();

    if (user.OrganizationID !== 0) {
      return user.OrganizationID;
    } else {
      return false;
    }
  }

  public logout(params?: string): void {
    this.cookieService.removeAll();
    this.clearStore();
    localStorage.clear();
    switch (params) {
      case 'inActive':
        this.router.navigate(['/login'], {
          queryParams: {
            inActive: true,
          },
        });
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

  public switchToAdmin(): void {
    this.cookieService.remove('_cu');
    this.cookieService.remove('_bt');
    this.router.navigate(['/admin/cabinet']);
  }

  public isAdminAuthenticated(): boolean {
    if (this.cookieService.get('_cu_admin')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    if (this.cookieService.get('_cu')) {
      return true;
    } else {
      return false;
    }
  }

  public getNormalToken(): string {
    let bt: string;
    let cookie: string;

    if (this.isAdminAuthenticated()) {
      bt = this.cookieService.get('_bt_admin');
      cookie = this.cookieService.get('_cu_admin');
    } else if (this.isAuthenticated()) {
      bt = this.cookieService.get('_bt');
      cookie = this.cookieService.get('_cu');
    }

    let user: AuthResponseInterface;
    let token;
    if (cookie) {
      user = JSON.parse(
        this.cryptoService.decrypt(cookie)
      ) as AuthResponseInterface;
      token = user.Code;
    }

    return token;
  }

  //#endregion

  //#region private
  private clearStore() {
    this.requestStoreService.clear();
    this.freedutyStoreService.clear();
  }

  /**
   * This function return current user roles
   */
  private getUserRoles(): string[] {
    // const user: AuthResponseInterface = this.cryptoService.decrypt(
    //   JSON.parse(this.cookieService.get('_cu'))
    // );
    let roles: string[] = [];

    const adminCookie = this.cookieService.get('_cu_admin');
    const userCookie = this.cookieService.get('_cu');
    if (userCookie) {
      const user = JSON.parse(
        this.cryptoService.decrypt(userCookie)
      ) as AuthResponseInterface;
      user.Roles.forEach((role) => {
        roles.push(role);
      });
    }
    if (adminCookie) {
      const admin = JSON.parse(
        this.cryptoService.decrypt(adminCookie)
      ) as AuthResponseInterface;
      admin.Roles.forEach((role) => {
        roles.push(role);
      });
    }
    return roles;
  }

  private getUserVerificationType(): AuthResponseInterface {
    const userCookie = this.cookieService.get('_cu');

    return userCookie
      ? (JSON.parse(
          this.cryptoService.decrypt(userCookie)
        ) as AuthResponseInterface)
      : null;
  }
  //#endregion
}
