import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import {RefIconModule} from '../ref-icon/ref-icon.module';



@NgModule({
  declarations: [
    InformationComponent
  ],
  exports: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    RefIconModule
  ]
})
export class InformationModule { }
