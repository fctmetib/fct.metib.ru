import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from './message-item.component';
import { AvatarModule } from '../avatar/avatar.module';
import { SpacingModule } from '../spacing/spacing.module';
import { AttachedDocumentModule } from '../attached-document/attached-document.module';



@NgModule({
  declarations: [MessageItemComponent],
	imports: [
		CommonModule,
		AvatarModule,
		SpacingModule,
		AttachedDocumentModule
	],
  exports: [MessageItemComponent]
})
export class MessageItemModule { }
