import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RubPipe} from "./rub.pipe";


@NgModule({
  declarations: [
    RubPipe
  ],
  exports: [
    RubPipe
  ],
  imports: [
    CommonModule
  ]
})
export class RubModule {
}
