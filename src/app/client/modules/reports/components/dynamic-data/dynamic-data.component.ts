import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RubPipe } from '../../../../../shared/pipes/rub/rub.pipe';
import { NgxMaskPipe } from 'ngx-mask';

export interface DataField {
  label: string;
  key: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'phone' | 'array' | 'object';
  nestedFields?: DataField[];
}

@Component({
  selector: 'mib-dynamic-data',
  templateUrl: './dynamic-data.component.html',
  styleUrls: ['./dynamic-data.component.scss'],
  imports: [CommonModule],
  providers: [NgxMaskPipe, RubPipe],
  standalone: true
})
export class DynamicDataComponent {
  @Input() config: DataField[] = [];
  @Input() data: any = {};

  private date = inject(DatePipe)
  private rub = inject(RubPipe)
  private mask = inject(NgxMaskPipe)

  formatValue(value: any, field: DataField): string {
    if (value === null || value === undefined) return '-';

    switch (field.type) {
      case 'date':
        // Форматирование даты
        return this.date.transform(value, 'yyyy-MM-dd') || '-';
      case 'boolean':
        // Логическое значение
        return value ? 'Да' : 'Нет';
      case 'number':
        // Числовое значение
        return new Intl.NumberFormat().format(value);
      case 'currency':
        // Валюта
        return this.rub.transform(value);
      case 'phone':
        // Телефон
        return this.mask.transform(value, '+0 (000) 000-00-00');
      case 'array':
        // Массив
        if (Array.isArray(value)) {
          return value
            .map(item => this.formatNestedObject(item, field.nestedFields || []))
            .join('; ');
        }
        return '-';
      case 'object':
        // Вложенный объект
        return this.formatNestedObject(value, field.nestedFields || []);
      default:
        // Текстовое значение
        return value;
    }
  }

  /**
   * Рекурсивное форматирование вложенного объекта.
   */
  formatNestedObject(obj: any, fields: DataField[]): string {
    return fields
      .map(field => {
        const nestedValue = this.getNestedValue(obj, field.key);
        return `${field.label}: ${this.formatValue(nestedValue, field)}`;
      })
      .join(', ');
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : null), obj);
  }

  /**
   * Вычисляет отступ для поля на основе глубины вложенности.
   */
  getIndent(field: DataField): number {
    // Количество точек в ключе определяет уровень вложенности
    const depth = (field.key.match(/\./g) || []).length;
    return depth * 20; // 20px на каждый уровень вложенности
  }

  /**
   * Получает элементы массива для поля типа 'array'.
   */
  getArrayItems(data: any, field: DataField): any[] {
    const value = this.getNestedValue(data, field.key);
    return Array.isArray(value) ? value : [];
  }
}
