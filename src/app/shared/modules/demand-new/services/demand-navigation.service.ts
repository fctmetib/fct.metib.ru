import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DemandAction } from '../types/common/demand-action';
import { DemandActionType } from '../types/common/demand-action-type';
import { DemandNavigationInterface } from '../types/common/demand-navigation.interface';

/**
 *
 *
 * @class DemandNavigationService - сервис необходим, для постройки связи между компонентами
 */
@Injectable()
export class DemandNavigationService {

  public demandConfig$ = new BehaviorSubject<DemandNavigationInterface>(null);
  public currentDemand$ = new BehaviorSubject<any>(null);

  constructor() { }

  public updateDemandConfig(newConfig: DemandNavigationInterface) {
    this.demandConfig$.next(newConfig);
  }

  public setCurrentDemandData(currentDemand: any): void {
    this.currentDemand$.next(currentDemand);
  }
}
