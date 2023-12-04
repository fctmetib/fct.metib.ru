import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WINDOW} from './tokens/window.token';

export function windowFactory() {
  return typeof window !== 'undefined' ? window : null;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{ provide: WINDOW, useFactory: windowFactory }]
})
export class MibCoreModule {
}
