import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { AdminGuard } from '../shared/services/admin.guard';

import { AuthGuard } from '../shared/services/auth.guard';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { MobileHeaderComponent } from './shared/mobile-header/mobile-header.component';
import { AdminAuthInterceptor } from './shared/services/admin-auth.interceptor';
import { PageStoreService } from './shared/services/page-store.service';

const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'cabinet',
        loadChildren: () =>
          import('./modules/cabinet/cabinet.module').then(
            (m) => m.CabinetModule
          ),
      },
      {
        path: 'organizations',
        loadChildren: () =>
          import('./modules/organizations/organizations.module').then(
            (m) => m.OrganizationsModule
          ),
      },
      {
        path: 'tests',
        loadChildren: () =>
          import('./modules/tests/tests.module').then((m) => m.TestsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    MenuModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    // Layout
    AdminComponent,
    HeaderComponent,
    MobileHeaderComponent,
  ],
  providers: [
    PageStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule {}
