export interface DemandPropertiesInterface {
    Type: string;
    Address: {
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
    };
    Comment: string;
}
