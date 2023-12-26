import {Component, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {InvoicesService} from '../../services/invoices.service'

@Component({
	selector: 'mib-invoices-page',
	templateUrl: './invoices-page.component.html',
	styleUrls: ['./invoices-page.component.scss']
})
export class InvoicesPageComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	selectedRequestsCount: number
	severalRequestsChecked: boolean = false

	constructor(public invoicesService: InvoicesService) {}

	ngOnInit(): void {
		this.getInvoices()
	}

	getInvoices() {
		this.loading$.next(true)
		this.invoicesService
			.getInvoices()
			.pipe(
				tap(data => {
					console.log('data :>> ', data)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}
}
