import {PersonInterface} from 'src/app/shared/types/common/person.interface';
import {OrganizationDataInterface} from 'src/app/shared/types/organization/organization-data.interface';
import {DemandDataBaseInterface} from '../demand-data-base.interface';
import {PassportInterface} from '../../../../../types/user/passport.interface';

export interface CreateDemandEDSRequestInterface extends DemandDataBaseInterface {
  Organization: OrganizationDataInterface;
  Passport: PassportInterface;
  Person: PersonInterface;
  PersonPosition: string;
}
