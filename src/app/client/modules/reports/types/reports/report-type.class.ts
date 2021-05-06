export class ReportTypeInterface {
  static Types: Array<ReportTypeInterface> = [
    {
      id: 4,
      type: "DocumentsIncome",
      group: "Operations",
      title: "Прием Документов",
      description:
        'Список операций "Прием Документов" в разрезе накладных за указанный период',
      args: function (): ReportArgs {
        return new StandartReportArgs("DocumentsIncome", "Прием Документов");
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Delivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "Shipment", title: "Накладная" },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        {
          name: "DateAddon",
          title: "Дата Оплаты",
          type: "date",
          visible: false,
        },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        { name: "OperationType", title: "Тип Операции", visible: false },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        {
          name: "DateToCustomer",
          title: "Дата Поставщику",
          type: "date",
          visible: false,
        },
        { name: "MoneyInCome", title: "Сумма операции", type: "number" },
        {
          name: "MoneyToCustomer",
          title: "Сумма поставщику",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyAddonToCustomer",
          title: "Сумма зачета",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyFinansing",
          title: "Сумма погашения",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
      ],
    },
    {
      id: 5,
      type: "CustomerFinansing",
      group: "Operations",
      title: "Выплата Финансирования",
      description:
        'Список операций "Выплата Финансирования" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs(
          "CustomerFinansing",
          "Выплата Финансирования"
        );
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Delivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "Shipment", title: "Накладная" },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        {
          name: "DateAddon",
          title: "Дата Оплаты",
          type: "date",
          visible: false,
        },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        { name: "OperationType", title: "Тип Операции", visible: false },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        { name: "DateToCustomer", title: "Дата Поставщику", type: "date" },
        {
          name: "MoneyInCome",
          title: "Сумма операции",
          type: "number",
          visible: false,
        },
        { name: "MoneyToCustomer", title: "Сумма поставщику", type: "number" },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
        },
        { name: "MoneyAddonToCustomer", title: "Сумма зачета", type: "number" },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyFinansing",
          title: "Сумма погашения",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
      ],
    },
    {
      id: 9,
      type: "PaymentAll",
      group: "Operations",
      title: "Обработка Платежей",
      description:
        'Список операций "Обработка Платежа" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs("PaymentAll", "Обработка Платежей");
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Delivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "Shipment", title: "Накладная" },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        { name: "DateAddon", title: "Дата Оплаты", type: "date" },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        { name: "OperationType", title: "Тип Операции", visible: false },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        { name: "DateToCustomer", title: "Дата Поставщику", type: "date" },
        { name: "MoneyInCome", title: "Сумма операции", type: "number" },
        { name: "MoneyToCustomer", title: "Сумма поставщику", type: "number" },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
        },
        { name: "MoneyAddonToCustomer", title: "Сумма зачета", type: "number" },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        { name: "MoneyFinansing", title: "Сумма погашения", type: "number" },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
      ],
    },
    {
      id: 10,
      type: "ShipmentCorrection",
      group: "Operations",
      title: "Коррекция Поставок",
      description:
        'Список операций "Коррекция Поставок" в разрезе накладных за указанный период',
      args: function () {
        return new StandartReportArgs(
          "ShipmentCorrection",
          "Коррекция Поставок"
        );
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Delivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "Shipment", title: "Накладная" },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        {
          name: "DateAddon",
          title: "Дата Оплаты",
          type: "date",
          visible: false,
        },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        { name: "OperationType", title: "Тип Операции", visible: false },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        {
          name: "DateToCustomer",
          title: "Дата Поставщику",
          type: "date",
          visible: false,
        },
        { name: "MoneyInCome", title: "Сумма операции", type: "number" },
        {
          name: "MoneyToCustomer",
          title: "Сумма поставщику",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyAddonToCustomer",
          title: "Сумма зачета",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyFinansing",
          title: "Сумма погашения",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
      ],
    },
    {
      id: 16,
      type: "Accreditive",
      group: "Operations",
      title: "Аккредитив",
      description:
        "Список операций пополнения Аккредидитов за указанный период",
      args: function () {
        return new StandartReportArgs("Accreditive", "Аккредитив");
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Title", title: "№ Счета" },
        { name: "DateOpen", title: "Дата открытия", type: "date" },
        {
          name: "DateExpire",
          title: "Срок действия",
          type: "date",
          visible: false,
        },
        { name: "DeliveryNumber", title: "Договор Поставки", visible: false },
        { name: "NumberShipment", title: "Номер Поставки", visible: false },
        { name: "DateOperation", title: "Дата операции", type: "date" },
        { name: "OperationType", title: "Тип операции" },
        { name: "ValueOperation", title: "Сумма операции", type: "number" },
        { name: "Rest", title: "Остаток", type: "number" },
      ],
    },
    {
      id: 17,
      type: "Commission",
      group: "Operations",
      title: "Комиссии",
      description: "Списания комисии в разрезе накладных за указанный период",
      args: function () {
        return new StandartReportArgs("Commission", "Комиссии");
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Delivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "Shipment", title: "Накладная" },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        {
          name: "DateAddon",
          title: "Дата Оплаты",
          type: "date",
          visible: false,
        },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        { name: "OperationType", title: "Тип Операции" },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        {
          name: "DateToCustomer",
          title: "Дата Поставщику",
          type: "date",
          visible: false,
        },
        {
          name: "MoneyInCome",
          title: "Сумма операции",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyToCustomer",
          title: "Сумма поставщику",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
        },
        {
          name: "MoneyAddonToCustomer",
          title: "Сумма зачета",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyFinansing",
          title: "Сумма погашения",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
      ],
    },
    {
      id: 11,
      type: "Agregate",
      group: "Shipments",
      title: "Агрегатный",
      description:
        "Агрегатный отчет по накладным с указанием их сосояния на указанную дату",
      template: "agregate-shipments.args.report.partial.html",
      args: function () {
        return new AgregateReportArgs("Agregate", "Агрегатный", "undone");
      },
      columns: [
        { name: "ShipmentID", title: "ID Накладной", visible: false },
        { name: "CustomerTitle", title: "Поставщик", visible: false },
        { name: "DebtorTitle", title: "Дебитор" },
        { name: "ContractDeliveryNumber", title: "Договор Поставки" },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "RequestNumber", title: "Номер Заявки", visible: false },
        { name: "ShipmentFullTitle", title: "Накладная" },
        { name: "CurrencyTitle", title: "Валюта", visible: false },
        { name: "ShipmentSumm", title: "Сумма накладной", type: "number" },
        { name: "DateShipment", title: "Дата поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата оплаты по договору",
          type: "date",
          visible: false,
        },
        { name: "DateAddon", title: "Дата оплаты", type: "date" },
        { name: "DutyDebtor", title: "Долг Дебитора", type: "number" },
        { name: "DutyCustomer", title: "Долг Поставщика", type: "number" },
        {
          name: "DutyCommission",
          title: "Долг Комиссии",
          type: "number",
          visible: false,
        },
        {
          name: "DateOpen",
          title: "Дата открытия накладной",
          type: "date",
          visible: false,
        },
        {
          name: "DatePayed",
          title: "Дата погашения",
          type: "date",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        {
          name: "PenyPercent",
          title: "% Пени",
          type: "number",
          visible: false,
        },
        { name: "StatusTitle", title: "Статус" },
      ],
    },
    {
      id: 12,
      type: "DebtorDelay",
      group: "Shipments",
      title: "Просрочки Покупателей",
      description:
        "Список накладных, оплата по которым была просрочена (на указанное количество дней) на указанную дату",
      template: "delay.args.report.partial.html",
      args: function () {
        return new DelaysReportArgs("DebtorDelay", "Просрочки Покупателей");
      },
      columns: [
        { name: "ShipmentID", title: "ID Накладной", visible: false },
        { name: "CustomerTitle", title: "Поставщик", visible: false },
        { name: "DebtorTitle", title: "Дебитор" },
        { name: "ContractDeliveryNumber", title: "Договор Поставки" },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "RequestNumber", title: "Номер Заявки", visible: false },
        { name: "ShipmentFullTitle", title: "Накладная" },
        { name: "CurrencyTitle", title: "Валюта", visible: false },
        { name: "ShipmentSumm", title: "Сумма накладной", type: "number" },
        { name: "DateShipment", title: "Дата поставки", type: "date" },
        { name: "DatePayment", title: "Дата оплаты по договору", type: "date" },
        { name: "DateAddon", title: "Дата оплаты", type: "date" },
        { name: "DutyDebtor", title: "Долг Дебитора", type: "number" },
        { name: "DutyCustomer", title: "Долг Поставщика", type: "number" },
        {
          name: "DutyCommission",
          title: "Долг Комиссии",
          type: "number",
          visible: false,
        },
        {
          name: "DateOpen",
          title: "Дата открытия накладной",
          type: "date",
          visible: false,
        },
        {
          name: "DatePayed",
          title: "Дата погашения",
          type: "date",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionBottomBorder",
          title: "КП2 мин",
          type: "number",
          visible: false,
        },
        {
          name: "PenyPercent",
          title: "% Пени",
          type: "number",
          visible: false,
        },
        { name: "StatusTitle", title: "Статус" },
      ],
    },
    {
      id: 19,
      type: "HistoryShipments",
      group: "Shipments",
      title: "История Накладных",
      description: "История накладных",
      args: function () {
        return new StandartReportArgs("HistoryShipments", "История Накладных");
      },
      columns: [
        { name: "ShipmentID", title: "ID Накладной", visible: false },
        {
          name: "OperationID",
          title: "ID операции",
          type: "string",
          visible: false,
        },
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        {
          name: "ContractFactoring",
          title: "Договор Факторинга",
          type: "string",
          visible: false,
        },
        { name: "ContractDelivery", title: "Договор Поставки", visible: false },
        { name: "RequestNumber", title: "№ Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "NumberWaybill", title: "Номер Накладной" },
        { name: "NumberAccountInvoice", title: "Номер C/Ф", visible: false },
        { name: "DateShipment", title: "Дата Поставки", type: "date" },
        {
          name: "DatePayment",
          title: "Дата Оплаты по Договору",
          type: "date",
          visible: false,
        },
        {
          name: "DateAddon",
          title: "Дата Оплаты",
          type: "date",
          visible: false,
        },
        { name: "ShipmentSumm", title: "Сумма Накладной", type: "number" },
        { name: "StatusFinansing", title: "С финансированием", visible: false },
        { name: "FinancingPercent", title: "% Финансирования", visible: false },
        {
          name: "DutyDebtor",
          title: "Долг Дебитора",
          type: "number",
          visible: false,
        },
        {
          name: "DutyCustomer",
          title: "Долг Поставщика",
          type: "number",
          visible: false,
        },
        {
          name: "DateOpen",
          title: "Дата создания накладной",
          type: "number",
          visible: false,
        },
        {
          name: "DatePayed",
          title: "Дата оплаты накладой",
          type: "number",
          visible: false,
        },
        { name: "OperationTypeTitle", title: "Тип Операции" },
        { name: "DateOperation", title: "Дата Операции", type: "date" },
        { name: "DateToCustomer", title: "Дата Поставщику", type: "date" },
        { name: "MoneyInCome", title: "Сумма операции", type: "number" },
        { name: "MoneyToCustomer", title: "Сумма поставщику", type: "number" },
        { name: "MoneyFinansing", title: "Сумма погашения", type: "number" },
        {
          name: "MoneyShadowCommission",
          title: "Сумма комиссии",
          type: "number",
        },
        { name: "MoneyAddonToCustomer", title: "Сумма зачета", type: "number" },
        {
          name: "MoneyCommission",
          title: "Сумма КП2",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesStandart",
          title: "Сумма КП1",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyResoursesExtra",
          title: "Сумма КП1 экстра",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPenalty",
          title: "Сумма штрафа",
          type: "number",
          visible: false,
        },
        {
          name: "MoneyPeny",
          title: "Сумма пени",
          type: "number",
          visible: false,
        },
        {
          name: "CommissionPercent",
          title: "КП2",
          type: "number",
          visible: false,
        },
        {
          name: "RateExtra",
          title: "КП1 экстра",
          type: "number",
          visible: false,
        },
        { name: "RateStandart", title: "КП1", type: "number", visible: false },
        { name: "RateValue", title: "КП3", type: "number", visible: false },
      ],
    },
    {
      id: 14,
      type: "PaymentsIncome",
      group: "Payments",
      title: "Полученные Платежи",
      description:
        "Список полученных платежей по Договорам Поставок за указанный период",
      args: function () {
        return new StandartReportArgs("PaymentsIncome", "Полученные Платежи");
      },
    },
    {
      id: 18,
      type: "ExtractExternal",
      group: "Payments",
      title: "Выписка по расчетному счету",
      description: "Список транзакций по расчетному счету",
      template: "account-transactions.args.report.partial.html",
      args: function () {
        return new AccountTransactionsReportArgs(
          "ExtractExternal",
          "Выписка по расчетному счету"
        );
      },
      columns: [
        { name: "ShipmentID", title: "ID Накладной", visible: false },
        { name: "FactoringOperationID", title: "ID Операции", visible: false },
        {
          name: "FactoringPostingTypeID",
          title: "Тип Проводки",
          visible: false,
        },
        { name: "OrderNumber", title: "Номер распоряжения" },
        { name: "OrderDate", title: "Дата распоряжения", type: "date" },
        { name: "Invoice", title: "Счет-Фактура" },
        { name: "Shipment", title: "Накладная" },
        { name: "RequestNumber", title: "Номер Заявки", visible: false },
        {
          name: "RequestDate",
          title: "Дата Заявки",
          type: "date",
          visible: false,
        },
        { name: "ShipmentDate", title: "Дата поставки", type: "date" },
        { name: "DateToCustomer", title: "Дата поставщику", type: "date" },
        { name: "Payment", title: "Сумма", type: "number" },
        { name: "AccountDebt", title: "AccountDebt", visible: false },
        { name: "AccountCredit", title: "AccountCredit", visible: false },
        { name: "Comment", title: "Назначение" },
      ],
    },
    {
      id: 13,
      type: "AgregateDelivery",
      group: "Other",
      title: "Агрегатный Сводный",
      description:
        "Агрегатный отчет по Договорам Поставок с указанием задолженности по договорам на указанную дату",
      template: "agregate-delivery.args.report.partial.html",
      args: function () {
        return new DateReportArgs("AgregateDelivery", "Агрегатный Сводный");
      },
      columns: [
        {
          name: "ContractDeliveryID",
          title: "ID Договора Поставки",
          visible: false,
        },
        { name: "CustomerTitle", title: "Поставщик", visible: false },
        { name: "DebtorTitle", title: "Дебитор" },
        { name: "Number", title: "Номер ДП" },
        { name: "StartTime", title: "Начало ДП", type: "date" },
        { name: "EndTime", title: "Окончание ДП", type: "date" },
        { name: "CDAddonNumber", title: "№ Доп Соглашения", visible: false },
        {
          name: "CDAddonDate",
          title: "Дата Доп Соглашения",
          type: "date",
          visible: false,
        },
        { name: "TariffTitle", title: "Тариф" },
        { name: "Delay", title: "Отсрочка" },
        { name: "DelayMin", title: "Отсрочка мин", visible: false },
        { name: "DelayMax", title: "Отсрочка макс", visible: false },
        { name: "ShipmentsCount", title: "Кол-во накладных", visible: false },
        { name: "DutyDebtor", title: "Долг Дебитора", type: "number" },
        { name: "DutyCustomer", title: "Долг Поставщика", type: "number" },
        {
          name: "DutyCommission",
          title: "Долг Комиссии",
          type: "number",
          visible: false,
        },
        {
          name: "FinancingPercent",
          title: "% финансирования",
          type: "number",
          visible: false,
        },
        { name: "FinalFreeLimit", title: "Свободный лимит", type: "number" },
      ],
    },
    {
      id: 15,
      type: "ReportProtocol",
      group: "Other",
      title: "Протокол Отчетов",
      description: "Список выполненных клиентом отчетов за указанный период",
      template: "protocol.args.report.partial.html",
      args: function () {
        return new ProtocolReportArgs("ReportProtocol", "Протокол Отчетов");
      },
    },
    {
      id: 20,
      type: "Invoices",
      group: "Other",
      title: "Счета-Фактуры",
      description:
        "Список выставленных Банком счетов-фактур за указанный период",
      template: "period.args.report.partial.html",
      args: function () {
        return new PeriodReportArgs("Invoices", "Счета-Фактуры");
      },
      columns: [
        { name: "Customer", title: "Поставщик", visible: false },
        { name: "Debtor", title: "Дебитор" },
        { name: "Inn", title: "ИНН Поставщика", visible: false },
        { name: "OrderID", title: "Распоряжение" },
        { name: "InvoiceNumber", title: "Номер Счета-Фактуры" },
        { name: "InvoiceDate", title: "Дата Счета-Фактуры", type: "date" },
        { name: "Total", title: "Сумма итого", type: "number" },
        { name: "Amount", title: "Сумма без НДС", type: "number" },
        { name: "Nds", title: "Сумма НДС", type: "number" },
        { name: "State", title: "Статус", visible: false },
        { name: "StateTitle", title: "Статус", visible: true },
      ],
    },
    {
      id: 21,
      type: "OrderPostings",
      group: "Other",
      title: "Реестр Распоряжения",
      description: "Детализация реестра распоряжения в виде списка проводок",
      template: "id.args.report.partial.html",
      args: function () {
        return new IDFilterArgs(
          "OrderPostings",
          "Реестр Распоряжения",
          0,
          "Номер Распоряжения"
        );
      },
      columns: [
        { name: "Customer", title: "Поставщик" },
        { name: "Debtor", title: "Дебитор" },
        { name: "OrderID", title: "Номер Реестра" },
        { name: "Date", title: "Дата", type: "date" },
        { name: "Payment", title: "Сумма", type: "number" },
        { name: "Debt", title: "Дебит", visible: false },
        { name: "Cred", title: "Кредит", visible: false },
        { name: "Comment", title: "Назначение" },
      ],
    },
    {
      id: 22,
      type: "DebtorReport",
      group: "Other",
      title: "Отчеты Дебиторов",
      description: "Отчеты, полученные от Дебиторов",
      template: "period.args.report.partial.html",
      args: function () {
        return new PeriodReportArgs("DebtorReport", "Отчеты Дебиторов");
      },
      columns: [
        { name: "Customer", title: "Поставщик" },
        { name: "Debtor", title: "Дебитор" },
        { name: "ReportType", title: "Тип Отчета", details: true },
        { name: "ReportDate", title: "Дата Отчета", type: "date" },
        { name: "ReportTotal", title: "Сумма Отчета", type: "number" },
      ],
      details: function (record) {
        return new IDReportArgs(
          "DebtorReportDetail",
          "Отчет дебитора (детализация)",
          record.DebtorReportID,
          "Номер Отчета"
        );
      },
    },
    {
      id: 23,
      type: "DebtorReportDetail",
      group: "Hidden",
      title: "Отчет дебитора (детализация)",
      description: "Детализация Отчета, полученного от Дебитора",
      template: "id.args.report.partial.html",
      args: function () {
        return new IDReportArgs(
          "DebtorReportDetail",
          "Отчет дебитора (детализация)",
          0,
          "Номер Отчета"
        );
      },
      columns: [
        { name: "ReportType", title: "Тип Отчета", visible: false },
        { name: "RecordType", title: "Тип Записи" },
        { name: "InvoiceRef", title: "Ссылка", visible: false },
        { name: "WaybillNumber", title: "№ Накладной" },
        { name: "WaybillDate", title: "Дата Накладной", type: "date" },
        { name: "InvoiceNumber", title: "№ Сч-Ф" },
        { name: "InvoiceDateIncome", title: "Дата Сч-Ф", type: "date" },
        { name: "InvoiceValueSumm", title: "Сумма", type: "number" },
        { name: "ShipmentDate", title: "Дата Поставки", type: "date" },
        { name: "InvoiceDatePayment", title: "Дата Оплаты", type: "date" },
      ],
    },
  ];

  static getType(name: string): ReportType;
  static getType(id: number): ReportType;
  static getType(value: any): ReportType {
    if (value && typeof value == "string") {
      for (var i = 0; i < ReportType.Types.length; i++) {
        var type = ReportType.Types[i];
        if (
          type.type.toLowerCase() == value.toLowerCase() ||
          type.title.toLowerCase() == value.toLowerCase()
        )
          return type;
      }
    } else if (value && typeof value == "number") {
      for (var i = 0; i < ReportType.Types.length; i++)
        if (ReportType.Types[i].id == value) return ReportType.Types[i];
    }

    return null;
  }
}
