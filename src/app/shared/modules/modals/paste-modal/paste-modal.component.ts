import {Component, HostListener} from '@angular/core';
import {DialogRef} from '@angular/cdk/dialog';
import {ShipmentReq} from '../../../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'mib-paste-modal',
  templateUrl: './paste-modal.component.html',
  styleUrls: ['./paste-modal.component.scss']
})
export class PasteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<PasteModalComponent>
  ) {
  }

  parseDate(dateStr: string): Date {
    const parts = dateStr.split('.'); // Разделяем строку по точке
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Переформатируем в YYYY-MM-DD
  }

  parseClipboardData(clipboardData: string): ShipmentReq[] {
    // Разделяем строки по символу новой строки, затем каждую строку по табуляции
    const lines = clipboardData.trim().split('\n').map(line => line.split('\t'));

    // Предполагаем, что первая строка содержит заголовки
    const headers = lines.shift();

    // Сопоставляем данные с заголовками и преобразуем их в объекты
    return lines.map(line => {
      const obj: any = {};
      line.forEach((value, index) => {
        const key = headers[index];
        // Здесь ты должен сопоставить заголовки с ключами интерфейса ShipmentReq
        // Например, если заголовок 'Накладная' соответствует 'InvoiceNumber' в интерфейсе
        switch (key) {
          case 'Накладная':
            obj.WaybillNumber = value;
            break;
          case 'Дата накладной':
            obj.WaybillDate = this.parseDate(value)
            break;
          case 'С/ф №':
            obj.InvoiceNumber = value;
            break;
          case 'Дата с/ф':
            obj.InvoiceDate = this.parseDate(value)
            break;
          case 'Дата поставки':
            obj.DateShipment = this.parseDate(value)
            break;
          case 'Сумма':
            obj.Summ = parseFloat(value.replace(',', '.'));
            break;
        }
        // Добавь сюда логику преобразования для остальных ключей и заголовков
      });
      // Преобразование типов данных для дат и чисел
      obj.InvoiceDate = new Date(obj.InvoiceDate);
      obj.WaybillDate = new Date(obj.WaybillDate);
      obj.DateShipment = new Date(obj.DateShipment);
      // obj.DatePayment = new Date(obj.DatePayment);
      obj.Summ = parseFloat(obj.Summ);
      // obj.SummToFactor = parseFloat(obj.SummToFactor);
      return obj;
    });
  }

  // Это обработчик события вставки
  @HostListener('window:paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pasteContent = clipboardData.getData('text');
      this.dialogRef.close(this.parseClipboardData(pasteContent))
    }
  }


}
