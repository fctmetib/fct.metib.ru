import { FactoringPlacesAddress } from './demand-address-data.interface';

export interface DemandOtherBankDataInterface {
  otherBankAccountOpenDate: string;
  otherBankAccountCloseDate: string;
  otherBankName: string;
  otherBankOwnerAccount: string;
  otherBankTarget: string;
}

export interface DemandFactoringPlaceDataInterface {
  displayAddress: string;
  factoringPlacesAddress: FactoringPlacesAddress;
  factoringPlacesLegalForm: string;
}

export interface DemandFactoringCreditsDataInterface {
  factoringCreditsCreditor: string;
  factoringPlacesTypeDuty: string;
  factoringPlacesDateClose: string;
  factoringPlacesContractSum: number;
  factoringPlacesBalanceReport: number;
  factoringPlacesBalanceCurrent: number;
}

export interface DemandEDIProvidersDataInterface {
  factoringEDIProvidersDebitor: string;
  factoringEDIProvidersProvider: string;
}

export interface DemandFactoringDataInterface {
  organizationType: number;
  organizationLegalForm: string;
  organizationShortName: string;
  organizationINN: string;
  organizationPhone: string;
  organizationEmail: string;
  organizationWEB: string;

  bankBik: string;
  bankCorrespondentAccount: string;
  bankName: string;
  bankAccountOpenDate: string;
  bankOwnerAccount: string;
  bankComment: string;

  factoringProducts: string;
  factoringTradeMarks: string;
  factoringShipments: string;
  factoringFinanceLimit: number;
  factoringClients: string;
  factoringWorkers: number;

  otherBanks: DemandOtherBankDataInterface[];
  factoringPlaces: DemandFactoringPlaceDataInterface[];
  factoringCredits: DemandFactoringCreditsDataInterface[];
  factoringEDIProviders: DemandEDIProvidersDataInterface[];
}
