import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import {IconModule} from '../ref-icon/icon.module';



@NgModule({
  declarations: [
    InformationComponent
  ],
  exports: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class InformationModule { }
