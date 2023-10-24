import { MibTabComponent } from './mib-tab/mib-tab.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MibTabBodyComponent } from './mib-tab-body/mib-tab-body.component';
import { MibTabItemComponent } from './mib-tab-item/mib-tab-item.component';
import { MibTabLabelComponent } from './mib-tab-label/mib-tab-label.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    MibTabComponent,
    MibTabBodyComponent,
    MibTabItemComponent,
    MibTabLabelComponent
  ],
  declarations: [
    MibTabComponent,
    MibTabBodyComponent,
    MibTabItemComponent,
    MibTabLabelComponent
  ],
  providers: [],
})
export class MibTabModule { }
