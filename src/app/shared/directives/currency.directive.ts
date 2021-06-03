import { CurrencyPipe } from '@angular/common';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[currency]',
  host: {
    '(input)': 'onChange($event)'
  }
})
export class CurrencyDirective {
  @Input('currency') field;

  constructor(private currencyPipe : CurrencyPipe) {
  }

  onChange($event) {
    $event.target.value = this.transformAmount($event.target.value);
  }

  transformAmount(value){
    return this.currencyPipe.transform(value, '$');
}
}
