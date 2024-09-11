import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarComponent} from './avatar.component';
import {IconModule} from '../ref-icon/icon.module';
import {ButtonModule} from '../button/button.module';


@NgModule({
  declarations: [
    AvatarComponent
  ],
  exports: [
    AvatarComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule
  ]
})
export class AvatarModule {
}
