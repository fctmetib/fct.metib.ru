import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickOnElementDirective} from "./click-on-element.directive";

@NgModule({
  declarations: [
    ClickOnElementDirective
  ],
  exports: [
    ClickOnElementDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ClickOnElementModule {
}
