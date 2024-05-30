import {Injectable} from '@angular/core'
import {BreakpointObserver} from '@angular/cdk/layout'
import {Observable, map} from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class BreakpointObserverService {
	constructor(private breakpointObserver: BreakpointObserver) {}

	isDesktop(): Observable<boolean> {
		return this.breakpointObserver
			.observe([`(min-width: 992px)`])
			.pipe(map(result => result.matches))
	}
}
