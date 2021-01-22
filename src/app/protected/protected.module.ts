import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedLayoutComponent } from './../shared/layouts/protected-layout/protected-layout.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ProtectedLayoutComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class ProtectedModule { }
