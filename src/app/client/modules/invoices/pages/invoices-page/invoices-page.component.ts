import {Component, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {InvoicesService} from '../../services/invoices.service'
import {ClientInvoiceInterface} from '../../interfaces/client-invoice.interface'
import {InvoiceDrawerService} from '../../modules/invoice-drawer/invoice-drawer.service'
import {AnimationService} from '../../../../../shared/animations/animations.service'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {FormControl} from '@angular/forms'

const ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@Component({
	selector: 'mib-invoices-page',
	templateUrl: './invoices-page.component.html',
	styleUrls: ['./invoices-page.component.scss'],
	animations: [new AnimationService().generateAnimation(ANIMATION_CONFIG)]
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

	public selectedRequestCount: number = 0
	public severalRequestsChecked: boolean = false

	invoceRequests: ClientInvoiceInterface[] = []

	public invoicesAnimationStates: Record<number, boolean> = {}

	public dateFrom = new FormControl<string>('')
	public dateTo = new FormControl<string>('')

	constructor(
		public invoicesService: InvoicesService,
		private invoiceDrawerService: InvoiceDrawerService,
		public datesService: DatesService,
		public toolsService: ToolsService
	) {}

	ngOnInit(): void {
		const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
			dateFrom: this.toolsService
				.subtractFromDate(new Date(), {days: 7})
				.toISOString(),
			dateTo: new Date().toISOString()
		})
		this.dateFrom.setValue(dateFrom)
		this.dateTo.setValue(dateTo)
		this.getInvoices()
	}

	getInvoices() {
		this.loading$.next(true)
		this.invoicesService
			.getInvoices()
			.pipe(
				tap(data => {
					console.log('data :>> ', data)
					this.invoceRequests = data
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	openDrawer(invoiceId: number) {
		console.log('DRAWER!!! number>>', invoiceId)
		this.invoiceDrawerService.open({
			data: {invoiceId: invoiceId}
		})
	}
}
