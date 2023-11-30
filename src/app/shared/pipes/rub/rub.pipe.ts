import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rub'
})
export class RubPipe implements PipeTransform {
  transform(value: number): string {
    const formattedValue = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
    return formattedValue.replace('₽', 'руб.'); // Заменяем символ валюты (₽) на текст "руб"
  }
}
