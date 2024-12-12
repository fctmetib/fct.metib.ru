import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Properties} from 'csstype'
import { BehaviorSubject, debounceTime, finalize, Subscription, tap } from 'rxjs';
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {NewDelaysDrawerService} from '../../modules/new-delays-drawer/new-delays-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {NewDelaysPageModalComponent} from 'src/app/shared/modules/modals/new-delays-page-modal/new-delays-page-modal.component'
import {
  IDataByAggregate,
  ReportService
} from '../../../../../shared/services/common/report.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'mib-new-delays',
	templateUrl: './new-delays.component.html',
	styleUrls: ['./new-delays.component.scss']
})
export class NewDelaysComponent implements OnInit, OnDestroy {
	@ViewChild(TableComponent) table: TableComponent

	loading$ = new BehaviorSubject<boolean>(false)

	skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

  public PAGINATOR_ITEMS_PER_PAGE = 10
  public PAGINATOR_PAGE_TO_SHOW = 5
  public currentPage$ = new BehaviorSubject<number>(1)

	todayIs: Date = new Date()
  mData: IDataByAggregate[] = []
  mFilteredData: IDataByAggregate[] = []
  mDataVisible: IDataByAggregate[] = []
  dutyCustomerSum = 0;

	isDesktop: boolean = false
	private subscriptions = new Subscription()
	currentIndex: number = 0
	headers = [
		'Накладная',
		'Дата накладной',
		'Договор поставки',
		'Сумма поставки',
		'Дата платежа',
		'Сумма просрочки',
		'Дата доп'
	]

	dataMap = {
		0: 'Doc',
		1: 'Date',
		2: {Payer: 'Date'},
		3: 'Amount',
		4: 'Date',
		5: 'Amount',
		6: {Payer: 'Title'}
	}

	showTotal: boolean = false
  searchControl = new FormControl('');

  toolsService = inject(ToolsService)
  breakpointService = inject(BreakpointObserverService)
  private reportService = inject(ReportService)
  private newDelaysDrawerService = inject(NewDelaysDrawerService)
  private rubPipe = inject(RubPipe)
  private datePipe = inject(DatePipe)
  private dialog = inject(MatDialog)

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

    this.loading$.next(true)

    this.reportService.debtorDelay({}).pipe(
      tap(data => {
        this.mData = this.mFilteredData = data;
        this.filterData(); // Фильтруем изначально (если есть значения)
        this.onPageChange(this.currentPage$.value);
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe();

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      tap(() => {
        this.filterData();
        this.onPageChange(1); // При поиске показываем первую страницу
      })
    ).subscribe();
	}

  filterData() {
    const searchValue = this.searchControl.value?.toLowerCase() || '';

    // Фильтрация данных
    this.mFilteredData = this.mData.filter(item => item.CustomerTitle?.toLowerCase().includes(searchValue)
    );
  }

  changePage(page: number) {
    this.currentPage$.next(page);

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE;
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE;

    this.table.deselect();

    // Берём видимые данные после фильтрации
    this.mDataVisible = this.mFilteredData.slice(
      startIndex,
      endIndex
    );
  }

  onPageChange(page: number) {
    this.changePage(page);
    this.calculateVisibleDuty()
  }

  calculateVisibleDuty() {
    this.dutyCustomerSum = 0
    for (let iDataByAggregate of this.mDataVisible) {
      this.dutyCustomerSum+=iDataByAggregate.DutyCustomer
    }
  }

	contractDrawer(deliveryID: number) {
		this.newDelaysDrawerService
			.open({
				data: {deliveryID}
			})
			.afterClosed()
			.pipe
			// filter(Boolean),
			()
			.subscribe()
	}

	getVisibleHeader() {
		this.showTotal = false
		if (this.headers[this.currentIndex] === 'Сумма просрочки') {
			this.showTotal = true
			return this.headers[this.currentIndex]
		}
		return this.headers[this.currentIndex]
	}

	getVisibleCell(row: any) {
		const result = {}
		for (const [newKey, path] of Object.entries(this.dataMap)) {
			let value

			if (typeof path === 'string') {
				// Если путь - строка, извлекаем значение напрямую
				value = row[path]
			} else if (typeof path === 'object') {
				// Если путь - объект, извлекаем вложенное значение
				const [parentKey, childKey] = Object.entries(path)[0]
				value = row[parentKey] ? row[parentKey][childKey] : undefined
				if (childKey === 'Date' && value !== undefined) {
					value = this.datePipe.transform(value, 'dd.MM.yyyy')
				}
			}
			// Проверка и добавление префиксов
			if (path === 'Amount' && value !== undefined) {
				value = this.rubPipe.transform(value)
			} else if (path === 'Date' && value !== undefined) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			}
			result[newKey] = value
		}
		return result[this.currentIndex]
	}

	prev() {
		if (this.currentIndex > 0) {
			this.currentIndex--
		}
	}

	next() {
		if (this.currentIndex < this.headers.length - 1) {
			this.currentIndex++
		}
	}

	openInvoicePageModal(duty) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'custom-dialog-delays',
			data: {duty}
		}

		this.dialog.open(NewDelaysPageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
