/**
 * Описание интерфейса
 *
 * @interface ControlConfigReportInterface
 * @isEmpty {boolean} отвечает за отображение сообщения "Для этого отчета не нужны параметры...
В отчете будут указаны актуальные данные на текущий момент."
 * @isDateFrom {boolean} отвечает за отображение поля "Дата С"
 * @isDateTo {boolean} отвечает за отображение поля "Дата По"
 * @isDebitor {boolean} отвечает за отображение поля "Дебитор"
 * @isOnDate {boolean} отвечает за отображение поля "На Дату"
 * @isStatusRequest {boolean} отвечает за отображение поля "Статус Накладных"
 * @isDaysDelay {boolean} отвечает за отображение поля "Количество дней просрочки"
 * @isNumberOrder {boolean} отвечает за отображение поля "Номер Распоряжения"
 * @isNumberRequest {boolean} отвечает за отображение поля "Номер Заявки"
 * @isDateFrom {boolean} отвечает за отображение поля "Дата с"
 * @isSelectReportDropdown {boolean} отвечает за отображение поля с выбором отчетов - дропдаун
 * @isSelectReportCheckbox {boolean} отвечает за отображение поля с выбором отчетов - чекбокс
 */
export interface ControlConfigReportInterface {
  isEmpty?: boolean;
  isDateFrom?: boolean;
  isDateTo?: boolean;
  isDebitor?: boolean;
  isOnDate?: boolean;
  isStatusRequest?: boolean;
  isDaysDelay?: boolean;
  isNumberOrder?: boolean;
  isNumberRequest?: boolean;
  isSelectReportDropdown?: boolean;
  isSelectReportCheckbox?: boolean;
}
