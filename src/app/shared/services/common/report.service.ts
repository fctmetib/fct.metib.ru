import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ReportViewTableConfig
} from '../../../client/modules/reports/components/report-view-page/report-view-page.service';

export interface IDataByAggregate {
  ShipmentID: number;
  CustomerTitle: string;
  DebtorTitle: string;
  ContractDeliveryNumber: string;
  RequestDate: string;
  RequestNumber: string;
  ShipmentFullTitle: string;
  StatusTitle: string;
  CurrencyTitle: string;
  ShipmentSumm: number;
  DutyDebtor: number;
  DutyCustomer: number;
  DutyCommission: number;
  DateShipment: string;
  DatePayment: string;
  DateOpen: string;
  DatePayed: string;
  DateAddon: string;
  RateStandart: number;
  RateExtra: number;
  CommissionPercent: number;
  PenyPercent: number;
  CommissionBottomBorder: number;
  CommissionTopBorder: number;
  RegionTitle: string;
  ProductCodeTitle: string;
}

@Injectable()
export class ReportService {

  public reportData$ = new BehaviorSubject<any>(null);

  private http = inject(HttpClient);

  // TODO: НАЗНАЧИТЬ ВЕЗДЕ ПРАВИЛЬНЫЕ RESPONSE ТИПЫ

  getReport(data: any): Observable<any> {
    const url = `${environment.apiUrl}/report`;
    return this.http.post<any>(url, data);
  }

  aggregate(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/Agregate`, req);
  }

  aggregateDelivery(req: ClientPeriodReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/AgregateDelivery`, req);
  }

  accreditive(req: ClientPeriodReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/Accreditive`, req);
  }

  extractExternal(req: ClientExtractExternalReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/ExtractExternal`, req);
  }

  shipmentCorrection(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/ShipmentCorrection`, req);
  }

  documentsIncome(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/DocumentsIncome`, req);
  }

  customerFinansing(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/CustomerFinansing`, req);
  }

  paymentAll(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/PaymentAll`, req);
  }

  commission(req: ClientAggregateShipmentReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/Commission`, req);
  }

  debtorDelay(req: ClientDelayReportArgs) {
    return this.http.post<IDataByAggregate[]>(`${environment.apiUrl}/v1/reports/DebtorDelay`, req);
  }

  paymentsIncome(req: ClientPeriodReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/PaymentsIncome`, req);
  }

  protocol() {
    // TODO: СДЕЛАТЬ МЕТОД И ДРАВЕР
  }

  invoices(req: ClientPeriodReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/Invoices`, req);
  }

  orderPostings(req: ClientOrderPostingsReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/OrderPostings`, req);
  }

  debtor(req: ClientPeriodReportArgs) {
    return this.http.post<any[]>(`${environment.apiUrl}/v1/reports/DebtorReport`, req);
  }

}

export interface ClientOrderPostingsReportArgs {
  ID?: number;
  Type?: string;
  Period?: PeriodReq;
  CustomerID?: number;
  DebtorID?: number;
  ByGroup?: boolean;
  PayedAgreement?: boolean;
  IncludelLinks?: boolean;
  OrderID?: number;
}

export interface ClientDelayReportArgs {
  ID?: number;
  Type?: string;
  Period?: PeriodReq;
  CustomerID?: number;
  DebtorID?: number;
  ByGroup?: boolean;
  PayedAgreement?: boolean;
  IncludelLinks?: boolean;
  Delay?: number;
}

export interface ClientExtractExternalReportArgs {
  ID?: number;
  Type?: string;
  Period?: PeriodReq;
  CustomerID?: number;
  DebtorID?: number;
  ByGroup?: boolean;
  PayedAgreement?: boolean;
  IncludelLinks?: boolean;
  OrderNumber?: string;
  RequestNumber?: string;
}

export interface ClientAggregateShipmentReportArgs {
  ID?: number;
  Type?: string;
  Period?: PeriodReq;
  CustomerID?: number;
  DebtorID?: number;
  ByGroup?: boolean;
  PayedAgreement?: boolean;
  IncludelLinks?: boolean;
  ShipmentStatus?: string;
}

export interface ClientPeriodReportArgs {
  ID?: number;
  Type?: string;
  Period?: PeriodReq;
  CustomerID?: number;
  DebtorID?: number;
  ByGroup?: boolean;
  PayedAgreement?: boolean;
  IncludelLinks?: boolean;
}

export interface PeriodReq {
  DateFrom: Date;
  DateTo: Date;
}

export const reportByAggregateViewTableConfig: ReportViewTableConfig = {
  ShipmentID: ['string', 'ID Отгрузки'],
  CustomerTitle: ['string', 'Клиент'],
  DebtorTitle: ['string', 'Должник'],
  ContractDeliveryNumber: ['string', 'Номер Договора'],
  RequestDate: ['date', 'Дата Запроса'],
  RequestNumber: ['string', 'Номер Запроса'],
  ShipmentFullTitle: ['string', 'Название Отгрузки'],
  StatusTitle: ['string', 'Статус'],
  CurrencyTitle: ['string', 'Валюта'],
  ShipmentSumm: ['currency', 'Сумма Отгрузки'],
  DutyDebtor: ['currency', 'Долг Должника'],
  DutyCustomer: ['currency', 'Долг Клиента'],
  DutyCommission: ['currency', 'Комиссия'],
  DateShipment: ['date', 'Дата Отгрузки'],
  DatePayment: ['date', 'Дата Оплаты'],
  RateStandart: ['currency', 'Стандартная Ставка'],
  RateExtra: ['currency', 'Дополнительная Ставка'],
  CommissionPercent: ['string', 'Процент Комиссии'],
  PenyPercent: ['string', 'Процент Пени'],
  RegionTitle: ['string', 'Регион'],
  ProductCodeTitle: ['string', 'Код Продукта']
};

export const reportByAccreditiveViewTableConfig: ReportViewTableConfig = {
  AccreditiveOperationID: ['string', 'ID Операции Аккредитива'],
  DateOperation: ['date', 'Дата Операции'],
  AccreditiveID: ['string', 'ID Аккредитива'],
  AccNumber: ['string', 'Номер Аккредитива'],
  ValueOperation: ['currency', 'Сумма Операции'],
  OutRef: ['string', 'Внешняя Ссылка'],
  CustomerTitle: ['string', 'Клиент'],
  DebtorTitle: ['string', 'Должник']
};

export const reportByExternalViewTableConfig: ReportViewTableConfig = {
  ShipmentID: ['string', 'ID Отгрузки'],
  OrderNumber: ['string', 'Номер Заказа'],
  OrderDate: ['date', 'Дата Заказа'],
  Invoice: ['string', 'Накладная'],
  Shipment: ['string', 'Отгрузка'],
  RequestNumber: ['string', 'Номер Запроса'],
  RequestDate: ['date', 'Дата Запроса'],
  ShipmentDate: ['date', 'Дата Отгрузки'],
  FactoringOperationID: ['string', 'ID Факторинговой Операции'],
  FactoringPostingTypeID: ['string', 'Тип Факторингового Проведения'],
  DateToCustomer: ['date', 'Дата Передачи Клиенту'],
  Payment: ['string', 'Оплата'],
  AccountDebt: ['string', 'Счет Дебет'],
  AccountCredit: ['string', 'Счет Кредит'],
  Comment: ['string', 'Комментарий']
};

export const reportByAggregateDeliveryViewTableConfig: ReportViewTableConfig = {
  ContractDeliveryID: ['string', 'ID Договора Доставки'],
  DebtorID: ['string', 'ID Должника'],
  DebtorTitle: ['string', 'Название Должника'],
  CustomerID: ['string', 'ID Клиента'],
  CustomerTitle: ['string', 'Название Клиента'],
  ContractFactoringNumber: ['string', 'Номер Факторингового Договора'],
  ContractFactoringStartTime: ['date', 'Дата Начала Факторинга'],
  ContractFactoringEndTime: ['date', 'Дата Окончания Факторинга'],
  CDAddonNumber: ['string', 'Номер Дополнения к Договору'],
  CDAddonDate: ['date', 'Дата Дополнения к Договору'],
  AddonLimitFlag: ['string', 'Флаг Лимита Дополнения'],
  AddonLimitDate: ['date', 'Дата Лимита Дополнения'],
  AddonLimitValue: ['currency', 'Значение Лимита Дополнения'],
  AddonLimitCoeff: ['string', 'Коэффициент Лимита Дополнения'],
  Title: ['string', 'Название'],
  Number: ['string', 'Номер'],
  StartTime: ['date', 'Дата Начала'],
  EndTime: ['date', 'Дата Окончания'],
  Delay: ['string', 'Задержка'],
  DelayMin: ['string', 'Минимальная Задержка'],
  DelayMax: ['string', 'Максимальная Задержка'],
  TariffID: ['string', 'ID Тарифа'],
  TariffTitle: ['string', 'Название Тарифа'],
  FinancingPercent: ['string', 'Процент Финансирования'],
  CommissionBottomBorder: ['currency', 'Нижняя Граница Комиссии'],
  CommissionPercent: ['string', 'Процент Комиссии'],
  CommissionTopBorder: ['currency', 'Верхняя Граница Комиссии'],
  RateStandart: ['currency', 'Стандартная Ставка'],
  RateExtra: ['currency', 'Дополнительная Ставка'],
  RateFixed: ['currency', 'Фиксированная Ставка'],
  RateAddon: ['currency', 'Ставка Дополнения'],
  RateTurn: ['currency', 'Ставка Оборота'],
  RateDocument: ['currency', 'Ставка Документов'],
  RateValue: ['currency', 'Значение Ставки'],
  PenyPercent: ['string', 'Процент Пени'],
  RateAmendment: ['currency', 'Ставка Изменения'],
  CurrencyID: ['string', 'ID Валюты'],
  CurrencyTitle: ['string', 'Название Валюты'],
  StatusRegress: ['string', 'Статус Регресса'],
  ShipmentsCount: ['string', 'Количество Отгрузок'],
  DutyCustomer: ['currency', 'Долг Клиента'],
  DutyDebtor: ['currency', 'Долг Должника'],
  DutyCommission: ['currency', 'Комиссия'],
  FreeLimit: ['currency', 'Свободный Лимит'],
  FinalFreeLimit: ['currency', 'Окончательный Свободный Лимит'],
  FinalComment: ['string', 'Финальный Комментарий']
};

export const reportByInvoiceViewTableConfig: ReportViewTableConfig = {
  OrderID: ['string', 'ID Заказа'],
  CustomerID: ['string', 'ID Клиента'],
  Customer: ['string', 'Клиент'],
  Inn: ['string', 'ИНН'],
  DebtorID: ['string', 'ID Должника'],
  Debtor: ['string', 'Должник'],
  InvoiceNumber: ['string', 'Номер Счета-Фактуры'],
  InvoiceDate: ['date', 'Дата Счета-Фактуры'],
  Total: ['currency', 'Общая Сумма'],  // Изменено на currency
  Amount: ['currency', 'Сумма'],       // Изменено на currency
  Nds: ['currency', 'НДС'],            // Изменено на currency
  State: ['string', 'Состояние'],
  StateTitle: ['string', 'Описание Состояния']
};

export const reportByOrderPostingViewTableConfig: ReportViewTableConfig = {
  CustomerID: ['string', 'ID Клиента'],
  Customer: ['string', 'Клиент'],
  DebtorID: ['string', 'ID Должника'],
  Debtor: ['string', 'Должник'],
  OrderGroupID: ['string', 'ID Группы Заказа'],
  OrderID: ['string', 'ID Заказа'],
  OperationID: ['string', 'ID Операции'],
  PostingID: ['string', 'ID Проведения'],
  Type: ['string', 'Тип Операции'],
  Date: ['date', 'Дата Операции'],
  Payment: ['currency', 'Сумма Платежа'], // Изменено на currency
  Debt: ['currency', 'Дебет'],            // Изменено на currency
  Cred: ['currency', 'Кредит'],           // Изменено на currency
  Comment: ['string', 'Комментарий']
};
