import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestsResponseInterface } from 'src/app/client/modules/requests/types/requestResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestStoreService {
  private _requestStore: RequestsResponseInterface[] = [];

  private _requests$: BehaviorSubject<RequestsResponseInterface[]> =
    new BehaviorSubject([]);
  private _loading$: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) { }

  public setRequests(requests: RequestsResponseInterface[]): void {
    this._requestStore = requests;
    this._requests$.next(requests);
  }

  public getRequests(isRefresh: boolean = false): Observable<RequestsResponseInterface[]> {
    this._setLoading = true;

    if (this._requestStore.length === 0 || isRefresh) {
      this._fetch()
        .subscribe((resp: Array<RequestsResponseInterface>): void => {
          const result = resp?.sort((a, b): number => b.ID - a.ID);
          this.setRequests(result);
        });
    }

    this._setLoading = false;
    return this._requests$;
  }

  public clear(): void {
    this._requestStore = [];
    this._requests$.next([]);
  }

  public get getLoading(): Observable<boolean> {
    return this._loading$;
  }

  private set _setLoading(state: boolean) {
    this._loading$.next(state);
  }

  private _fetch(): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/request`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }
}
