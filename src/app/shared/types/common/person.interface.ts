export interface PersonInterface {
  //TODO: Maybe need to remove
  Name: {
    First: string
    Last: string
    Second: string
  };

  NameFirst: string;
  NameLast: string;
  NameSecond: string;
  Gender: number;

  SNILS: string;
  BirthDate: Date;
  BirthPlace: string;

  Phone: string;
  Email: string;
}
