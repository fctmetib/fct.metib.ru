import { NewsService } from './../../shared/services/news.service';
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
import { CardNewsComponent } from '../../shared/components/cards/card-news/card-news.component';
import { PageStoreService } from '../../shared/services/page-store.service';
import { CabinetComponent } from './components/cabinet/cabinet.component';

const routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        component: CabinetComponent,
      },
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
    CabinetComponent,
    // Components
    CardNewsComponent
  ],
  providers: [
    PageStoreService,
    NewsService
  ],
})
export class CabinetModule {}