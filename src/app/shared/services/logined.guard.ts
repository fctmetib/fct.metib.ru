import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, of } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginedGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.auth.isAuthenticated() && !this.auth.isAdminAuthenticated()) {
      return of(true);
    } else {
      let url = '/client/cabinet';

      if (this.auth.isAdminAuthenticated()) {
        url = '/admin/cabinet';
      }

      this.router.navigate([url]);
      return of(false);
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
