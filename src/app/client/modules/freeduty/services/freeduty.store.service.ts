import { DutyInterface } from './../../../../shared/types/duty/duty.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DutyService } from 'src/app/shared/services/share/duty.service';

@Injectable()
export class FreedutyStoreService {
  private _freeduty$: BehaviorSubject<DutyInterface[]> = new BehaviorSubject([]);
  private _loading$: Subject<boolean> = new Subject();

  constructor(private dutyService: DutyService) {}

  public setFreeduty(freeduty: DutyInterface[]) {
    this._freeduty$.next(freeduty);
  }

  public getRequests(data: any): Observable<DutyInterface[]> {
    this._setLoading(true);
    this._freeduty$.subscribe((freeduty) => {
      if (freeduty.length === 0) {
        this.dutyService.fetch(data.data).subscribe((resp) => {
          let result = resp.sort((a, b) => {
            return b.ID - a.ID;
          });
          this.setFreeduty(result);
        });
      }
    });
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
