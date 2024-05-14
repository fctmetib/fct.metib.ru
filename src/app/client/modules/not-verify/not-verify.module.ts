import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotVerifyRoutingModule } from './not-verify-routing.module';
import { NotVerifyComponent } from './pages/not-verify/not-verify.component';


@NgModule({
  declarations: [
    NotVerifyComponent
  ],
  imports: [
    CommonModule,
    NotVerifyRoutingModule
  ]
})
export class NotVerifyModule { }
