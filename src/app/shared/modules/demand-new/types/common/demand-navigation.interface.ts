import { DemandAction } from './demand-action';
import { DemandActionType } from './demand-action-type';

/**
 *
 * @demandAction Определяет тип запроса (Запрос на ЭЦП, на Факторинг и тд)
 * @demandActionType Определяет тип действия (Редактирование, Создание, Просмотр, Редактирование черновика и тд)
 * @interface DemandNavigationInterface
 */
export interface DemandNavigationInterface {
  demandAction: DemandAction;
  demandActionType: DemandActionType;
}
