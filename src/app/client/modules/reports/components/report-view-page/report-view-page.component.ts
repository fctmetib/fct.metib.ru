import { ReportType } from './../../types/reports/report-type.class';
import { ReportService } from 'src/app/shared/services/common/report.service';
import { CryptoService } from 'src/app/shared/services/common/crypto.service';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportTypeInterface } from '../../types/reports/report-type.interface';
import { ReportColumntInterface } from '../../types/reports/report-column.interface';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss'],
})
export class ReportViewPageComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dataTable: Table;

  public isLoading: boolean = false;
  public isError: boolean = false;
  public reportConfig: ReportTypeInterface;
  public reportData: any[] = [];
  public search: string;

  public filteredColumns: string[] = [];

  public selectedRow: any;
  public items: MenuItem[];

  public allPagesCount: number;
  public sumCurrentPage: number;
  public sumAllPages: number;

  public selectedColumnIndex: number;
  public selectedDisplay$: Subject<boolean> = new Subject();

  public currentPage: number = 0;
  public currentRows: number = 10;
  public currentFirst: number = 0;

  private data: any;
  private selectedColumn: any;
  private _selectedColumns: any[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportService: ReportService,
    private readonly cryptoService: CryptoService
  ) { }

  public ngOnInit(): void {
    this.subscription$.add(
      this.route
        .queryParams
        .subscribe((params: Params): void => {
          if (params['dt']) {
            this.data = JSON.parse(this.cryptoService.decrypt(params['dt']));
            this.prepareTable();
            this.fetchReport();
          } else {
            this.isError = true;
          }
        })
    );

    this.items = [
      {
        label: 'Посчитать сумму, по текущей странице',
        icon: 'pi pi-money-bill',
        command: () => this._sumByCurrentPage(),
      },
      {
        label: 'Посчитать сумму, по всем страницам',
        icon: 'pi pi-money-bill',
        command: () => this._sumByAllPages(),
      },
      {
        label: 'Посчитать количество строк, по текущей странице',
        icon: 'pi pi-list',
        command: () => this._getAllPagesCount(),
      },
      {
        label: 'Скрыть все',
        icon: 'pi pi-hide',
        command: () => this._hideAll(),
      },
    ];
  }

  public setFilterFields(): void {
    this.filteredColumns = this.reportConfig.columns.map(x => x.name);
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {

    this._selectedColumns = this.reportConfig
      .columns
      .filter(
        (col: ReportColumntInterface) => val.includes(col)
      );

    this.reportConfig
      .columns
      .forEach((item: any): boolean => item.visible = val.includes(item));
  }

  public exportExcel(): void {
    let exportData: any[] = [];
    this.reportData.forEach((item) => {
      let object: any = {};
      this.reportConfig.columns.forEach((column) => {
        object[column.title] = item[column.name];
      });
      exportData.push(object);
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    saveAs(
      new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      }),
      `отчет_export_${new Date().getTime()}.xlsx`
    );
  }

  public getColSpanIndex(): number {
    if (this.selectedColumnIndex) {
      let selectedColumnName =
        this.reportConfig.columns[this.selectedColumnIndex].name;
      let currentColumns = this.reportConfig.columns.filter(
        (x) => x.visible === true
      );
      return currentColumns.indexOf(
        currentColumns.find((x) => x.name === selectedColumnName)
      );
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  public selectColumn($event: any): void {
    if ($event.target.id && +$event.target.id) {
      this.selectedColumn = this.reportConfig.columns[$event.target.id];
      this.selectedColumnIndex = $event.target.id;
      this.selectedDisplay$.next(false);
    }
  }

  public paginate(event: any): void {
    let pageIndex = event.first / event.rows + 1;
    this.currentFirst = event.first;
    this.currentPage = pageIndex;
    this.currentRows = event.rows;
  }

  private prepareTable(): void {
    this.reportConfig = ReportType.getType(this.data.type);
    this.reportConfig.columns.forEach((column) => {
      if (column.visible) {
        this._selectedColumns.push(column);
      }
      this.setFilterFields();
    });
  }

  private fetchReport(): void {
    this.isLoading = true;
    let data = this.data;

    let request: any = {
      CustomerID: 0,
      DebtorID: data.debitor,
      Export: 'JSON',
      PayedAgreement: data?.payed ? true : false,
      Title: data.title,
      Type: data.type,
    };

    switch (data.type) {
      case 'OrderPostings':
        request.ID = data.numberOrder;
        break;
      case 'ReportProtocol':
        request.DateFrom = new Date(data.dateFrom);
        request.DateTo = new Date(data.dateTo);
        request.CreatedBy = data.selectReportDropdown;
        request.OnlyPayed = data.selectReportCheckbox;
        break;
      case 'AgregateDelivery':
        request.Date = new Date();
        break;
      case 'Agregate':
        request.ShipmentStatus = data.statusRequest;
        request.Date = data.onDate;
        break;
      case 'DebtorDelay':
        request.Delay = data.daysDelay;
        request.Date = data.onDate;
        break;
      case 'ExtractExternal':
        request.DateFrom = new Date(data.dateFrom);
        request.DateTo = new Date(data.dateTo);
        request.OrderNumber = data.numberOrder;
        request.RequestNumber = data.numberRequest;
        break;
      case 'PaymentsIncome':
        request.DateFrom = new Date(data.dateFrom);
        request.DateTo = new Date(data.dateTo);
      default:
        request.DateFrom = new Date(data.dateFrom);
        request.DateTo = new Date(data.dateTo);
        break;
    }

    this.subscription$.add(
      this.reportService.getReport(request).subscribe((resp: any[]) => {
        this.reportData = resp.sort((a, b) => {
          return new Date(b.DateShipment).getTime() - new Date(a.DateShipment).getTime();
        });
        this.isLoading = false;
      })
    );
  }

  private _getAllPagesCount(): void {
    this.allPagesCount = null;
    this.allPagesCount = this.getDataForPageSum().length;
  }

  private _sumByAllPages(): void {
    if (this.selectedColumn.type !== 'number') {
      return;
    }

    this.sumCurrentPage = null;
    this.sumAllPages = this.getDataForSum().reduce(
      (prev, current) => prev + current,
      0
    );
    this.selectedDisplay$.next(true);
  }

  private _sumByCurrentPage(): void {
    if (this.selectedColumn.type !== 'number') {
      return;
    }

    this.sumAllPages = null;
    this.sumCurrentPage = this.getDataForPageSum().reduce(
      (prev, current) => prev + current,
      0
    );
    this.selectedDisplay$.next(true);
  }

  private _hideAll(): void {
    this.selectedDisplay$.next(false);
    this.allPagesCount = null;
  }

  private getDataForPageSum(): number[] {
    let startIndex = this.currentFirst;
    let endIndex = startIndex + this.currentRows;

    let displayData = this.reportData.slice(startIndex, endIndex);
    let columnName = this.reportConfig.columns[this.selectedColumnIndex].name;

    return displayData.map((x) => x[columnName]);
  }

  private getDataForSum(): number[] {
    let columnName = this.reportConfig.columns[this.selectedColumnIndex].name;
    let dataForSum = this.reportData.map((x) => x[columnName]);
    return dataForSum;
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
