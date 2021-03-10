import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { PassportInterface } from './../../../../types/user/passport.interface';
import { DemandDataInterface } from './../demand-data.interface';

export interface CreateDemandEDSRequestInterface extends DemandDataInterface  {
  Organization: OrganizationDataInterface;
  Person: PersonInterface;
  Passport: PassportInterface;
  PersonPosition: string;
}
