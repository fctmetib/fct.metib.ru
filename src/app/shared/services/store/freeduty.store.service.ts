import { environment } from 'src/environments/environment';
import { DutyFilterRequestInterface } from '../../types/duty/duty-filter-request.interface';
import { DutyInterface } from '../../types/duty/duty.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreedutyStoreService {
  private _freeDutyStore: DutyInterface[] = [];

  private _freeduty$: BehaviorSubject<DutyInterface[]> = new BehaviorSubject(
    []
  );
  private _loading$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

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
      this._fetch(data).subscribe((resp) => {
        let result = resp.sort((a, b) => {
          return b.ID - a.ID;
        });
        this.setFreeduty(result);
      });
    }

    this._setLoading(false);
    return this._freeduty$;
  }

  public clear(): void {
    this._freeDutyStore = [];
    this._freeduty$.next([]);
  }

  public getLoading(): Observable<boolean> {
    return this._loading$;
  }

  private _setLoading(state: boolean) {
    this._loading$.next(state);
  }

  private _fetch(data: DutyFilterRequestInterface): Observable<DutyInterface[]> {
    const url = `${environment.apiUrl}/v1/duties`;
    return this.http.get<DutyInterface[]>(url);
  }

  public getFreeDuty(): Observable<DutyInterface[]> {
    const url = `${environment.apiUrl}/v1/duties`;
    return this.http.get<DutyInterface[]>(url);
  }
}
