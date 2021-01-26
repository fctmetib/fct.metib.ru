import { SuccessMessagesComponent } from './components/successMessages/successMessages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [CommonModule, MessagesModule, MessageModule],
  declarations: [SuccessMessagesComponent],
  exports: [SuccessMessagesComponent],
})
export class SuccessMessagesModule {}
