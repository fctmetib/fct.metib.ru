import { DemandActionType } from "../common/demand-action-type";

export interface DoDemandActionInterface {
  type: DemandActionType,
  data: any, // содержит в себе форму готовую к отправке на АПИ
}
