import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RightIconDirective} from './right-icon.directive';


@NgModule({
  declarations: [
    RightIconDirective
  ],
  exports: [
    RightIconDirective
  ],
  imports: [
    CommonModule
  ]
})
export class RightIconModule {
}
