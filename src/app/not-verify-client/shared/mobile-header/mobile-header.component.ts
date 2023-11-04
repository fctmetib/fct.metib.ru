import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector, currentUserGeneralSelector } from 'src/app/auth/store/selectors';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { factoringSelector } from 'src/app/client/store/selectors';

import * as introJs from 'intro.js/intro.js';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  introJS = introJs();

  items: MenuItem[];
  baseAvatarUrl = "https://api-factoring.metib.ru/api/avatar";

  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public currentUser$: Observable<CurrentUserGeneralInterface | null>;
  public factoring$: Observable<CustomerInterface | null>;

  constructor(
    private store: Store, 
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
    this.currentUser$ = this.store.pipe(select(currentUserGeneralSelector));
    this.factoring$ = this.store.pipe(select(factoringSelector));
  }

  logout() {
    this.authService.logout()
  }

  close() {
    if (isPlatformBrowser(this.platformId)) {
      let toggler: any = document.getElementsByClassName('toggler')[0];
      toggler.checked = false;
    }
  }


  getInfo() {
    const url = this.router.url;
    switch (url) {
      case '/cabinet':
        this.showCabinetInfo();
        break;
      case '/requests':
        this.showRequestsInfo();
        break;
    }
  }

  private showRequestsInfo() {
    this.close();
    this.introJS.setOptions({
      steps: [
        {
          element: '#step1',
          intro: 'Это страница с Вашими заявками, на ней Вы можете просматривать созданные заявки, создавать новые, а также редактировать и удалять существующие.',
        },
        {
          element: '#step2',
          intro:
            "Чтобы создать новую заявку, нажмите на эту кнопку.",
          position: 'bottom',
        },
        // {
        //   element: '#step2',
        //   intro:
        //     'Воспользуйтесь...',
        //   position: 'bottom',
        // },
      ],
      showProgress: true,
      skipLabel: 'Закрыть',
      doneLabel: 'Завершить',
      nextLabel: 'Круто, дальше!',
      prevLabel: 'Назад',
      overlayOpacity: '0.5',
    });
    this.introJS.start();
  }

  private showCabinetInfo() {
    this.close()
    this.introJS.setOptions({
      steps: [
        {
          intro: 'Это главная страница Вашего личного кабинета, на ней находится основная важная информация!',
        },
        {
          element: '#step1',
          intro:
            "В данной секции отображаются все отчеты. Чтобы перейти к нужному отчету - кликните по нему, один раз.",
          position: 'bottom',
        },
        // {
        //   element: '#step2',
        //   intro:
        //     'Воспользуйтесь...',
        //   position: 'bottom',
        // },
      ],
      showProgress: true,
      skipLabel: 'Закрыть',
      doneLabel: 'Завершить',
      nextLabel: 'Круто, дальше!',
      prevLabel: 'Назад',
      overlayOpacity: '0.5',
    });
    this.introJS.start();
  }
}
