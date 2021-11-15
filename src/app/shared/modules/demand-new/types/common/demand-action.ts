/**
 *
 *
 * @EDS 'DigitalSignature' запрос на электронную цифровую подпись
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
  EDS = 'EDS',
  EDIT_PROFILE = 'EDIT_PROFILE',
  FREE_REQUEST = 'FREE_REQUEST',
  SURETY = 'SURETY',
  UPDATE_LIMIT = 'UPDATE_LIMIT',
  CREATE_DEBITOR = 'CREATE_DEBITOR',
  VERIFY = 'VERIFY',
  FACTORING = 'FACTORING',
  AGENT_FACTORING = 'AGENT_FACTORING',
}
