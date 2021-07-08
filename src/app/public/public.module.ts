import { ContactsComponent } from './pages/contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UIKitTestComponent } from './shared/ui-kit-test/ui-kit-test.component';
import { MibButtonComponent } from './shared/buttons/mib-button/mib-button.component';
import { MibMenuComponent } from './shared/menu/mib-menu/mib-menu.component';
import { MibCardInfoComponent } from './shared/cards/card-info/mib-card-info.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MibFooterComponent } from './shared/mib-footer/mib-footer.component';
import { MibModalModule } from './shared/mib-modal';
import { MibTabModule } from './shared/mib-tab';
import { MibScrollDirective } from './shared/directives/mib-scroll.directive';
import { MibSliderComponent } from './shared/mib-slider/mib-slider.component';
import { MibCardNewsComponent } from './shared/cards/card-news/mib-card-news.component';
import { PublicComponent } from './public.component';
import { MibSectionHeaderComponent } from './shared/mib-sections/mib-section-header/mib-section-header.component';
import { NewsComponent } from './pages/news/news.component';

const routes = [
  {
    path: '',
    component: PublicComponent,
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
        path: 'news/:id',
        component: NewsComponent
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
    MibModalModule,
    MibTabModule
  ],
  exports: [RouterModule],
  declarations: [
    PublicComponent,
    HomeComponent,
    TariffsComponent,
    ClientsComponent,
    ContactsComponent,
    NewsComponent,
    // TODO: REMOVE IT AFTER TEST, ADD SHARED MODULE
    MibSectionHeaderComponent,
    MibCardNewsComponent,
    MibSliderComponent,
    MibScrollDirective,
    UIKitTestComponent,
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
