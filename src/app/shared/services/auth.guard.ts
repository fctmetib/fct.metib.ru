import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // TODO: Удалить после интеграции нового личного кабинета
    return of(false)

    if (this.auth.isAuthenticated()) {
      return of(true)
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
}
