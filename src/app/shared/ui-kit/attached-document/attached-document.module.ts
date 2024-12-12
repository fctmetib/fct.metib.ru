import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedDocumentComponent } from './attached-document.component';
import { SpacingModule } from '../spacing/spacing.module';
import { IconModule } from '../ref-icon/icon.module';
import { LeftIconModule } from '../../directives/left-icon/left-icon.module';
import { ButtonModule } from '../button/button.module';
import { LoaderSpinnerModule } from '../loader-spinner/loader-spinner.module';



@NgModule({
  declarations: [AttachedDocumentComponent],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule,
    LeftIconModule,
    ButtonModule,
    LoaderSpinnerModule
  ],
  exports: [AttachedDocumentComponent]
})
export class AttachedDocumentModule { }
