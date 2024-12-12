import {Injectable} from '@angular/core'

@Injectable()
export class DemandSuretyDrawerStaticService {
  guaranteeType = 'Guarantee'
  payload = {
    Factoring: { // Запрос на поручительство (Заявка на факторинг)
      EDI: [
        {
          Company: null, // Дебитор
          EDIProvider: null // EDI-провайдер
        }
      ],
      // 4 - шаг
      Products: null, // Виды реализуемой продукции?
      Trademarks: null, // Торговые марки
      Suppliers: null, // Основные поставщики
      Buyers: null, // Продавец???
      StaffAmount: null, // Количество сотрудников
      LimitWanted: null, // Лимит финансирования
      Properties: [ // Свойства
        {
          Type: null, // Собственность
          Address: { // Полный адрес объекта
            PostCode: null,
            Country: null,
            RegionTitle: null,
            RegionCode: null,
            District: null,
            City: null,
            Locality: null,
            Street: null,
            House: null,
            Appartment: null
          }
        }
      ],
      Obligations: [ // Долговые обязательства
        {
          Creditor: null, // Кредитор
          Type: null, // Тип обязательства
          Date: null, // Дата погашения
          Summ: null, // Сумма договора
          ReportingRest: null, // Остаток на дату отчетности
          CurrentRest: null // Остаток на текущую дату
        }
      ],
      // 3 - шаг
      // Банковские реквизиты
      Account: { // Основной счёт
        Date: null, // Дата открытия
        Expire: null, // Дата закрытия
        Comment: null, // Комментарий к запросу
        Bank: null, // Банк
        COR: null, // Корреспондентский счет
        Number: null // Номер счета
      },
      AddonAccounts: [ // Дополнительный счёт
        {
          Date: null, // Дата открытия
          Expire: null, // Дата закрытия
          Comment: null, // Цель открытия
          Bank: null, // Банк
          COR: null, // Корреспондентский счет
          Number: null // Номер счета
        }
      ],
      FactoringAim: 0 // Цели факторинга??
    },
    // 2 - шаг
    Anket: {
      Organization: { // Организация
        Type: null,
        LegalForm: null,
        FullTitle: null,
        ShortTitle: null,
        ForeignTitle: null,
        Phone: null,
        Email: null,
        Website: null,
        LegalAddress: { // Юридический адрес
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        PostAddress: { // Почтовый адрес
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        FactAddressEquals: false,
        PostAddressEquals: true,
        FactAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        Requisites: { // Реквизиты организации
          LegalForm: null,
          INN: null,
          KPP: null,
          OGRN: null,
          OKPO: null,
          OKATO: null,
          OKVED: null,
          OKOGU: null,
          Signer: {
            FIO: null,
            Position: null,
            Reason: null,
            Person: null,
            Passport: null,
            RegistrationAddress: null
          },
          AccountManager: "",
          BankAccount: {
            Bank: null,
            COR: null,
            BIK: null,
            Number: null
          },
          RegistrationDate: null,
          SalesManagerID: null,
          RegistrationRegionID: null
        },
        Settings: {
          BorderHour: 16,
          AgregateUnload: true,
          fabricPostingType: 1,
          SystemNameType: 1
        }
      },
      Resident: { // Признак резидента РФ
        IsResident: null,
        Country: null,
        foreignCode: null
      },
      Capital: { // Уставный капитал
        CurrencyCode: null, // Код валюты
        DateBegin: null, // Дата
        Total: null, // Общая сумма
        Payed: null // Оплаченная сумма
      },
      Activity: null, // Активности
      Licenses: [ // Лицензии и членство
        {}
      ],
      Signer: { // Подписант
        FIO: null,
        Position: null,
        Reason: null,
        Person: { // Данные физ. лица
          NameFirst: null,
          NameLast: null,
          NameSecond: null,
          Gender: null,
          Phone: null,
          Email: null,
          SNILS: null,
          INN: null,
          BirthDate: null,
          BirthCountryCode: null,
          BirthPlace: null,
          Address: null
        },
        Passport: { // Паспорт
          Number: null,
          Date: null,
          Expire: null,
          IssuerTitle: null,
          IssuerCode: null,
          IsForeign: false,
          Nationality: null
        },
        RegistrationAddress: { // Адрес регистрации
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        }
      },
      Objectives: {
        FinancialObjective: null,
        FinancialObjectiveOther: null,
        BankRelationObjective: null,
        BankRelationObjectiveOther: null,
        TransactionsCount: null,
        TransactionsSumm: null,
        TransactionsContracts: null
      },
      Shareholders: [ // Учредители
        {
          Person: null,
          Passport: null,
          Address: null,
          Type: null,
          INN: null,
          SharePercent: null
        }
      ],
      Ratings: [ // Рейтинг
        {}
      ],
      ContactPerson: { // Контактное лицо
        NameFirst: null,
        NameLast: null,
        NameSecond: null,
        Gender: null,
        Phone: null,
        Email: null,
        SNILS: null,
        INN: null,
        BirthDate: null,
        BirthCountryCode: null,
        BirthPlace: null,
        Address: null
      },
      Managerinresponse: { // Контакт менеджер
        NameFirst: null,
        NameLast: null,
        NameSecond: null,
        Gender: null,
        Phone: null,
        Email: null,
        SNILS: null,
        INN: null,
        BirthDate: null,
        BirthCountryCode: null,
        BirthPlace: null,
        Address: null
      },
      DateUntil: null
    },
    Type: this.guaranteeType, // Тип данных запрос
    Files: null // Список файлов
  }
}
