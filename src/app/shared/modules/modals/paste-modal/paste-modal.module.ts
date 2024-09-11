import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasteModalComponent} from './paste-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from '../../../ui-kit/modal/modal.module';
import {SpacingModule} from '../../../ui-kit/spacing/spacing.module';
import {MibDragAndDropModule} from '../../../ui-kit/drag-and-drop/mib-drag-and-drop.module';
import {ButtonModule} from '../../../ui-kit/button/button.module';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ModalModule,
    SpacingModule,
    MibDragAndDropModule,
    ButtonModule
  ],
  declarations: [
    PasteModalComponent
  ]
})
export class PasteModalModule {
}
