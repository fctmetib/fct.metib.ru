import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, map, tap} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {InvoiceDrawer} from './interfaces/invoice-drawer.interface'
import {InvoicesService} from '../../services/invoices.service'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {BankDetailsData} from '../../../../../shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface'
import {
	ExtendedClientInvoice,
	PaymentLink
} from '../../interfaces/client.invoice'
import {ToolsService} from '../../../../../shared/services/tools.service'

@Component({
	selector: 'mib-invoice-drawer',
	templateUrl: './invoice-drawer.component.html',
	styleUrls: ['./invoice-drawer.component.scss']
})
export class InvoiceDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public inputSize: InputSize = 'l'
	public invoice: ExtendedClientInvoice

	public invoicesLinks: PaymentLink[] = []
	public invoicesLinksVisible: PaymentLink[] = []

	public totalSumDutyDebtor: number = 0

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<InvoiceDrawer>,
		public dialogRef: MatDialogRef<InvoiceDrawerComponent>,
		private invoicesService: InvoicesService,
		public toolsService: ToolsService
	) {}

	ngOnInit(): void {
		this.getCurrentInvoice().subscribe()
	}

	get invoiceID() {
		return this.data.data.invoiceId
	}

	get getParticipantData(): any {
		return this.invoice
	}

	get beneficiaryRequisites(): any {
		return {
			paymentParticipant: this.invoice.Beneficiary
		}
	}

	get payerRequisites(): any {
		return {
			paymentParticipant: this.invoice.Payer
		}
	}

	getCurrentInvoice() {
		this.loading$.next(true)
		return this.invoicesService
			.getInvoices({
				includeLinks: true
			})
			.pipe(
				map(invoices => {
					this.invoice = invoices.find(x => x.ID === this.invoiceID)
					this.invoicesLinks = this.invoice.PaymentLinks ?? []
					this.totalSumDutyDebtor = this.invoicesLinks.reduce(
						(acc, link) => acc + link.Shipment.DutyDebtor,
						0
					)
					this.onPageChange(1)
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
	}

	onPageChange(page: number) {
		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.invoicesLinksVisible = this.invoicesLinks.slice(startIndex, endIndex)
	}
}
