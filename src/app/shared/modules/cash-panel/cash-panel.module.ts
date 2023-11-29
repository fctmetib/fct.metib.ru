import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashPanelComponent } from './cash-panel.component';
import {RefIconModule} from '../../ui-kit/ref-icon/ref-icon.module';
import {SpacingModule} from '../../ui-kit/spacing/spacing.module';
import {LinkModule} from '../../ui-kit/link/link.module';



@NgModule({
  declarations: [
    CashPanelComponent
  ],
  exports: [
    CashPanelComponent
  ],
    imports: [
        CommonModule,
        RefIconModule,
        SpacingModule,
        LinkModule
    ]
})
export class CashPanelModule { }
