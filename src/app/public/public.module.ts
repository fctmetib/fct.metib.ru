import { MibSliderPartnersComponent } from './shared/mib-slider-partners/mib-slider-partners.component';
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
import { MibSectionBodyComponent } from './shared/mib-sections/mib-section-body/mib-section-body.component';
import { MibCardTariffComponent } from './shared/cards/card-tariff/mib-card-tariff.component';
import { MibCardPersonComponent } from './shared/cards/card-person/mib-card-person.component';
import { OrganizationService } from './service/organization.service';
import { NewsService } from './service/news.service';
import { MibSectionHeaderNewsComponent } from './shared/mib-sections/mib-section-header-news/mib-section-header-news.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { MibSliderNewsComponent } from './shared/mib-slider-news/mib-slider-news.component';

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
        component: ClientsComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'news/:id',
        component: NewsComponent,
      },
      {
        path: 'ui-kit-test',
        component: UIKitTestComponent,
      },
    ],
  },
];

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputMaskModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    MibModalModule,
    DialogModule,
    MibTabModule,
    CarouselModule,
    CheckboxModule,
    ButtonModule,
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
    // DIRECTIVES
    MibScrollDirective,
    // SECTIONS
    MibSectionHeaderComponent,
    MibSectionHeaderNewsComponent,
    MibSectionBodyComponent,
    // COMPONENTS
    MibSliderComponent,
    UIKitTestComponent,
    MibMenuComponent,
    MibFooterComponent,
    MibButtonComponent,
    MibSliderPartnersComponent,
    MibSliderNewsComponent,
    // CARDS
    MibCardTariffComponent,
    MibCardPersonComponent,
    MibCardNewsComponent,
    MibCardInfoComponent,
  ],
  providers: [OrganizationService, NewsService],
})
export class PublicModule {}
