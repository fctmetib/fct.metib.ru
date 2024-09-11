import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import { MibTextareaDirective } from './directives/mib-textarea.directive';
import {IconModule} from '../ref-icon/icon.module';
import {InputModule} from '../input/input.module';



@NgModule({
  declarations: [
    TextareaComponent,
    MibTextareaDirective
  ],
  exports: [
    TextareaComponent,
    MibTextareaDirective
  ],
  imports: [
    CommonModule,
    IconModule,
    InputModule
  ]
})
export class TextareaModule { }
