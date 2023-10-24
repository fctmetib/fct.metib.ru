import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { BackendErrorMessagesComponent } from 'src/app/shared/modules/backendErrorMessages/components/backendErrorMessages/backendErrorMessages.component';

@NgModule({
  imports: [CommonModule, MessagesModule, MessageModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
