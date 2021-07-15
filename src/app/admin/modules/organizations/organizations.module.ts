import { CommonModule } from '@angular/common';
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
import { CardRowComponent } from '../../shared/components/cards/card-row/card-organization-row/card-organization-row.component';
import { PageStoreService } from '../../shared/services/page-store.service';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { OrganizationService } from './services/organization.service';

const routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        component: OrganizationsComponent,
      },
      {
        path: '/:id',
        component: OrganizationComponent
      }
    ],
  },
];

@NgModule({
  imports: [
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
    OrganizationsComponent,
    OrganizationComponent,
    // Layout
    CardRowComponent
  ],
  providers: [
    PageStoreService,
    OrganizationService
  ],
})
export class OrganizationsModule {}
