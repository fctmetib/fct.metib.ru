import { environment } from 'src/environments/environment';
import { DutyFilterRequestInterface } from '../../types/duty/duty-filter-request.interface';
import { Duty } from '../../types/duty/duty';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreedutyStoreService {
  private _freeDutyStore: Duty[] = [];

  private _freeduty$: BehaviorSubject<Duty[]> = new BehaviorSubject(
    []
  );
  private _loading$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  public setFreeduty(freeduty: Duty[]) {
    this._freeDutyStore = freeduty;
    this._freeduty$.next(freeduty);
  }

  public getFreeduty(
    data: DutyFilterRequestInterface,
    isRefresh: boolean = false
  ): Observable<Duty[]> {
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

  private _fetch(data: DutyFilterRequestInterface): Observable<Duty[]> {
    const url = `${environment.apiUrl}/v1/duties`;
    return this.http.get<Duty[]>(url);
  }


}
