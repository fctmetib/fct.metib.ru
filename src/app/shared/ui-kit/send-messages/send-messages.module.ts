import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessagesComponent } from './send-messages.component';
import { AttachedDocumentModule } from '../attached-document/attached-document.module';
import { InputModule } from '../input/input.module';
import { LabelModule } from '../../directives/label/label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpacingModule } from '../spacing/spacing.module';
import { IconModule } from '../ref-icon/icon.module';
import { LeftIconModule } from '../../directives/left-icon/left-icon.module';
import { LinkModule } from '../link/link.module';
import { ButtonModule } from '../button/button.module';
import { MibDragAndDropModule } from '../drag-and-drop/mib-drag-and-drop.module';
import { RightIconModule } from '../../directives/right-icon/right-icon.module';



@NgModule({
  declarations: [SendMessagesComponent],
  imports: [
    CommonModule,
    AttachedDocumentModule,
    InputModule,
    LabelModule,
    ReactiveFormsModule,
    SpacingModule,
    IconModule,
    LeftIconModule,
    LinkModule,
    ButtonModule,
    MibDragAndDropModule,
    RightIconModule
  ],
  exports: [SendMessagesComponent]
})
export class SendMessagesModule { }
