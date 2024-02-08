import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, map, tap} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {InvoiceDrawer} from './interfaces/invoice-drawer.interface'
import {ClientInvoice} from '../../interfaces/client.invoice'
import {InvoicesService} from '../../services/invoices.service'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {BankDetailsData} from '../../../../../shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface';

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

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '28px'
	}

	public skeletonDate: Properties = {
		...this.skeletonWithoutUnderline,
		height: '40px'
	}

	public skeletonTextarea: Properties = {
		...this.skeletonWithoutUnderline,
		height: '64px'
	}

	public skeletonTabGroup: Properties = {
		...this.skeletonWithoutUnderline,
		height: '271px'
	}

	public skeletonTable: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public inputSize: InputSize = 'l'
  public invoiceID: number
  public currentInvoice: ClientInvoice

  get beneficiaryRequisites(): BankDetailsData {
    return {
      paymentParticipant: this.currentInvoice.Beneficiary,
      closeDate: this.currentInvoice.Date,
      openDate: this.currentInvoice.Date,
    }
  }

  get payerRequisites(): BankDetailsData {
    return {
      paymentParticipant: this.currentInvoice.Payer,
      closeDate: this.currentInvoice.Date,
      openDate: this.currentInvoice.Date,
    }
  }

	datas = 1000000

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<InvoiceDrawer>,
		public dialogRef: MatDialogRef<InvoiceDrawerComponent>,
		private invoicesService: InvoicesService
	) {}

	getCurrentInvoice() {
		this.loading$.next(true)
		this.invoiceID = this.data?.data?.invoiceId
		this.invoicesService
			.getInvoices()
			.pipe(
				map(invoice => {
					this.currentInvoice = invoice.find(i => i.ID !== this.invoiceID)
					console.log('currentInvoice :>> ', this.currentInvoice)
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}

	ngOnInit(): void {
		console.log('invoiceID :>> ', this.invoiceID)
		this.getCurrentInvoice()
	}
}
