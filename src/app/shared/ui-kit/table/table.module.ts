import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableHeadComponent} from './components/table-head/table-head.component';
import {TableRowComponent} from './components/table-row/table-row.component';
import {TableHeadCellComponent} from './components/table-head-cell/table-head-cell.component';
import {TableCellComponent} from './components/table-cell/table-cell.component';
import {TableComponent} from './table.component';
import {TableFooterComponent} from './components/table-footer/table-footer.component';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IconModule} from '../ref-icon/icon.module';
import {ClickOnElementModule} from '../../directives/click-on-element/click-on-element.module';

@NgModule({
  declarations: [
    TableHeadComponent,
    TableRowComponent,
    TableHeadCellComponent,
    TableCellComponent,
    TableComponent,
    TableFooterComponent,
  ],
  exports: [
    TableHeadComponent,
    TableRowComponent,
    TableHeadCellComponent,
    TableComponent,
    TableCellComponent,
    TableFooterComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule,
    IconModule,
    ClickOnElementModule
  ]
})
export class TableModule {
}
