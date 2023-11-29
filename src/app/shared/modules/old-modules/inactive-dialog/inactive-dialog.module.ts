import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InactiveDialogComponent } from './inactive-dialog.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    CalendarModule,
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
    PaginatorModule,
    ButtonModule
  ],
  declarations: [InactiveDialogComponent],
  exports: [InactiveDialogComponent],
})
export class InactiveDialogModule {}
