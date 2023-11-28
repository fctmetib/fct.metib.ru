import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {RouterLink} from '@angular/router';
import {SpacingModule} from '../spacing/spacing.module';
import {MenuPointModule} from '../menu-point/menu-point.module';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RefIconModule,
    RouterLink,
    SpacingModule,
    MenuPointModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule {
}
