import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemandNavigationInterface } from '../types/common/demand-navigation.interface';

/**
 *
 *
 * @class DemandNavigationService - сервис необходим, для постройки связи между компонентами
 */
@Injectable()
export class DemandNavigationService {

  public demandConfig$ = new Subject<DemandNavigationInterface>();

  constructor() { }

  set updateDemandConfig(newConfig: DemandNavigationInterface) {
    this.demandConfig$.next(newConfig);
  }
}
