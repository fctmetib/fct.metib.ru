import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPointComponent } from './dropdown-point.component';



@NgModule({
  declarations: [
    DropdownPointComponent
  ],
  exports: [
    DropdownPointComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DropdownPointModule { }
