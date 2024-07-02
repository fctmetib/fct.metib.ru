import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-new-footer',
	templateUrl: './new-footer.component.html',
	styleUrls: ['./new-footer.component.scss']
})
export class NewFooterComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	getMap() {
		console.log('get map')
	}
	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
