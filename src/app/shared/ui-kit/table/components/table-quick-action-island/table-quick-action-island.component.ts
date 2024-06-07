import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {TableFooterComponent} from '../table-footer/table-footer.component'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {Subscription} from 'rxjs'

@Component({
	selector: 'mib-table-quick-action-island',
	templateUrl: './table-quick-action-island.component.html',
	styleUrls: ['./table-quick-action-island.component.scss']
})
export class TableQuickActionIslandComponent implements OnInit, OnDestroy {
	@Input() showRemove: boolean = true
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		public footer: TableFooterComponent,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	get table() {
		return this.footer.table
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
