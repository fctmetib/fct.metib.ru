import { ReportType } from './../../types/reports/report-type.class';
import { ReportService } from './../../services/report.service';
import { CryptoService } from './../../../../../shared/services/common/crypto.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportTypeInterface } from '../../types/reports/report-type.interface';
import { ReportColumntInterface } from '../../types/reports/report-column.interface';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss'],
})
export class ReportViewPageComponent implements OnInit {
  public isLoading: boolean = false;
  public isError: boolean = false;
  public reportConfig: ReportTypeInterface;
  public reportData: any[] = [];
  public search: string;

  public selectedRow: any;
  public items: MenuItem[];

  public sumCurrentPage: number;
  public sumAllPages: number;
  public selectedColumnIndex: number = 0;

  private data: any;
  private _selectedColumns: any[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.subscription$.add(this.route.queryParams.subscribe((params: Params) => {
      if (params['dt']) {
        this.data = JSON.parse(this.cryptoService.decrypt(params['dt']));
        this.prepareTable();
        this.fetchReport();
      } else {
        this.isError = true;
      }
    }));

    this.items = [
      {
        label: 'Посчитать сумму по текущей странице',
        icon: 'pi pi-money-bill',
        command: () => this._sumByCurrentPage(this.selectedRow),
      },
      {
        label: 'Посчитать сумму по всем страницам',
        icon: 'pi pi-money-bill',
        command: () => this._sumByAllPages(this.selectedRow),
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

  public exportExcel() {
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
    let selectedColumnName = this.reportConfig.columns[this.selectedColumnIndex].name;
    let currentColumns = this.reportConfig.columns.filter(x => x.visible === true);
    return currentColumns.indexOf(currentColumns.find(x => x.name === selectedColumnName));
  }

  @HostListener('document:contextmenu', ['$event'])
  public selectColumn($event) {
    if($event.target.id) {
      if(+$event.target.id) {
        if(this.reportConfig.columns[$event.target.id].type === 'number') {
          this.selectedColumnIndex = $event.target.id;
        }
      }
    }
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
      default:
        request.DateFrom = new Date(data.dateFrom);
        request.DateTo = new Date(data.dateTo);
        break;
    }

    this.subscription$.add(this.reportService.getReport(request).subscribe(
      (resp) => {
        this.reportData = resp;
        this.isLoading = false;
      }));
  }

  private _sumByAllPages(row: any) {
    this.sumAllPages = this.getDataForSum().reduce((prev, current) => prev + current, 0);
  }

  private _sumByCurrentPage(row: any) {
    console.log(row)
  }

  private getDataForSum(): number[] {
    let columnName = this.reportConfig.columns[this.selectedColumnIndex].name;
    let dataForSum = this.reportData.map(x => x[columnName]);
    return dataForSum;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
