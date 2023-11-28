import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarComponent} from './avatar.component';
import {RefIconModule} from '../ref-icon/ref-icon.module';
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
    RefIconModule,
    ButtonModule
  ]
})
export class AvatarModule {
}
