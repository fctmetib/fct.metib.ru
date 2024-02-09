import {Component, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, merge, switchMap, tap} from 'rxjs'
import {InvoicesReq, InvoicesService} from '../../services/invoices.service'
import {ClientInvoice} from '../../interfaces/client.invoice'
import {InvoiceDrawerService} from '../../modules/invoice-drawer/invoice-drawer.service'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {FormControl} from '@angular/forms'
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';

@Component({
  selector: 'mib-invoices-page',
  templateUrl: './invoices-page.component.html',
  styleUrls: ['./invoices-page.component.scss'],
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
  public currentPage$ = new BehaviorSubject<number>(1)

  public selectedRequestCount: number = 0
  public severalRequestsChecked: boolean = false

  public invoices: ClientInvoice[] = []
  public invoicesVisible: ClientInvoice[] = []

  public dateFrom = new FormControl<string>('')
  public dateTo = new FormControl<string>('')

  constructor(
    public invoicesService: InvoicesService,
    private invoiceDrawerService: InvoiceDrawerService,
    public datesService: DatesService,
    public toolsService: ToolsService,
    private au: AutoUnsubscribeService
  ) {
  }

  ngOnInit(): void {
    this.watchForms()

    const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
      dateFrom: this.toolsService
        .subtractFromDate(new Date(), {days: 7})
        .toISOString(),
      dateTo: new Date().toISOString()
    })
    this.dateFrom.setValue(dateFrom, {emitEvent: false})
    this.dateTo.setValue(dateTo)

    this.loadInvoicesData().subscribe();
  }

  loadInvoicesData() {
    const req: InvoicesReq = {
    }

    const setOptionalDate = (date: string, key: string) => {
      if (date) req[key] = new Date(date).toISOString()
    }

    setOptionalDate(this.dateFrom.value, 'dateFrom')
    setOptionalDate(this.dateTo.value, 'dateTo')

    this.loading$.next(true)
    return this.invoicesService.getInvoices(req).pipe(
      tap(data => {
        this.invoices = data
      }),
      finalize(() => this.loading$.next(false))
    )
  }

  openDrawer(invoiceId: number) {
    this.invoiceDrawerService.open({
      data: {invoiceId: invoiceId}
    })
  }

  onPageChange(page: number) {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    this.invoicesVisible = this.invoices.slice(startIndex, endIndex)
  }


  private watchForms() {
    merge(this.dateFrom.valueChanges, this.dateTo.valueChanges)
      .pipe(
        switchMap(() => this.loadInvoicesData()),
        tap(() => {
          this.onPageChange(1)
        }),
        takeUntil(this.au.destroyer)
      ).subscribe()
  }
}
