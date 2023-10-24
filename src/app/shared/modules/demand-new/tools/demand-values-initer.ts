import { DemandSelectboxInterface } from "../types/demand-selectbox.interface";

export class DemandValuesIniter {
  public static organizationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Юридическое лицо',
      value: 1,
    },
    {
      title: 'ИП',
      value: 2,
    },
  ];
  public static ruleTypes: DemandSelectboxInterface[] = [
    {
      title: 'ООО',
      value: 'ООО',
    },
    {
      title: 'ЗАО',
      value: 'ЗАО',
    },
    {
      title: 'ПАО',
      value: 'ПАО',
    },
    {
      title: 'ОАО',
      value: 'ОАО',
    },
    {
      title: 'НАО',
      value: 'НАО',
    },
    {
      title: 'АО',
      value: 'АО',
    },
  ];
  public static genderTypes: DemandSelectboxInterface[] = [
    {
      title: 'Женский',
      value: 0,
    },
    {
      title: 'Мужской',
      value: 1,
    },
  ];
  public static locationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Россия',
      value: 'Россия',
    },
  ];

}
