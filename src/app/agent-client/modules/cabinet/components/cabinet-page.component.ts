import {Component, OnDestroy, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-cabinet-page',
	templateUrl: './cabinet-page.component.html',
	styleUrls: ['./cabinet-page.component.scss']
})
export class CabinetPageComponent implements OnInit, OnDestroy {
	public loading$ = new BehaviorSubject<boolean>(false)

	public extended: boolean = false

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
