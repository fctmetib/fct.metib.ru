import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { factoringSelector } from 'src/app/client/store/selectors';

import * as introJs from 'intro.js/intro.js';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
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

  public isAdmin: boolean = false;

  constructor(private store: Store, private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    // TODO: Юзер из сторы
    this.currentUser$ = null
    this.factoring$ = this.store.pipe(select(factoringSelector));

    this.isAdmin = this.authService.isUserAdmin();
  }

  public switchToAdmin(): void {
    this.authService.switchToAdmin();
  }

  public logout(): void {
    this.authService.logout()
  }

  public close(): void {
    let toggler: any = document.getElementsByClassName('toggler')[0];
    toggler.checked = false;
  }


  public getInfo(): void {
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

  private showRequestsInfo(): void {
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

  private showCabinetInfo(): void {
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
