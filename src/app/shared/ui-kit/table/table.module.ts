import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableHeadCellComponent } from './components/table-head-cell/table-head-cell.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableComponent } from './table.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';



@NgModule({
    declarations: [
        TableHeadComponent,
        TableRowComponent,
        TableHeadCellComponent,
        TableCellComponent,
        TableComponent,
        TableFooterComponent
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
        CommonModule
    ]
})
export class TableModule { }
