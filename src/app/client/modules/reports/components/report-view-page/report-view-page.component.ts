import { ReportType } from './../../types/reports/report-type.class';
import { ReportService } from './../../services/report.service';
import { CryptoService } from './../../../../../shared/services/common/crypto.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportTypeInterface } from '../../types/reports/report-type.interface';
import { ReportColumntInterface } from '../../types/reports/report-column.interface';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss'],
})
export class ReportViewPageComponent implements OnInit {
  @ViewChild('dt') dataTable: Table;

  public isLoading: boolean = false;
  public isError: boolean = false;
  public reportConfig: ReportTypeInterface;
  public reportData: any[] = [];
  public search: string;

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
    private route: ActivatedRoute,
    private reportService: ReportService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
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

  public onSearch(value) {
    console.log(value);
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.reportConfig.columns.filter(
      (col: ReportColumntInterface) => val.includes(col)
    );
    this.reportConfig.columns.forEach((item) => {
      if (val.includes(item)) {
        item.visible = true;
      } else {
        item.visible = false;
      }
    });
  }

  public exportExcel(): void {
    import('xlsx').then((xlsx) => {
      let exportData: any[] = [];
      this.reportData.forEach((item) => {
        let object: any = {};
        this.reportConfig.columns.forEach((column) => {
          if (column.visible) {
            object[column.title] = item[column.name];
          }
        });
        exportData.push(object);
      });

      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'отчет');
    });
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
  public selectColumn($event): void {
    if ($event.target.id) {
      if (+$event.target.id) {
        //  if (this.reportConfig.columns[$event.target.id].type === 'number') {
        this.selectedColumn = this.reportConfig.columns[$event.target.id];
        this.selectedColumnIndex = $event.target.id;
        this.selectedDisplay$.next(false);
        //   }
      }
    }
  }

  public paginate(event): void {
    let pageIndex = event.first / event.rows + 1;
    this.currentFirst = event.first;
    this.currentPage = pageIndex;
    this.currentRows = event.rows;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  private prepareTable(): void {
    this.reportConfig = ReportType.getType(this.data.type);
    console.log(this.reportConfig)
    console.log(this.data.type)
    this.reportConfig.columns.forEach((column) => {
      if (column.visible) {
        this._selectedColumns.push(column);
      }
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
      this.reportService.getReport(request).subscribe((resp) => {
        this.reportData = resp;
        this.isLoading = false;
      })
    );
  }

  private _getAllPagesCount() {
    this.allPagesCount = null;
    this.allPagesCount = this.getDataForPageSum().length;
  }

  private _sumByAllPages() {
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

  private _sumByCurrentPage() {
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

  private _hideAll() {
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

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
