import { CookieService } from 'ngx-cookie-service';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user/registration/init';
    return this.http.post<CurrentUserInterface>(url, data);
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
