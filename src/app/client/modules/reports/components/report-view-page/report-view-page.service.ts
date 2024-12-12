import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RubPipe } from '../../../../../shared/pipes/rub/rub.pipe';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ReportViewPageService {

  private router = inject(Router);

  private tableSourceData: ReportNavigateWithTableData;
  private tablePreparedData: TablePreparedData;
  private rubPipe  = inject(RubPipe)
  private datePipe = inject(DatePipe)

  setupTable(tableSourceData: ReportNavigateWithTableData) {
    this.tableSourceData = tableSourceData;
    this.tablePreparedData = {
      tableName: tableSourceData.tableName,
      labels: this.getPreparedLabels(tableSourceData.config),
      rows: this.getPreparedRows(tableSourceData.config, tableSourceData.data)
    }
  }

  private getPreparedLabels(config: ReportViewTableConfig) {
    return Object.values(config).map(args => args[1]);
  }

  private getPreparedRows<T extends Array<Object>>(config: ReportViewTableConfig, data: T) {
    const rows: string[][] = []
    for (const object of data) {
      const row: string[] = []
      for (const key of Object.keys(config)) {
        const cellType = config[key][0];
        const cellValue = object[key];
        row.push(this.getFormattedRowValue(cellType, cellValue))
      }
      rows.push(row)
    }
    return rows
  }

  private getFormattedRowValue(cellType: ReportViewTableCellType, value: any): string {
    switch (cellType) {
      case 'currency':
        return this.rubPipe.transform(value)
      case 'date':
        return this.datePipe.transform(value, 'dd.MM.yyyy')
      case 'string':
        return value ? value.toString() : value
      default:
        return value ? value.toString() : value
    }
  }

  navigateAndSetupTable<T>(data: ReportNavigateWithTableData) {
    this.setupTable(data);
    this.navigate();
  }

  navigate() {
    return this.router.navigate(['/client/reports/report-view']);
  }

  getPreparedTableData() {
    return this.tablePreparedData;
  }

  isTableExist() {
    return Boolean(this.tableSourceData)
  }

  isTableDataExist() {
    return Boolean(this.tableSourceData.data.length)
  }

}


export type ReportViewTableCellType = 'string' | 'currency' | 'date';
export type ReportViewTableConfig = { [key: string]: [ReportViewTableCellType, string]; };

export interface ReportNavigateWithTableData<T = any[]> {
  tableName: string
  reportType: string;
  config: ReportViewTableConfig;
  data: T[];
}

export interface TablePreparedData {
  tableName: string
  labels: string[];
  rows: string[][];
}
