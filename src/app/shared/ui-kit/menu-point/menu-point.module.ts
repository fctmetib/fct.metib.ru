import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPointComponent } from './menu-point.component';
import {RouterLink, RouterLinkActive} from '@angular/router';



@NgModule({
    declarations: [
        MenuPointComponent
    ],
    exports: [
        MenuPointComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class MenuPointModule { }
