import { DutyFilterRequestInterface } from './../../../../shared/types/duty/duty-filter-request.interface';
import { DutyInterface } from './../../../../shared/types/duty/duty.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DutyService } from 'src/app/shared/services/share/duty.service';

@Injectable()
export class FreedutyStoreService {
  private _freeDutyStore: DutyInterface[] = [];

  private _freeduty$: BehaviorSubject<DutyInterface[]> = new BehaviorSubject(
    []
  );
  private _loading$: Subject<boolean> = new Subject();

  constructor(private dutyService: DutyService) {}

  public setFreeduty(freeduty: DutyInterface[]) {
    this._freeDutyStore = freeduty;
    this._freeduty$.next(freeduty);
  }

  public getFreeduty(
    data: DutyFilterRequestInterface,
    isRefresh: boolean = false
  ): Observable<DutyInterface[]> {
    this._setLoading(true);

    if (this._freeDutyStore.length === 0 || isRefresh) {
      this.dutyService.fetch(data).subscribe((resp) => {
        let result = resp.sort((a, b) => {
          return b.ID - a.ID;
        });
        this.setFreeduty(result);
      });
    }

    this._setLoading(false);
    return this._freeduty$;
  }

  public getLoading(): Observable<boolean> {
    return this._loading$;
  }

  private _setLoading(state: boolean) {
    this._loading$.next(state);
  }
}
