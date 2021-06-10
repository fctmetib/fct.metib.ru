import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../../shared/services/common/report.service';
import { DelayInterface } from '../types/delay.interface';

@Component({
  selector: 'app-delays-page',
  templateUrl: './delays-page.component.html',
  styleUrls: ['./delays-page.component.scss'],
})
export class DelaysPageComponent implements OnInit, OnDestroy {
  public isLoading: false;
  public reportData: DelayInterface[] = [];

  private _subscription$: Subscription = new Subscription();

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this._fetch();
  }

  public exportExcel(): void {
    import('xlsx').then((xlsx) => {
      let exportData: any[] = [];
      this.reportData.forEach((item) => {
        exportData.push(item);
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

  //#region private logic
  private _fetch(): void {
    const request = {
      Type: 'DebtorDelay',
      Title: 'Просрочки покупателя',
      Export: 'JSON',
      CustomerID: 0,
      Date: new Date(),
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
  //#endregion

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }
}
