import { ReportCardInterface } from 'src/app/client/modules/cabinet/types/common/report-card.interface';
import { DemandSelectboxInterface } from '../../modules/demand/types/common/demand-selectbox.interface';

export class MIBCommon {
  private legalForms: DemandSelectboxInterface[] = [];

  private organizations: DemandSelectboxInterface[] = [];
  private typesOfOwner: DemandSelectboxInterface[] = [];

  private countryList: DemandSelectboxInterface[] = [];
  private regionList: DemandSelectboxInterface[] = [];

  private reportList: ReportCardInterface[] = [];

  constructor() {
    this.initLists();
  }

  getCountryList(): DemandSelectboxInterface[] {
    return this.countryList;
  }

  getLegalForms(): DemandSelectboxInterface[] {
    return this.legalForms;
  }

  getOrganizations(): DemandSelectboxInterface[] {
    return this.organizations;
  }

  getTypesOfOwner(): DemandSelectboxInterface[] {
    return this.typesOfOwner;
  }

  getRegionList(): DemandSelectboxInterface[] {
    return this.regionList;
  }

  getReports(): ReportCardInterface[] {
    return this.reportList;
  }

  private initLists() {
    this.countryList = [
      {
        title: 'Российская Федерация',
        value: 'Российская Федерация'
      }
    ]

    this.legalForms = [
      {
        title: 'ООО',
        value: 'ООО',
      },
      {
        title: 'ЗАО',
        value: 'ЗАО',
      },
      {
        title: 'ПАО',
        value: 'ПАО',
      },
      {
        title: 'ОАО',
        value: 'ОАО',
      },
      {
        title: 'НАО',
        value: 'НАО',
      },
      {
        title: 'АО',
        value: 'АО',
      },
    ];

    this.organizations = [
      {
        title: 'Юридическое лицо',
        value: 1,
      },
      {
        title: 'ИП',
        value: 0,
      },
    ];

    this.typesOfOwner = [
      {
        title: 'Собственность',
        value: 'Own',
      },
      {
        title: 'Аренда',
        value: 'Lease',
      },
    ];

    this.regionList = [
      {
        value: 1,
        title: 'Республика Адыгея (Адыгея)',
      },
      {
        value: 2,
        title: 'Республика Башкортостан',
      },
      {
        value: 3,
        title: 'Республика Бурятия',
      },
      {
        value: 4,
        title: 'Республика Алтай',
      },
      {
        value: 5,
        title: 'Республика Дагестан',
      },
      {
        value: 6,
        title: 'Республика Ингушетия',
      },
      {
        value: 7,
        title: 'Кабардино-Балкарская Республика',
      },
      {
        value: 8,
        title: 'Республика Калмыкия',
      },
      {
        value: 9,
        title: 'Карачаево-Черкесская Республика',
      },
      {
        value: 10,
        title: 'Республика Карелия',
      },
      {
        value: 11,
        title: 'Республика Коми',
      },
      {
        value: 12,
        title: 'Республика Марий Эл',
      },
      {
        value: 13,
        title: 'Республика Мордовия',
      },
      {
        value: 14,
        title: 'Республика Саха (Якутия)',
      },
      {
        value: 15,
        title: 'Республика Северная Осетия - Алания',
      },
      {
        value: 16,
        title: 'Республика Татарстан (Татарстан)',
      },
      {
        value: 17,
        title: 'Республика Тыва',
      },
      {
        value: 18,
        title: 'Удмуртская Республика',
      },
      {
        value: 19,
        title: 'Республика Хакасия',
      },
      {
        value: 20,
        title: 'Чеченская Республика',
      },
      {
        value: 21,
        title: 'Чувашская Республика - Чувашия',
      },
      {
        value: 22,
        title: 'Алтайский край',
      },
      {
        value: 23,
        title: 'Краснодарский край',
      },
      {
        value: 24,
        title: 'Красноярский край',
      },
      {
        value: 25,
        title: 'Приморский край',
      },
      {
        value: 26,
        title: 'Ставропольский край',
      },
      {
        value: 27,
        title: 'Хабаровский край',
      },
      {
        value: 28,
        title: 'Амурская область',
      },
      {
        value: 29,
        title: 'Архангельская область',
      },
      {
        value: 30,
        title: 'Астраханская область',
      },
      {
        value: 31,
        title: 'Белгородская область',
      },
      {
        value: 32,
        title: 'Брянская область',
      },
      {
        value: 33,
        title: 'Владимирская область',
      },
      {
        value: 34,
        title: 'Волгоградская область',
      },
      {
        value: 35,
        title: 'Вологодская область',
      },
      {
        value: 36,
        title: 'Воронежская область',
      },
      {
        value: 37,
        title: 'Ивановская область',
      },
      {
        value: 38,
        title: 'Иркутская область',
      },
      {
        value: 39,
        title: 'Калининградская область',
      },
      {
        value: 40,
        title: 'Калужская область',
      },
      {
        value: 41,
        title: 'Камчатский край',
      },
      {
        value: 42,
        title: 'Кемеровская область',
      },
      {
        value: 43,
        title: 'Кировская область',
      },
      {
        value: 44,
        title: 'Костромская область',
      },
      {
        value: 45,
        title: 'Курганская область',
      },
      {
        value: 46,
        title: 'Курская область',
      },
      {
        value: 47,
        title: 'Ленинградская область',
      },
      {
        value: 48,
        title: 'Липецкая область',
      },
      {
        value: 49,
        title: 'Магаданская область',
      },
      {
        value: 50,
        title: 'Московская область',
      },
      {
        value: 51,
        title: 'Мурманская область',
      },
      {
        value: 52,
        title: 'Нижегородская область',
      },
      {
        value: 53,
        title: 'Новгородская область',
      },
      {
        value: 54,
        title: 'Новосибирская область',
      },
      {
        value: 55,
        title: 'Омская область',
      },
      {
        value: 56,
        title: 'Оренбургская область',
      },
      {
        value: 57,
        title: 'Орловская область',
      },
      {
        value: 58,
        title: 'Пензенская область',
      },
      {
        value: 59,
        title: 'Пермский край',
      },
      {
        value: 60,
        title: 'Псковская область',
      },
      {
        value: 61,
        title: 'Ростовская область',
      },
      {
        value: 62,
        title: 'Рязанская область',
      },
      {
        value: 63,
        title: 'Самарская область',
      },
      {
        value: 64,
        title: 'Саратовская область',
      },
      {
        value: 65,
        title: 'Сахалинская область',
      },
      {
        value: 66,
        title: 'Свердловская область',
      },
      {
        value: 67,
        title: 'Смоленская область',
      },
      {
        value: 68,
        title: 'Тамбовская область',
      },
      {
        value: 69,
        title: 'Тверская область',
      },
      {
        value: 70,
        title: 'Томская область',
      },
      {
        value: 71,
        title: 'Тульская область',
      },
      {
        value: 72,
        title: 'Тюменская область',
      },
      {
        value: 73,
        title: 'Ульяновская область',
      },
      {
        value: 74,
        title: 'Челябинская область',
      },
      {
        value: 75,
        title: 'Забайкальский край',
      },
      {
        value: 76,
        title: 'Ярославская область',
      },
      {
        value: 77,
        title: 'г. Москва',
      },
      {
        value: 78,
        title: 'Санкт-Петербург',
      },
      {
        value: 79,
        title: 'Еврейская автономная область',
      },
      {
        value: 83,
        title: 'Ненецкий автономный округ',
      },
      {
        value: 86,
        title: 'Ханты-Мансийский автономный округ - Югра',
      },
      {
        value: 87,
        title: 'Чукотский автономный округ',
      },
      {
        value: 89,
        title: 'Ямало-Ненецкий автономный округ',
      },
      {
        value: 99,
        title: 'Иные территории, включая город и космодром Байконур',
      },
    ];

    this.reportList = [
      {
        title: 'Приём документов',
        description:
          'Список операций "Прием Документов" в разрезе накладных за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Выплата финансирования',
        description:
          'Список операций "Выплата Финансирования" в разрезе накладных за указанный период',
        link: '',
        type: 'CustomerFinansing'
      },
      {
        title: 'Обработка Платежей',
        description:
          'Список операций "Обработка Платежа" в разрезе накладных за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Коррекция Поставок',
        description:
          'Список операций "Коррекция Поставок" в разрезе накладных за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Аккредитив',
        description:
          'Список операций пополнения Аккредидитов за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Комиссии',
        description: 'Списания комисии в разрезе накладных за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Агрегатный',
        description:
          'Агрегатный отчет по накладным с указанием их сосояния на указанную дату',
        link: '',
        type: ''
      },
      {
        title: 'Просрочки Покупателей',
        description:
          'Список накладных, оплата по которым была просрочена (на указанное количество дней) на указанную дату',
        link: '',
        type: ''
      },
      {
        title: 'История Накладных',
        description: 'История накладных',
        link: '',
        type: ''
      },
      {
        title: 'Полученные Платежи',
        description:
          'Список полученных платежей по Договорам Поставок за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Выписка по счёту',
        description: 'Список транзакций по расчетному счету',
        link: '',
        type: ''
      },
      {
        title: 'Агрегатный Сводный',
        description:
          'Агрегатный отчет по Договорам Поставок с указанием задолженности по договорам на указанную дату',
        link: '',
        type: ''
      },
      {
        title: 'Протокол Отчетов',
        description: 'Список выполненных клиентом отчетов за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Счета-Фактуры',
        description:
          'Список выставленных Банком счетов-фактур за указанный период',
        link: '',
        type: ''
      },
      {
        title: 'Реестр Распоряжения',
        description: 'Детализация реестра распоряжения в виде списка проводок',
        link: '',
        type: ''
      },
      {
        title: 'Отчеты Дебиторов',
        description: 'Отчеты, полученные от Дебиторов',
        link: '',
        type: ''
      },
    ];
  }
}
