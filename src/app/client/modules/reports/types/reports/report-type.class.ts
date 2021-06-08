import { AccountTransactionsReportArgs } from './account-transactios-report-args.class';
import { AgregateReportArgs } from './agregate-report-args.class';
import { DateReportArgs } from './date-report-args.class';
import { DelaysReportArgs } from './delays-report-args.interface';
import { IDFilterArgs } from './id-filter-args.class';
import { IDReportArgs } from './id-report-args.class';
import { PeriodReportArgs } from './period-report-args.class';
import { ProtocolReportArgs } from './protocol-report-artgs.class';
import { ReportArgs } from './report-args.class';
import { ReportTypeInterface } from './report-type.interface';
import { StandartReportArgs } from './standart-report-args.class';

export class ReportType {
  static Types: Array<ReportTypeInterface> = [
    {
      id: 4,
      type: 'DocumentsIncome',
      group: 'Operations',
      title: 'Прием Документов',
      description:
        'Список операций "Прием Документов" в разрезе накладных за указанный период',
      args: function (): ReportArgs {
        return new StandartReportArgs('DocumentsIncome', 'Прием Документов');
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Delivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationType',
          title: 'Тип Операции',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: false,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
      ],
    },
    {
      id: 5,
      type: 'CustomerFinansing',
      group: 'Operations',
      title: 'Выплата Финансирования',
      description:
        'Список операций "Выплата Финансирования" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs(
          'CustomerFinansing',
          'Выплата Финансирования'
        );
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Delivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationType',
          title: 'Тип Операции',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: true,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
      ],
    },
    {
      id: 9,
      type: 'PaymentAll',
      group: 'Operations',
      title: 'Обработка Платежей',
      description:
        'Список операций "Обработка Платежа" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs('PaymentAll', 'Обработка Платежей');
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Delivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: true,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationType',
          title: 'Тип Операции',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: true,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
      ],
    },
    {
      id: 10,
      type: 'ShipmentCorrection',
      group: 'Operations',
      title: 'Коррекция Поставок',
      description:
        'Список операций "Коррекция Поставок" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs(
          'ShipmentCorrection',
          'Коррекция Поставок'
        );
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Delivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationType',
          title: 'Тип Операции',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: false,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
      ],
    },
    {
      id: 16,
      type: 'Accreditive',
      group: 'Operations',
      title: 'Аккредитив',
      description:
        'Список операций пополнения Аккредидитов за указанный период',
      args: function () {
        return new StandartReportArgs('Accreditive', 'Аккредитив');
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        { name: 'Title', title: '№ Счета', type: 'string', visible: true },
        {
          name: 'DateOpen',
          title: 'Дата открытия',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateExpire',
          title: 'Срок действия',
          type: 'date',
          visible: false,
        },
        {
          name: 'DeliveryNumber',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'NumberShipment',
          title: 'Номер Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateOperation',
          title: 'Дата операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'OperationType',
          title: 'Тип операции',
          type: 'string',
          visible: true,
        },
        {
          name: 'ValueOperation',
          title: 'Сумма операции',
          type: 'number',
          visible: true,
        },
        { name: 'Rest', title: 'Остаток', type: 'number', visible: true },
      ],
    },
    {
      id: 17,
      type: 'Commission',
      group: 'Operations',
      title: 'Комиссии',
      description: 'Списания комисии в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs('Commission', 'Комиссии');
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Delivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationType',
          title: 'Тип Операции',
          type: 'string',
          visible: true,
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: false,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
      ],
    },
    {
      id: 11,
      type: 'Agregate',
      group: 'Shipments',
      title: 'Агрегатный',
      description:
        'Агрегатный отчет по накладным с указанием их сосояния на указанную дату',
      template: 'agregate-shipments.args.report.partial.html',
      args: function () {
        return new AgregateReportArgs('Agregate', 'Агрегатный', 'undone');
      },
      columns: [
        {
          name: 'ShipmentID',
          title: 'ID Накладной',
          visible: false,
          type: 'string',
        },
        {
          name: 'CustomerTitle',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        {
          name: 'DebtorTitle',
          title: 'Дебитор',
          type: 'string',
          visible: true,
        },
        {
          name: 'ContractDeliveryNumber',
          title: 'Договор Поставки',
          type: 'string',
          visible: true,
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        {
          name: 'RequestNumber',
          title: 'Номер Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'ShipmentFullTitle',
          title: 'Накладная',
          type: 'string',
          visible: true,
        },
        {
          name: 'CurrencyTitle',
          title: 'Валюта',
          visible: false,
          type: 'string',
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'DateShipment',
          title: 'Дата поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата оплаты по договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата оплаты',
          type: 'date',
          visible: true,
        },
        {
          name: 'DutyDebtor',
          title: 'Долг Дебитора',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCustomer',
          title: 'Долг Поставщика',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCommission',
          title: 'Долг Комиссии',
          type: 'number',
          visible: false,
        },
        {
          name: 'DateOpen',
          title: 'Дата открытия накладной',
          type: 'date',
          visible: false,
        },
        {
          name: 'DatePayed',
          title: 'Дата погашения',
          type: 'date',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        {
          name: 'PenyPercent',
          title: '% Пени',
          type: 'number',
          visible: false,
        },
        { name: 'StatusTitle', title: 'Статус', type: 'string', visible: true },
      ],
    },
    {
      id: 12,
      type: 'DebtorDelay',
      group: 'Shipments',
      title: 'Просрочки Покупателей',
      description:
        'Список накладных, оплата по которым была просрочена (на указанное количество дней) на указанную дату',
      template: 'delay.args.report.partial.html',
      args: function () {
        return new DelaysReportArgs('DebtorDelay', 'Просрочки Покупателей');
      },
      columns: [
        {
          name: 'ShipmentID',
          title: 'ID Накладной',
          visible: false,
          type: 'string',
        },
        {
          name: 'CustomerTitle',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        {
          name: 'DebtorTitle',
          title: 'Дебитор',
          type: 'string',
          visible: true,
        },
        {
          name: 'ContractDeliveryNumber',
          title: 'Договор Поставки',
          type: 'string',
          visible: true,
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        {
          name: 'RequestNumber',
          title: 'Номер Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'ShipmentFullTitle',
          title: 'Накладная',
          type: 'string',
          visible: true,
        },
        {
          name: 'CurrencyTitle',
          title: 'Валюта',
          visible: false,
          type: 'string',
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'DateShipment',
          title: 'Дата поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата оплаты по договору',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateAddon',
          title: 'Дата оплаты',
          type: 'date',
          visible: true,
        },
        {
          name: 'DutyDebtor',
          title: 'Долг Дебитора',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCustomer',
          title: 'Долг Поставщика',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCommission',
          title: 'Долг Комиссии',
          type: 'number',
          visible: false,
        },
        {
          name: 'DateOpen',
          title: 'Дата открытия накладной',
          type: 'date',
          visible: false,
        },
        {
          name: 'DatePayed',
          title: 'Дата погашения',
          type: 'date',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionBottomBorder',
          title: 'КП2 мин',
          type: 'number',
          visible: false,
        },
        {
          name: 'PenyPercent',
          title: '% Пени',
          type: 'number',
          visible: false,
        },
        { name: 'StatusTitle', title: 'Статус', type: 'string', visible: true },
      ],
    },
    {
      id: 19,
      type: 'HistoryShipments',
      group: 'Shipments',
      title: 'История Накладных',
      description: 'История накладных',
      args: function () {
        return new StandartReportArgs('HistoryShipments', 'История Накладных');
      },
      columns: [
        {
          name: 'ShipmentID',
          title: 'ID Накладной',
          visible: false,
          type: 'string',
        },
        {
          name: 'OperationID',
          title: 'ID операции',
          type: 'string',
          visible: false,
        },
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'ContractFactoring',
          title: 'Договор Факторинга',
          type: 'string',
          visible: false,
        },
        {
          name: 'ContractDelivery',
          title: 'Договор Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestNumber',
          title: '№ Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        {
          name: 'NumberWaybill',
          title: 'Номер Накладной',
          type: 'string',
          visible: true,
        },
        {
          name: 'NumberAccountInvoice',
          title: 'Номер C/Ф',
          visible: false,
          type: 'string',
        },
        {
          name: 'DateShipment',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DatePayment',
          title: 'Дата Оплаты по Договору',
          type: 'date',
          visible: false,
        },
        {
          name: 'DateAddon',
          title: 'Дата Оплаты',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentSumm',
          title: 'Сумма Накладной',
          type: 'number',
          visible: true,
        },
        {
          name: 'StatusFinansing',
          title: 'С финансированием',
          visible: false,
          type: 'string',
        },
        {
          name: 'FinancingPercent',
          title: '% Финансирования',
          visible: false,
          type: 'string',
        },
        {
          name: 'DutyDebtor',
          title: 'Долг Дебитора',
          type: 'number',
          visible: false,
        },
        {
          name: 'DutyCustomer',
          title: 'Долг Поставщика',
          type: 'number',
          visible: false,
        },
        {
          name: 'DateOpen',
          title: 'Дата создания накладной',
          type: 'number',
          visible: false,
        },
        {
          name: 'DatePayed',
          title: 'Дата оплаты накладой',
          type: 'number',
          visible: false,
        },
        {
          name: 'OperationTypeTitle',
          title: 'Тип Операции',
          type: 'string',
          visible: true,
        },
        {
          name: 'DateOperation',
          title: 'Дата Операции',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата Поставщику',
          type: 'date',
          visible: true,
        },
        {
          name: 'MoneyInCome',
          title: 'Сумма операции',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyToCustomer',
          title: 'Сумма поставщику',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyFinansing',
          title: 'Сумма погашения',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyShadowCommission',
          title: 'Сумма комиссии',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyAddonToCustomer',
          title: 'Сумма зачета',
          type: 'number',
          visible: true,
        },
        {
          name: 'MoneyCommission',
          title: 'Сумма КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesStandart',
          title: 'Сумма КП1',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyResoursesExtra',
          title: 'Сумма КП1 экстра',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPenalty',
          title: 'Сумма штрафа',
          type: 'number',
          visible: false,
        },
        {
          name: 'MoneyPeny',
          title: 'Сумма пени',
          type: 'number',
          visible: false,
        },
        {
          name: 'CommissionPercent',
          title: 'КП2',
          type: 'number',
          visible: false,
        },
        {
          name: 'RateExtra',
          title: 'КП1 экстра',
          type: 'number',
          visible: false,
        },
        { name: 'RateStandart', title: 'КП1', type: 'number', visible: false },
        { name: 'RateValue', title: 'КП3', type: 'number', visible: false },
      ],
    },
    {
      id: 14,
      type: 'PaymentsIncome',
      group: 'Payments',
      title: 'Полученные Платежи',
      description:
        'Список полученных платежей по Договорам Поставок за указанный период',
      args: function () {
        return new StandartReportArgs('PaymentsIncome', 'Полученные Платежи');
      },
      columns: [
        {
          name: 'ABSID',
          title: 'ABSID',
          type: 'string',
          visible: true
        },
        {
          name: 'AccountCredit',
          title: 'Номер',
          type: 'string',
          visible: true
        },
        {
          name: 'AccountDebt',
          title: 'Номер',
          type: 'string',
          visible: true
        },
        {
          name: 'Comment',
          title: 'Комментарий',
          type: 'string',
          visible: false
        },
        {
          name: 'Date',
          title: 'Date',
          type: 'date',
          visible: true
        },
        {
          name: 'DebtorID',
          title: 'DebtorID',
          type: 'string',
          visible: false
        },
        {
          name: 'DebtorTitle',
          title: 'DebtorTitle',
          type: 'string',
          visible: false
        },
        {
          name: 'DocNumber',
          title: 'DocNumber',
          type: 'string',
          visible: true
        },
        {
          name: 'PayerAccount',
          title: 'PayerAccount',
          type: 'string',
          visible: true
        },
        {
          name: 'PayerBankTitle',
          title: 'PayerBankTitle',
          type: 'string',
          visible: true
        },
        {
          name: 'PayerCorrespondent',
          title: 'PayerCorrespondent',
          type: 'string',
          visible: true
        },
        {
          name: 'PayerINN',
          title: 'PayerINN',
          type: 'string',
          visible: true
        },
        {
          name: 'PayerTitle',
          title: 'PayerTitle',
          type: 'string',
          visible: true
        },
        {
          name: 'Summ',
          title: 'Summ',
          type: 'number',
          visible: true
        },
      ]
    },
    {
      id: 18,
      type: 'ExtractExternal',
      group: 'Payments',
      title: 'Выписка по расчетному счету',
      description: 'Список транзакций по расчетному счету',
      template: 'account-transactions.args.report.partial.html',
      args: function () {
        return new AccountTransactionsReportArgs(
          'ExtractExternal',
          'Выписка по расчетному счету'
        );
      },
      columns: [
        {
          name: 'ShipmentID',
          title: 'ID Накладной',
          visible: false,
          type: 'string',
        },
        {
          name: 'FactoringOperationID',
          title: 'ID Операции',
          visible: false,
          type: 'string',
        },
        {
          name: 'FactoringPostingTypeID',
          title: 'Тип Проводки',
          type: 'string',
          visible: false,
        },
        {
          name: 'OrderNumber',
          title: 'Номер распоряжения',
          type: 'string',
          visible: true,
        },
        {
          name: 'OrderDate',
          title: 'Дата распоряжения',
          type: 'date',
          visible: true,
        },
        {
          name: 'Invoice',
          title: 'Счет-Фактура',
          type: 'string',
          visible: true,
        },
        { name: 'Shipment', title: 'Накладная', type: 'string', visible: true },
        {
          name: 'RequestNumber',
          title: 'Номер Заявки',
          visible: false,
          type: 'string',
        },
        {
          name: 'RequestDate',
          title: 'Дата Заявки',
          type: 'date',
          visible: false,
        },
        {
          name: 'ShipmentDate',
          title: 'Дата поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'DateToCustomer',
          title: 'Дата поставщику',
          type: 'date',
          visible: true,
        },
        { name: 'Payment', title: 'Сумма', type: 'number', visible: true },
        {
          name: 'AccountDebt',
          title: 'AccountDebt',
          visible: false,
          type: 'string',
        },
        {
          name: 'AccountCredit',
          title: 'AccountCredit',
          visible: false,
          type: 'string',
        },
        { name: 'Comment', title: 'Назначение', type: 'string', visible: true },
      ],
    },
    {
      id: 13,
      type: 'AgregateDelivery',
      group: 'Other',
      title: 'Агрегатный Сводный',
      description:
        'Агрегатный отчет по Договорам Поставок с указанием задолженности по договорам на указанную дату',
      template: 'agregate-delivery.args.report.partial.html',
      args: function () {
        return new DateReportArgs('AgregateDelivery', 'Агрегатный Сводный');
      },
      columns: [
        {
          name: 'ContractDeliveryID',
          title: 'ID Договора Поставки',
          visible: false,
          type: 'string',
        },
        {
          name: 'CustomerTitle',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        {
          name: 'DebtorTitle',
          title: 'Дебитор',
          type: 'string',
          visible: true,
        },
        { name: 'Number', title: 'Номер ДП', type: 'string', visible: true },
        { name: 'StartTime', title: 'Начало ДП', type: 'date', visible: true },
        { name: 'EndTime', title: 'Окончание ДП', type: 'date', visible: true },
        {
          name: 'CDAddonNumber',
          title: '№ Доп Соглашения',
          visible: false,
          type: 'string',
        },
        {
          name: 'CDAddonDate',
          title: 'Дата Доп Соглашения',
          type: 'date',
          visible: false,
        },
        { name: 'TariffTitle', title: 'Тариф', type: 'string', visible: true },
        { name: 'Delay', title: 'Отсрочка', type: 'string', visible: true },
        {
          name: 'DelayMin',
          title: 'Отсрочка мин',
          visible: false,
          type: 'string',
        },
        {
          name: 'DelayMax',
          title: 'Отсрочка макс',
          visible: false,
          type: 'string',
        },
        {
          name: 'ShipmentsCount',
          title: 'Кол-во накладных',
          visible: false,
          type: 'string',
        },
        {
          name: 'DutyDebtor',
          title: 'Долг Дебитора',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCustomer',
          title: 'Долг Поставщика',
          type: 'number',
          visible: true,
        },
        {
          name: 'DutyCommission',
          title: 'Долг Комиссии',
          type: 'number',
          visible: false,
        },
        {
          name: 'FinancingPercent',
          title: '% финансирования',
          type: 'number',
          visible: false,
        },
        {
          name: 'FinalFreeLimit',
          title: 'Свободный лимит',
          type: 'number',
          visible: true,
        },
      ],
    },
    {
      id: 15,
      type: 'ReportProtocol',
      group: 'Other',
      title: 'Протокол Отчетов',
      description: 'Список выполненных клиентом отчетов за указанный период',
      template: 'protocol.args.report.partial.html',
      args: function () {
        return new ProtocolReportArgs('ReportProtocol', 'Протокол Отчетов');
      },
    },
    {
      id: 20,
      type: 'Invoices',
      group: 'Other',
      title: 'Счета-Фактуры',
      description:
        'Список выставленных Банком счетов-фактур за указанный период',
      template: 'period.args.report.partial.html',
      args: function () {
        return new PeriodReportArgs('Invoices', 'Счета-Фактуры');
      },
      columns: [
        {
          name: 'Customer',
          title: 'Поставщик',
          visible: false,
          type: 'string',
        },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'Inn',
          title: 'ИНН Поставщика',
          visible: false,
          type: 'string',
        },
        {
          name: 'OrderID',
          title: 'Распоряжение',
          type: 'string',
          visible: true,
        },
        {
          name: 'InvoiceNumber',
          title: 'Номер Счета-Фактуры',
          type: 'string',
          visible: true,
        },
        {
          name: 'InvoiceDate',
          title: 'Дата Счета-Фактуры',
          type: 'date',
          visible: true,
        },
        { name: 'Total', title: 'Сумма итого', type: 'number', visible: true },
        {
          name: 'Amount',
          title: 'Сумма без НДС',
          type: 'number',
          visible: true,
        },
        { name: 'Nds', title: 'Сумма НДС', type: 'number', visible: true },
        { name: 'State', title: 'Статус', visible: false, type: 'string' },
        { name: 'StateTitle', title: 'Статус', visible: true, type: 'string' },
      ],
    },
    {
      id: 21,
      type: 'OrderPostings',
      group: 'Other',
      title: 'Реестр Распоряжения',
      description: 'Детализация реестра распоряжения в виде списка проводок',
      template: 'id.args.report.partial.html',
      args: function () {
        return new IDFilterArgs(
          'OrderPostings',
          'Реестр Распоряжения',
          0,
          'Номер Распоряжения'
        );
      },
      columns: [
        { name: 'Customer', title: 'Поставщик', type: 'string', visible: true },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'OrderID',
          title: 'Номер Реестра',
          type: 'string',
          visible: true,
        },
        { name: 'Date', title: 'Дата', type: 'date', visible: true },
        { name: 'Payment', title: 'Сумма', type: 'number', visible: true },
        { name: 'Debt', title: 'Дебит', visible: false, type: 'string' },
        { name: 'Cred', title: 'Кредит', visible: false, type: 'string' },
        { name: 'Comment', title: 'Назначение', type: 'string', visible: true },
      ],
    },
    {
      id: 22,
      type: 'DebtorReport',
      group: 'Other',
      title: 'Отчеты Дебиторов',
      description: 'Отчеты, полученные от Дебиторов',
      template: 'period.args.report.partial.html',
      args: function () {
        return new PeriodReportArgs('DebtorReport', 'Отчеты Дебиторов');
      },
      columns: [
        { name: 'Customer', title: 'Поставщик', type: 'string', visible: true },
        { name: 'Debtor', title: 'Дебитор', type: 'string', visible: true },
        {
          name: 'ReportType',
          title: 'Тип Отчета',
          details: true,
          type: 'string',
          visible: true,
        },
        {
          name: 'ReportDate',
          title: 'Дата Отчета',
          type: 'date',
          visible: true,
        },
        {
          name: 'ReportTotal',
          title: 'Сумма Отчета',
          type: 'number',
          visible: true,
        },
      ],
      details: function (record) {
        return new IDReportArgs(
          'DebtorReportDetail',
          'Отчет дебитора (детализация)',
          record.DebtorReportID,
          'Номер Отчета'
        );
      },
    },
    {
      id: 23,
      type: 'DebtorReportDetail',
      group: 'Hidden',
      title: 'Отчет дебитора (детализация)',
      description: 'Детализация Отчета, полученного от Дебитора',
      template: 'id.args.report.partial.html',
      args: function () {
        return new IDReportArgs(
          'DebtorReportDetail',
          'Отчет дебитора (детализация)',
          0,
          'Номер Отчета'
        );
      },
      columns: [
        {
          name: 'ReportType',
          title: 'Тип Отчета',
          visible: false,
          type: 'string',
        },
        {
          name: 'RecordType',
          title: 'Тип Записи',
          type: 'string',
          visible: true,
        },
        { name: 'InvoiceRef', title: 'Ссылка', visible: false, type: 'string' },
        {
          name: 'WaybillNumber',
          title: '№ Накладной',
          type: 'string',
          visible: true,
        },
        {
          name: 'WaybillDate',
          title: 'Дата Накладной',
          type: 'date',
          visible: true,
        },
        {
          name: 'InvoiceNumber',
          title: '№ Сч-Ф',
          type: 'string',
          visible: true,
        },
        {
          name: 'InvoiceDateIncome',
          title: 'Дата Сч-Ф',
          type: 'date',
          visible: true,
        },
        {
          name: 'InvoiceValueSumm',
          title: 'Сумма',
          type: 'number',
          visible: true,
        },
        {
          name: 'ShipmentDate',
          title: 'Дата Поставки',
          type: 'date',
          visible: true,
        },
        {
          name: 'InvoiceDatePayment',
          title: 'Дата Оплаты',
          type: 'date',
          visible: true,
        },
      ],
    },
  ];

  static getType(value: any): ReportTypeInterface {
    if (value && typeof value == 'string') {
      for (var i = 0; i < ReportType.Types.length; i++) {
        var type: any = ReportType.Types[i];
        if (
          type.type.toLowerCase() == value.toLowerCase() ||
          type.title.toLowerCase() == value.toLowerCase()
        )
          return type;
      }
    } else if (value && typeof value == 'number') {
      for (var i = 0; i < ReportType.Types.length; i++) {
        let currentType: any = ReportType.Types[i];
        if (currentType.id === value) return ReportType.Types[i];
      }
    }

    return null;
  }
}
