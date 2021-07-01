import { ContactsComponent } from './pages/contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from '../shared/layouts/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UIKitTestComponent } from './shared/ui-kit-test/ui-kit-test.component';
import { MibButtonComponent } from './shared/buttons/mib-button/mib-button.component';
import { MibMenuComponent } from './shared/menu/mib-menu/mib-menu.component';
import { MibCardInfoComponent } from './shared/cards/card-info/mib-card-info.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MibFooterComponent } from './shared/mib-footer/mib-footer.component';
import { MibModalModule } from './shared/mib-modal';
import { MIBInputComponent } from './shared/mib-input/mib-input.component';

const routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'tariffs',
        component: TariffsComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'ui-kit-test',
        component: UIKitTestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MibModalModule
  ],
  exports: [RouterModule],
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    TariffsComponent,
    ClientsComponent,
    ContactsComponent,
    // TODO: REMOVE IT AFTER TEST, ADD SHARED MODULE
    UIKitTestComponent,
    MIBInputComponent,
    MibMenuComponent,
    MibFooterComponent,
    MibButtonComponent,
    // CARDS
    MibCardInfoComponent,
  ],
  providers: [
  ],
})
export class PublicModule {}
