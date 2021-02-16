import { DemandLocalActionsInterface } from './../../types/common/demand-local-actions.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit {
  actions: DemandLocalActionsInterface[] = [];

  constructor() {}

  ngOnInit() {
    this.initActions();
  }

  initActions() {
    this.actions = [
      {
        text: 'Запрос на редактирование профиля',
        url: 'demand-edit',
      },
      {
        text: 'Запрос на свободную тему',
        url: 'demand-free',
      },
      {
        text: 'Запрос в техническую поддержку',
        url: 'demand-support',
      },
      {
        text: 'Запрос на ЭЦП',
        url: 'demand-dp',
      },
      {
        text: 'Запрос на поручительство',
        url: 'demand-hr',
      },
      {
        text: 'Запрос на агентский факторинг',
        url: 'demand-af',
      },
      {
        text: 'Запрос на увеличение лимита',
        url: 'demand-bl',
      },
      {
        text: 'Запрос на нового дебитора',
        url: 'demand-nd',
      },
      {
        text: 'Регистрация канала верификации',
        url: 'demand-cv',
      },
    ];
  }

  ngOnDestroy() {}
}
