import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TableDataService {
  constructor() {}

  public sortData<T>(data: T[], ascending: boolean, keyPath: string): T[] {
    return [...data].sort((a, b) => {
      const valueA = this.getValueByPath(a, keyPath);
      const valueB = this.getValueByPath(b, keyPath);

      if (valueA < valueB) {
        return ascending ? -1 : 1;
      } else if (valueA > valueB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }

  public sortDataByDate<T>(data: T[], ascending: boolean, datePath: string): T[] {
    return [...data].sort((a, b) => {
      const dateA = new Date(this.getValueByPath(a, datePath) as string);
      const dateB = new Date(this.getValueByPath(b, datePath) as string);

      if (dateA < dateB) {
        return ascending ? -1 : 1;
      } else if (dateA > dateB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }

  private getValueByPath<T>(obj: T, path: string): any {
    return path.split('.').reduce((acc, part) => acc && (acc as any)[part], obj);
  }


  public filterDataByDate<T>(data: T[], startDate: Date, endDate: Date, datePath: string): T[] {
    return data.filter(item => {
      const itemDateValue = this.getValueByPath(item, datePath);
      if (!itemDateValue) return false; // Проверяем наличие значения

      const itemDate = new Date(itemDateValue);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  }
}
