import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { BehaviorSubject, Observable, Subscription, filter, switchMap, tap } from 'rxjs';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';

import * as introJs from 'intro.js/intro.js';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
import { UpdatePasswordDialogComponent } from '../../../../shared/modules/update-password-dialog/update-password-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { ClientService } from 'src/app/shared/services/common/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  introJS = introJs();

  items: MenuItem[];
  baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar';
  baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`;

  public currentUserFactoring$ = new BehaviorSubject<CurrentUserFactoringInterface>(null);
  public currentUser$ = new BehaviorSubject<CurrentUserGeneralInterface>(null);

  public factoring$ = new BehaviorSubject<CustomerInterface>(null);

  public isAdmin: boolean = false;

  private subscription$: Subscription = new Subscription();
  refUpdatePasswordDialog: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.authService.currentUser$.pipe(
      filter(Boolean),
      tap((currentUser) => {
        this.currentUser$.next(currentUser.userGeneral);
        this.currentUserFactoring$.next(currentUser.userFactoring);
      }),
      switchMap((currentUser) => this.clientService.getClientFactoringById(+currentUser.userFactoring.OrganizationID)),
      tap((clientFactoring) => {
        this.factoring$.next(clientFactoring)
      })
    ).subscribe();

    this.isAdmin = this.authService.isUserAdmin();
  }

  logout() {
    this.authService.logout();
  }

  switchToAdmin() {
    this.authService.switchToAdmin();
  }

  openAccountOwner() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('dropdownMenu').classList.toggle('show');
    }
  }

  public openUpdatePassword() {
    if (!this.refUpdatePasswordDialog) {
      this.refUpdatePasswordDialog = this.dialogService.open(
        UpdatePasswordDialogComponent,
        {
          header: 'Смена пароля',
          width: '450px',
          contentStyle: { 'max-height': '550px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refUpdatePasswordDialog.onClose.subscribe(() => {
          this.refUpdatePasswordDialog = null;
        })
      );
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
    this.introJS.setOptions({
      steps: [
        {
          element: '#step1',
          intro:
            'Это страница с Вашими заявками, на ней Вы можете просматривать созданные заявки, создавать новые, а также редактировать и удалять существующие.',
        },
        {
          element: '#step2',
          intro: 'Чтобы создать новую заявку, нажмите на эту кнопку.',
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
    this.introJS.setOptions({
      steps: [
        {
          intro:
            'Это главная страница Вашего личного кабинета, на ней находится основная важная информация!',
        },
        {
          element: '#step1',
          intro:
            'В данной секции отображаются все отчеты. Чтобы перейти к нужному отчету - кликните по нему, один раз.',
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
