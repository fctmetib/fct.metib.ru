import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable()
export class DatesService {
  constructor(
    private datePipe: DatePipe
  ) {
  }

  convertDatesInObjectToInput(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.map(item => this.convertDatesInObjectToInput(item));
      } else {
        const convertedObj: any = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            convertedObj[key] = this.convertDatesInObjectToInput(obj[key]);
          }
        }
        return convertedObj;
      }
    } else if (typeof obj === 'string' && obj.length <= 30) {
      // Проверяем, является ли строка валидной датой.
      const date = new Date(obj);
      if (!isNaN(date.getTime())) {
        // Если строка является валидной датой, форматируем её с помощью DatePipe.
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      } else {
        // Если строка не является валидной датой, возвращаем её без изменений.
        return obj;
      }
    } else {
      // Возвращаем оригинальное значение, если оно не является объектом или строкой.
      return obj;
    }
  }
}
