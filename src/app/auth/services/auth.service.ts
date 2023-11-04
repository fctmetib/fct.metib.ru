import { Router } from '@angular/router';
import { ResetPasswordCompleteRequestInterface } from '../types/reset-password/resetPasswordCompleteRequest.interface';
import { ResetPasswordConfirmRequestInterface } from '../types/reset-password/resetPasswordConfirmRequest.interface';
import { ResetPasswordReponseInterface } from '../types/reset-password/resetPasswordResponse.interface';
import { ResetPasswordRequestInterface } from '../types/reset-password/resetPasswordRequest.interface';
import { CookieService } from 'ngx-cookie';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

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
import { isPlatformBrowser } from '@angular/common';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class AuthService {
  public currentUser$ = new BehaviorSubject<CurrentUserInterface>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    // Store services
    private requestStoreService: RequestStoreService,
    private freedutyStoreService: FreedutyStoreService,
    @Inject(PLATFORM_ID) private platformId: Object
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

  login(data: LoginRequestInterface): Observable<any> {
    const url = environment.apiUrl + '/user/login';
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      tap((response: AuthResponseInterface) => {
        console.log('login res', response);
        let isAdmin = response.Roles.find((x) => x === 'Administrator');
        if (isAdmin) {
          // admin current user
          this.cookieService.put('_cu_admin', JSON.stringify(response));

          // admin base token
          let token = btoa(`${data.login}:${data.password}`);
          this.cookieService.put('_bt_admin', token);

          this.router.navigateByUrl('/admin/cabinet');
        } else {
          // current user
          this.cookieService.put('_cu', JSON.stringify(response));

          // base token
          let token = btoa(`${data.login}:${data.password}`);
          this.cookieService.put('_bt', token);

          this.router.navigateByUrl('/client/cabinet');
        }

        this.initCurrentUser();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of({ errors: errorResponse.error });
      })
    );
  }

  initCurrentUser(): Observable<CurrentUserGeneralInterface> {
    let adminCookie = this.cookieService.get('_cu_admin');
    let userCookie = this.cookieService.get('_cu');
    let user: AuthResponseInterface;
    if (userCookie) {
      user = JSON.parse(userCookie);
    }

    let userId;

    if (user) {
      const token = user.Code;
      userId = +user.UserID;

      if (!token || !userId) {
        return;
      }
    } else {
      return;
    }

    const url = environment.apiUrl + `/user/${userId}`;
    this.http
      .get<CurrentUserGeneralInterface>(url)
      .pipe(
        tap((currentUserResponse: CurrentUserGeneralInterface) => {
          let userCookie = this.cookieService.get('_cu');
          let currentUserFactoring: AuthResponseInterface;
          if (userCookie) {
            currentUserFactoring = JSON.parse(userCookie);
          }

          let currentUser: CurrentUserInterface = {
            userGeneral: currentUserResponse,
            userFactoring: currentUserFactoring,
          };

          console.log('currentUser getCurrentUser', currentUserResponse);
          console.log('ffff')
          this.currentUser$.next(currentUser);
        }),
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe();
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
    return JSON.parse(userCookie);
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
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
      user = JSON.parse(cookie);
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
    let user: AuthResponseInterface;
    let admin: AuthResponseInterface;

    const adminCookie = this.cookieService.get('_cu_admin');
    const userCookie = this.cookieService.get('_cu');

    if (adminCookie) {
      admin = JSON.parse(adminCookie);
    }

    if (userCookie) {
      user = JSON.parse(userCookie);
    }

    return user?.Roles ?? admin?.Roles ?? [];
  }

  private getUserVerificationType(): AuthResponseInterface {
    const userCookie = this.cookieService.get('_cu');

    if (userCookie) {
      return JSON.parse(userCookie);
    }

    return null;
  }

  //#endregion
}
