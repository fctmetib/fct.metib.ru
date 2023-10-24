import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import {
  currentUserFactoringSelector,
  currentUserGeneralSelector,
} from 'src/app/auth/store/selectors';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { factoringSelector } from 'src/app/client/store/selectors';

import * as introJs from 'intro.js/intro.js';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
import { OrganizationInterface } from '../../../shared/types/organization/organization.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdatePasswordDialogComponent } from 'src/app/shared/modules/update-password-dialog/update-password-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  organization: OrganizationInterface;

  introJS = introJs();

  items: MenuItem[];
  baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar';
  baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`;

  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public currentUser$: Observable<CurrentUserGeneralInterface | null>;
  public factoring$: Observable<CustomerInterface | null>;

  private subscription$: Subscription = new Subscription();
  refUpdatePasswordDialog: DynamicDialogRef;

  constructor(
    private store: Store,
    private authService: AuthService,
    public dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(
      select(currentUserFactoringSelector)
    );
    this.currentUser$ = this.store.pipe(select(currentUserGeneralSelector));
    this.factoring$ = this.store.pipe(select(factoringSelector));
  }

  logout() {
    this.authService.logout();
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

  openAccountOwner() {
    document.getElementById('dropdownMenu').classList.toggle('show');
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
