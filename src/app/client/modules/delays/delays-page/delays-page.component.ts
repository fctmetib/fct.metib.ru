import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../../shared/services/common/report.service';
import { ReportColumntInterface } from '../../reports/types/reports/report-column.interface';
import { DelayInterface } from '../types/delay.interface';

@Component({
  selector: 'app-delays-page',
  templateUrl: './delays-page.component.html',
  styleUrls: ['./delays-page.component.scss'],
  providers: [DatePipe],
})
export class DelaysPageComponent implements OnInit, OnDestroy {
  public isLoading: false;
  public reportData: DelayInterface[] = [];

  private columns: ReportColumntInterface[] = []
  private _subscription$: Subscription = new Subscription();

  public filterDialog: boolean = false;
  public filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private reportService: ReportService) {}

  ngOnInit() {
    this._initializeForm();
    this._initValues();
    this._fetch();
  }

  public exportExcel(): void {
    import('xlsx').then((xlsx) => {
      let exportData: any[] = [];
      this.reportData.forEach((item) => {
        let object: any = {};
        this.columns.forEach((column) => {
            object[column.title] = item[column.name];
        });
        exportData.push(object);
      });

      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this._saveAsExcelFile(excelBuffer, 'отчет');
    });
  }

  public openDateModal() {
    this.filterDialog = true;
  }

  public checkDateAddon(date: Date): boolean {
    if (new Date(date) > new Date(this.filterForm.value.dateTo))
      return true;

    return false;
  }

  //#region private logic
  private _fetch(): void {
    const request = {
      Type: 'DebtorDelay',
      Title: 'Просрочки покупателя',
      Export: 'JSON',
      CustomerID: 0,
      Date: new Date(this.filterForm.value.dateTo),
      DebtorID: 0,
      Delay: 1,
    };
    this._subscription$.add(
      this.reportService.getReport(request).subscribe((resp) => {
        this.reportData = resp;
        this.isLoading = false;
      })
    );
  }

  private _saveAsExcelFile(buffer: any, fileName: string): void {
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

  private _initValues() {
    this.columns = [
      {
        name: 'ShipmentID',
        title: 'ID поставки',
        type: 'string',
        visible: true
      },
      {
        name: 'CustomerTitle',
        title: 'Название клиента',
        type: 'string',
        visible: true
      },
      {
        name: 'DebtorTitle',
        title: 'Покупатель',
        type: 'string',
        visible: true
      },
      {
        name: 'ContractDeliveryNumber',
        title: 'Договор поставки',
        type: 'string',
        visible: true
      },
      {
        name: 'RequestDate',
        title: 'Дата запроса',
        type: 'string',
        visible: true
      },
      {
        name: 'RequestNumber',
        title: 'Номер запроса',
        type: 'string',
        visible: true
      },
      {
        name: 'ShipmentFullTitle',
        title: 'Накладная',
        type: 'string',
        visible: true
      },
      {
        name: 'StatusTitle',
        title: 'Статус',
        type: 'string',
        visible: true
      },
      {
        name: 'CurrencyTitle',
        title: 'Валюта',
        type: 'string',
        visible: true
      },
      {
        name: 'ShipmentSumm',
        title: 'Сумма отгрузки',
        type: 'string',
        visible: true
      },
      {
        name: 'DutyDebtor',
        title: 'Сумма просрочки',
        type: 'string',
        visible: true
      },
      {
        name: 'DutyCustomer',
        title: 'Сумма клиента',
        type: 'string',
        visible: true
      },
      {
        name: 'DutyCommission',
        title: 'Сумма комиссии',
        type: 'string',
        visible: true
      },
      {
        name: 'DateShipment',
        title: 'Дата поставки',
        type: 'string',
        visible: true
      },
      {
        name: 'DatePayment',
        title: 'Дата оплаты',
        type: 'string',
        visible: true
      },
      {
        name: 'DateOpen',
        title: 'Дата открытия',
        type: 'string',
        visible: true
      },
      {
        name: 'DatePayed',
        title: 'Дата оплачено',
        type: 'string',
        visible: true
      },
      {
        name: 'DateAddon',
        title: 'Дата доп',
        type: 'string',
        visible: true
      },
      {
        name: 'RateStandart',
        title: 'Rate Standart',
        type: 'string',
        visible: true
      },
      {
        name: 'RateExtra',
        title: 'Rate Extra',
        type: 'string',
        visible: true
      },
      {
        name: 'CommissionPercent',
        title: 'Commission Percent',
        type: 'string',
        visible: true
      },
      {
        name: 'PenyPercent',
        title: 'Peny Percent',
        type: 'string',
        visible: true
      },
      {
        name: 'CommissionBottomBorder',
        title: 'Commission Bottom Border',
        type: 'string',
        visible: true
      },
      {
        name: 'CommissionTopBorder',
        title: 'Commission Top Border',
        type: 'string',
        visible: true
      },
      {
        name: 'RegionTitle',
        title: 'Название региона',
        type: 'string',
        visible: true
      },
      {
        name: 'ProductCodeTitle',
        title: 'Product Code Title',
        type: 'string',
        visible: true
      }
    ]
  }

  private _initializeForm() {
    let to = new Date();

    this.filterForm = this.fb.group({
      dateTo: [
        this.datepipe.transform(to, 'yyyy-MM-dd'),
        [Validators.required],
      ],
    });
  }

  //#endregion

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }
}
