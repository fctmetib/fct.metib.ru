import { ReportCardInterface } from './../../types/common/report-card.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import {
  currentUserFactoringSelector,
  isLoadingSelector,
} from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent implements OnInit {
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public loading$: Observable<boolean | null>;

  public reportCards: ReportCardInterface[] = [];

  constructor(private authSerice: AuthService, private store: Store) {}

  ngOnInit() {
    this.reportCardsInit();
    this.loading$ = this.store.pipe(select(isLoadingSelector));
    this.currentUserFactoring$ = this.store.pipe(
      select(currentUserFactoringSelector)
    );
  }

  reportCardsInit() {
    this.reportCards = [
      {
        title: 'Приём документов',
        description:
          'Список операций "Прием Документов" в разрезе накладных за указанный период',
        link: '',
      },
      {
        title: 'Выплата финансирования',
        description:
          'Список операций "Выплата Финансирования" в разрезе накладных за указанный период',
        link: '',
      },
      {
        title: 'Обработка Платежей',
        description:
          'Список операций "Обработка Платежа" в разрезе накладных за указанный период',
        link: '',
      },
      {
        title: 'Коррекция Поставок',
        description:
          'Список операций "Коррекция Поставок" в разрезе накладных за указанный период',
        link: '',
      },
      {
        title: 'Аккредитив',
        description:
          'Список операций пополнения Аккредидитов за указанный период',
        link: '',
      },
      {
        title: 'Комиссии',
        description: 'Списания комисии в разрезе накладных за указанный период',
        link: '',
      },
      {
        title: 'Агрегатный',
        description:
          'Агрегатный отчет по накладным с указанием их сосояния на указанную дату',
        link: '',
      },
      {
        title: 'Просрочки Покупателей',
        description:
          'Список накладных, оплата по которым была просрочена (на указанное количество дней) на указанную дату',
        link: '',
      },
      {
        title: 'История Накладных',
        description: 'История накладных',
        link: '',
      },
      {
        title: 'Полученные Платежи',
        description:
          'Список полученных платежей по Договорам Поставок за указанный период',
        link: '',
      },
      {
        title: 'Выписка по счёту',
        description: 'Список транзакций по расчетному счету',
        link: '',
      },
      {
        title: 'Агрегатный Сводный',
        description:
          'Агрегатный отчет по Договорам Поставок с указанием задолженности по договорам на указанную дату',
        link: '',
      },
      {
        title: 'Протокол Отчетов',
        description: 'Список выполненных клиентом отчетов за указанный период',
        link: '',
      },
      {
        title: 'Счета-Фактуры',
        description:
          'Список выставленных Банком счетов-фактур за указанный период',
        link: '',
      },
      {
        title: 'Реестр Распоряжения',
        description: 'Детализация реестра распоряжения в виде списка проводок',
        link: '',
      },
      {
        title: 'Отчеты Дебиторов',
        description: 'Отчеты, полученные от Дебиторов',
        link: '',
      },
    ];
  }

  public logout(): void {
    this.authSerice.logout();
  }
}
