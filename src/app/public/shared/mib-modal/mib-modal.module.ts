import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MibModalComponent } from './mib-modal.component';
import { MibModalService } from './mib-modal.service';

@NgModule({
  imports: [CommonModule],
  exports: [MibModalComponent],
  declarations: [MibModalComponent],
  providers: [MibModalService],
})
export class MibModalModule { }
