import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { InvoicesPageComponent } from './components/invoices-page/invoices-page.component';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    SliderModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    InvoicesRoutingModule,
  ],
  declarations: [InvoicesPageComponent],
  providers: [DatePipe],
})
export class InvoicesModule {}
