import { ReportType } from './../../types/reports/report-type.class';
import { ReportService } from './../../services/report.service';
import { CryptoService } from './../../../../../shared/services/common/crypto.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportTypeInterface } from '../../types/reports/report-type.interface';
import { ReportColumntInterface } from '../../types/reports/report-column.interface';

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
  // public selectedColumns: any[] = [];
  _selectedColumns: any[] = [];

  private data: any;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['dt']) {
        this.data = JSON.parse(this.cryptoService.decrypt(params['dt']));
        this.prepareTable();
        this.fetchReport();
      } else {
        this.isError = true;
      }
    });
  }

  public onSearch(value) {
    console.log(value);
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.reportConfig.columns.filter((col: ReportColumntInterface) => val.includes(col));
    this.reportConfig.columns.forEach(item => {
      if(val.includes(item)) {
        item.visible = true;
      }
      else {
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
    this.reportConfig.columns.forEach(column => {
      if(column.visible) {
        this._selectedColumns.push(column);
        console.log('COLUMNS', this._selectedColumns);
      }
    })

    console.log(this.reportConfig);
  }

  private fetchReport(): void {
    this.isLoading = true;
    let data = this.data;
    console.log('DATATA', data);

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

    this.reportService.getReport(request).subscribe((resp) => {
      this.reportData = resp;
      this.isLoading = false;
    });
  }
}
