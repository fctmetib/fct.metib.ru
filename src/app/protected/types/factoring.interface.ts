export interface FactoringInterface {
  ABSID: number;
  Contract: {
    Number: string;
    Date: Date;
  };
  ID: number;
  Limit: number;
  Manager: {
    Avatar: string;
    Email: string;
    Extension: string;
    ID: number;
    Name: string;
  };
  Organization: {
    ID: number;
    Inn: string;
    Title: string;
  };
  Title: string;
}
