export interface DemandAddressDataInterface {
  displayAddress: string;
  factoringPlacesAddress: FactoringPlacesAddress;
}

export interface FactoringPlacesAddress {
  PostCode: string;
  Country: string;
  RegionCode: number;
  RegionTitle: string;
  City: string;
  District: string;
  Locality: string;
  Street: string;
  House: string;
  Appartment: string;
}
