import { DemandLocalActionsInterface } from './../../types/common/demand-local-actions.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit {
  actions: DemandLocalActionsInterface[] = [];

  isUserVerified: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initActions();
    this.isUserVerified = this.authService.isUserVerified();
  }

  initActions() {
    this.actions = [
      {
        text: 'Запрос на редактирование профиля',
        url: 'actions/edit-profile',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на свободную тему',
        url: 'actions/free-request',
        onlyNewClient: false,
      },
      {
        text: 'Запрос в техническую поддержку',
        url: 'actions/support-request',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на ЭЦП',
        url: 'actions/create-eds',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на поручительство',
        url: 'actions/surety',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на факторинг',
        url: 'actions/factoring',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на агентский факторинг',
        url: 'actions/agent-factoring',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на увеличение лимита',
        url: 'actions/update-limit',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на нового дебитора',
        url: 'actions/create-debitor',
        onlyNewClient: false,
      },
      {
        text: 'Регистрация канала верификации',
        url: 'actions/verify',
        onlyNewClient: false,
      },
    ];
  }

  ngOnDestroy() {}
}
