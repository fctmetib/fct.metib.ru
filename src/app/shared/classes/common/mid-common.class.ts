import { DemandSelectboxInterface } from '../../modules/demand/types/common/demand-selectbox.interface';

export class MIBCommon {
  private legalForms: DemandSelectboxInterface[] = [];
  private organizations: DemandSelectboxInterface[] = [];
  private typesOfOwner: DemandSelectboxInterface[] = [];

  constructor() {
    this.initLists();
  }

  getLegalForms(): DemandSelectboxInterface[] {
    return this.legalForms;
  }

  getOrganizations(): DemandSelectboxInterface[] {
    return this.organizations;
  }

  getTypesOfOwner(): DemandSelectboxInterface[] {
    return this.typesOfOwner;
  }

  private initLists() {
    this.legalForms = [
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

    this.organizations = [
      {
        title: 'Юридическое лицо',
        value: 1,
      },
      {
        title: 'ИП',
        value: 0,
      },
    ];

    this.typesOfOwner = [
      {
        title: 'Собственность',
        value: 'Own'
      },
      {
        title: 'Аренда',
        value: 'Lease'
      }
    ]
  }
}
