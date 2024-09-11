import {NgModule} from '@angular/core';
import {CodeInputComponent} from "./code-input.component";
import {InputEventDirective} from "./directives/input-event/input-event.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputModule} from '../input/input.module';

@NgModule({
  declarations: [
    CodeInputComponent,
    InputEventDirective
  ],
  imports: [
    CommonModule,
    InputModule,
    ReactiveFormsModule,
    InputModule
  ],
  exports: [
    CodeInputComponent
  ],
})
export class CodeInputModule {
}
