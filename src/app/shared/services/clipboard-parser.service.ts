import { Injectable } from '@angular/core';

export type ClipboardParserHeaders<T> = [string, keyof T, any][]

@Injectable({
  providedIn: 'root'
})
export class ClipboardParserService {

  constructor() { }

  parseClipboardData<T>(clipboardData: string, headersMap: ClipboardParserHeaders<T> ): T[] {
    const lines = clipboardData.trim().split('\n').map(line => line.split('\t'));
    const headers = lines.shift();
    return lines.map(line => {
      const obj: any = {};
      line.forEach((value, index) => {
        const key = headers[index];
        const item = headersMap.find(arr => arr[0] === key)
        if (item !== undefined) {
          switch (item[2]) {
            case Number:
              console.log('Number', value)
              return obj[item[1]] = Number(value);
            case Date:
              console.log('Date', value)
              return obj[item[1]] = this.parseDate(value)
            default:
              console.log('default', value)
              return obj[item[1]] = value
          }
        }
      });
      return obj as T;
    });
  }

  private parseDate(dateStr: string): Date {
    const parts = dateStr.split('.');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }
}
