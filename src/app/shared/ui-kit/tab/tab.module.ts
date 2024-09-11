import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabGroupComponent} from './components/tab-group/tab-group.component';
import {TabItemComponent} from './components/tab-item/tab-item.component';


@NgModule({
  declarations: [
    TabGroupComponent,
    TabItemComponent
  ],
  exports: [
    TabItemComponent,
    TabGroupComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class TabModule {
}
