import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrawerComponent} from './drawer.component';
import { DrawerHeaderComponent } from './components/drawer-header/drawer-header.component';
import {ButtonModule} from '../button/button.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {SpacingModule} from '../spacing/spacing.module';


@NgModule({
  declarations: [
    DrawerComponent,
    DrawerHeaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RefIconModule,
    SpacingModule,
  ],
  exports: [
    DrawerComponent,
    DrawerHeaderComponent
  ]
})
export class DrawerModule {
}
