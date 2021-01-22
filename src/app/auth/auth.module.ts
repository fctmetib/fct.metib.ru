import { AuthLayoutComponent } from './../shared/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthLayoutComponent,
  ],
  providers: [],
})
export class AuthModule {}
