import { DemandAddressDataInterface } from './demand-address-data.interface';

export interface DemandEDSDataInterface {
  organizationType: number;
  organizationLegalForm: string;
  organizationShortName: string;
  organizationFullName: string;
  organizationINN: string;
  organizationKPP: string;
  organizationOGRN: string;
  organizationOKPO: string;
  organizationPhone: string;
  organizationEmail: string;
  organizationWEB: string;

  // Юр. адресс
  organizationLegalAddress: DemandAddressDataInterface;
  organizationIsActualAdressEqual: boolean;

  // Факт. адресс
  organizationActualAddress: DemandAddressDataInterface;
  organizationIsLegalAdressEqual: boolean;

  // Почтовый. адресс
  organizationPostAddress: DemandAddressDataInterface;

  ownerSurname: string;
  ownerName: string;
  ownerMiddlename: string;
  ownerGender: number;
  ownerSNILS: string;
  ownerDateBurn: string;
  ownerPlaceBurn: string;
  ownerPhone: string;
  ownerWorkPosition: string;
  ownerEmail: string;
  ownerINN: string;
  ownerGeoPosition: string;
  ownerIdCenter: string;

  passportNumber: string;
  passportDate: string;
  passportFrom: string;
  passportCode: string;
  passportNationality: string;
}
