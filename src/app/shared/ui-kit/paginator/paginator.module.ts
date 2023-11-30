import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorComponent} from './paginator.component';
import {ButtonModule} from '../button/button.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {PaginatorPointComponent} from './components/pagination-point/paginator-point.component';


@NgModule({
  declarations: [
    PaginatorComponent,
    PaginatorPointComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RefIconModule
  ]
})
export class PaginatorModule {
}
