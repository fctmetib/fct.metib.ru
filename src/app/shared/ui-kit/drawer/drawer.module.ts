import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrawerComponent} from './drawer.component';
import { DrawerHeaderComponent } from './components/drawer-header/drawer-header.component';
import {ButtonModule} from '../button/button.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {SpacingModule} from '../spacing/spacing.module';
import { DrawerFooterComponent } from './components/drawer-footer/drawer-footer.component';


@NgModule({
  declarations: [
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerFooterComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RefIconModule,
    SpacingModule,
  ],
    exports: [
        DrawerComponent,
        DrawerHeaderComponent,
        DrawerFooterComponent
    ]
})
export class DrawerModule {
}
