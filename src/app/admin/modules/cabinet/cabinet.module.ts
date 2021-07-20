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
import { CreateNewsDialogComponent } from './components/create-news-dialog/create-news-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

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
    CardNewsComponent,
    CreateNewsDialogComponent
  ],
  providers: [
    PageStoreService,
    DialogService,
    NewsService
  ],
})
export class CabinetModule {}
