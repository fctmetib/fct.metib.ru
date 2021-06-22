import { ContactsComponent } from './pages/contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from '../shared/layouts/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { UIKitTestComponent } from './shared/ui-kit-test/ui-kit-test.component';
import { MibButtonComponent } from './shared/buttons/mib-button/mib-button.component';
import { MibMenuComponent } from './shared/menu/mib-menu/mib-menu.component';

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
        path: 'about',
        component: AboutComponent,
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
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    // TODO: REMOVE IT AFTER TEST, ADD SHARED MODULE
    UIKitTestComponent,
    MibMenuComponent,
    MibButtonComponent
  ],
  providers: [],
})
export class PublicModule {}
