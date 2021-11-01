/**
 *
 *
 * @EDS запрос на электронную цифровую подпись
 * @EDIT_PROFILE запрос на редактирование профиля
 * @FREE_REQUEST запрос на свободную тему
 * @SURETY запрос на поручительство
 * @UPDATE_LIMIT запрос на увеличение лимита
 * @CREATE_DEBITOR запрос на нового дебитора
 * @VERIFY запрос на регистрацию канала верификации
 * @FACTORING запрос на факторинг
 * @AGENT_FACTORING запрос на агентский факторинг
 */
 export enum DemandAction {
  EDS = 'eds',
  EDIT_PROFILE = 'edit-profile',
  FREE_REQUEST = 'free-request',
  SURETY = 'surety',
  UPDATE_LIMIT = 'update-limit',
  CREATE_DEBITOR = 'create-debitor',
  VERIFY = 'verify',
  FACTORING = 'factoring',
  AGENT_FACTORING = 'agent-factoring',
}
