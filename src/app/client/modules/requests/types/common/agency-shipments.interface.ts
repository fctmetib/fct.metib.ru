import { ClientShipmentInterface } from "src/app/shared/types/client/client-shipment.interface";

export interface AgencyShipmentsInterface {
  formId: number;
  shipmnets: ClientShipmentInterface[];
}
