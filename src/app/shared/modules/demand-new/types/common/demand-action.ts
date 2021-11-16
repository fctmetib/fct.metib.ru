/**
 * @EDS 'DigitalSignature' запрос на электронную цифровую подпись
 * @EDIT_PROFILE 'ProfileChange' запрос на редактирование профиля
 * @FREE_REQUEST 'Question' запрос на свободную тему
 * @SURETY 'Guarantee' запрос на поручительство
 * @UPDATE_LIMIT 'Limit' запрос на увеличение лимита
 * @CREATE_DEBITOR 'NewDebtor' запрос на нового дебитора
 * @VERIFY 'VerificationChannel' запрос на регистрацию канала верификации
 * @FACTORING запрос на факторинг
 * @AGENT_FACTORING запрос на агентский факторинг
 */
export enum DemandAction {
  EDS = 'DigitalSignature',
  EDIT_PROFILE = 'ProfileChange',
  FREE_REQUEST = 'Question',
  SURETY = 'Guarantee',
  UPDATE_LIMIT = 'Limit',
  CREATE_DEBITOR = 'NewDebtor',
  VERIFY = 'VerificationChannel',
  FACTORING = 'FACTORING',
  AGENT_FACTORING = 'AGENT_FACTORING',
}
