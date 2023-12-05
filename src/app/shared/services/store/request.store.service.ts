import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, finalize, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestsResponse } from 'src/app/client/modules/requests/types/requestResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestStoreService {
  private _requestStore: RequestsResponse[] = [];

  private _requests$: BehaviorSubject<RequestsResponse[]> =
    new BehaviorSubject([]);
  private _loading$: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) { }

  public setRequests(requests: RequestsResponse[]): void {
    this._requestStore = requests;
    this._requests$.next(requests);
  }

  public getRequests(isRefresh: boolean = false): Observable<RequestsResponse[]> {
    this._setLoading = true;

    if (this._requestStore.length === 0 || isRefresh) {
      this._fetch()
        .pipe(
          tap((resp: Array<RequestsResponse>) => {
            const result = resp?.sort((a, b): number => b.ID - a.ID);
            this.setRequests(result);
          }),
          finalize(() => {

            this._setLoading = false;
          })
        )
        .subscribe();
    }

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

  private _fetch(): Observable<RequestsResponse[]> {
    const url = `${environment.apiUrl}/v1/requests`;
    return this.http.get<RequestsResponse[]>(url, {
      params: {
        dateFrom: (new Date(2023, 9)).toDateString(),
        dateTo: (new Date()).toDateString(),
        includeShipments: true,
        includeDocuments: false
      }
    });
  }
}
