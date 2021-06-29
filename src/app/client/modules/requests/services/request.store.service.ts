import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestsResponseInterface } from '../types/requestResponse.interface';
import { RequestsService } from './requests.service';

@Injectable()
export class RequestStoreService {
  private _requestStore: RequestsResponseInterface[] = [];

  private _requests$: BehaviorSubject<RequestsResponseInterface[]> =
    new BehaviorSubject([]);
  private _loading$: Subject<boolean> = new Subject();

  constructor(private requestService: RequestsService) {}

  public setRequests(requests: RequestsResponseInterface[]) {
    this._requestStore = requests;
    this._requests$.next(requests);
  }

  public getRequests(
    isRefresh: boolean = false
  ): Observable<RequestsResponseInterface[]> {
    this._setLoading(true);

    if (this._requestStore.length === 0 || isRefresh) {
      this.requestService.fetch().subscribe((resp) => {
        let result = resp.sort((a, b) => {
          return b.ID - a.ID;
        });
        this.setRequests(result);
      });
    }

    this._setLoading(false);
    return this._requests$;
  }

  public getLoading(): Observable<boolean> {
    return this._loading$;
  }

  private _setLoading(state: boolean) {
    this._loading$.next(state);
  }
}
