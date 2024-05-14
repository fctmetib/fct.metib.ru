import {AuthService} from 'src/app/auth/services/auth.service'
import {Observable, of} from 'rxjs'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot
} from '@angular/router'
import {Injectable} from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class UserVerifyGuard implements CanActivate, CanActivateChild {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		if (this.auth.isUserVerified()) {
			return of(true)
		} else {
			this.router.navigate(['/client/not-verify'])
			return of(false)
		}
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		return this.canActivate(route, state)
	}
}
