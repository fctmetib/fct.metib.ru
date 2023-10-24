import { DoDemandPageActionType } from "./do-demand-page-action-type";

export interface DoDemandActionInterface {
  type: DoDemandPageActionType,
  data: any, // содержит в себе форму готовую к отправке на АПИ
}
