import { Router } from '@angular/router';
import { ResetPasswordCompleteReq } from '../types/reset-password/resetPasswordCompleteReq';
import { ResetPasswordConfirmRequestInterface } from '../types/reset-password/resetPasswordConfirmRequest.interface';
import { ResetPasswordRes } from '../types/reset-password/resetPasswordResponse.interface';
import { ResetPasswordReq } from '../types/reset-password/resetPasswordReq';
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
import { RegisterReq } from 'src/app/auth/types/register/registerReq';
import { UserGeneral } from 'src/app/shared/types/userGeneral';
import { LoginRequestInterface } from 'src/app/auth/types/login/loginRequest.interface';
import { AuthRes } from 'src/app/auth/types/login/authRes';
import { RegisterConfirmReq } from '../types/register/registerConfirmReq';
import { RegisterReponseInterface } from '../types/register/registerResponse.interface';
import { ReauthRequestInterface } from '../types/login/reauthRequest.interface';
import { RequestStoreService } from 'src/app/shared/services/store/request.store.service';
import { FreedutyStoreService } from 'src/app/shared/services/store/freeduty.store.service';
import { isPlatformBrowser } from '@angular/common';
import { UserFactoring } from 'src/app/shared/types/userFactoring';
import { CurrentUser } from 'src/app/shared/types/currentUser';
import {ToolsService} from '../../shared/services/tools.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserAdmin$ = new BehaviorSubject<CurrentUser>(null);
  public currentUser$ = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toolsService: ToolsService,
    private router: Router,
    private requestStoreService: RequestStoreService,
    private freedutyStoreService: FreedutyStoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // // second user
    // this.cookieService.put('_cu', JSON.stringify({"UserID":2484,"StaffID":18490,"ManagerID":0,"OrganizationID":22854,"CustomerID":1505,"DebtorID":0,"IP":"127.0.0.1","Login":"tdmariorioli","Name":"Сновский Владимир","Code":"7c4d9c8d-651c-4962-9472-3bf68e0b08d8","Date":"2023-12-11T18:11:33+03:00","Expire":"2023-12-11T22:11:33+03:00","Roles":["User","Staff","Customer"]}
    // ));
    //
    // this.cookieService.put('_bt', 'dGRtYXJpb3Jpb2xpOjEyMzQ1Ng==')
  }

  register(
    data: RegisterReq
  ): Observable<RegisterReponseInterface> {
    const url = environment.apiUrl + '/user/registration/init';
    return this.http.post<RegisterReponseInterface>(url, data);
  }

  registerConfirm(data: RegisterConfirmReq): Observable<any> {
    const url = environment.apiUrl + '/user/registration/confirm';
    return this.http.post<any>(url, data);
  }

  reauth(user: ReauthRequestInterface): Observable<any> {
    const url = environment.apiUrl + `/user/reauth/${user.userId}`;
    return this.http.post<AuthRes>(url, null).pipe(
      tap((response: AuthRes) => {
        // second user
        this.cookieService.put('_cu', JSON.stringify(response));

        // second base token
        let token = response.Code;
        this.cookieService.put('_bt', token)

        let currentUserFactoring: UserFactoring = response;
        this.currentUser$.next({
          userFactoring: currentUserFactoring,
          userGeneral: null
        });

        this.router.navigateByUrl('/client/cabinet');
      }),
      switchMap(() => this.initCurrentUser()),
      catchError((errorResponse: HttpErrorResponse) => {
        return of({errors: errorResponse.error});
      })
    );
  }

  login(data: LoginRequestInterface): Observable<any> {
    const url = environment.apiUrl + '/user/login';
    return this.http.post<AuthRes>(url, data).pipe(
      tap((response: AuthRes) => {
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
      }),
      switchMap(() => this.initCurrentUser()),
      catchError((errorResponse: HttpErrorResponse) => {
        return of({ errors: errorResponse.error });
      })
    );
  }

  initCurrentUser(): Observable<UserGeneral> {
    let adminCookie = this.cookieService.get('_cu_admin');
    let userCookie = this.cookieService.get('_cu');
    let user: AuthRes;
    if (userCookie) {
      user = this.toolsService.safeJson(userCookie);
    } else if (adminCookie) {
      user = this.toolsService.safeJson(adminCookie);
    }

    let userId;

    if (user) {
      const token = user.Code;
      userId = +user.UserID;

      if (!token || !userId) {
        return of();
      }
    } else {
      return of();
    }

    return this.http
      .get<UserGeneral>(environment.apiUrl + `/user/${userId}`)
      .pipe(
        tap((currentUserResponse: UserGeneral) => {
          let userCookie = this.cookieService.get('_cu');
          let currentUserFactoring: AuthRes;
          if (userCookie) {
            currentUserFactoring = JSON.parse(userCookie);
            let currentUser: CurrentUser = {
              userGeneral: currentUserResponse,
              userFactoring: currentUserFactoring,
            };
            this.currentUser$.next(currentUser);
          }

          let userAdminCookie = this.cookieService.get('_cu_admin');
          let currentAdminFactoring: AuthRes;
          if (userAdminCookie) {
            currentAdminFactoring = JSON.parse(userAdminCookie);
            let currentUser: CurrentUser = {
              userGeneral: currentUserResponse,
              userFactoring: currentAdminFactoring,
            };
            this.currentUserAdmin$.next(currentUser);
          }
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  /**
   * Called first
   * @param data
   */
  resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes> {
    const url = environment.apiUrl + '/user/password/forget';
    return this.http.post<ResetPasswordRes>(url, data);
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
    data: ResetPasswordCompleteReq
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

  get isUserLoggedIn(): boolean {
    const userCookie = this.cookieService.get('_cu');
    return Boolean(userCookie);
  }

  public getUserFromStore(): AuthRes {
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
        this.router.navigate(['/auth/login'], {
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

    let user: AuthRes;
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
    let user: AuthRes;
    let admin: AuthRes;

    const adminCookie = this.cookieService.get('_cu_admin');
    const userCookie = this.cookieService.get('_cu');

    if (adminCookie) {
      admin = JSON.parse(adminCookie);
    }

    if (userCookie) {
      user = this.toolsService.safeJson(userCookie)
    }

    return user?.Roles ?? admin?.Roles ?? [];
  }

  private getUserVerificationType(): AuthRes {
    const userCookie = this.cookieService.get('_cu');

    if (userCookie) {
      return this.toolsService.safeJson(userCookie)
    }

    return null;
  }

  //#endregion
}
