import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestsResponseInterface } from '../types/requestResponse.interface';
import { RequestsService } from './requests.service';

@Injectable()
export class RequestStoreService {
  private _requests$: BehaviorSubject<RequestsResponseInterface[]> = new BehaviorSubject([]);
  private _loading$: Subject<boolean> = new Subject();

  constructor(private requestService: RequestsService) {}

  public setRequests(requests: RequestsResponseInterface[]) {
    this._requests$.next(requests);
  }

  public getRequests(): Observable<RequestsResponseInterface[]> {
    this._setLoading(true);
    this._requests$.subscribe((requests) => {
      if (requests.length === 0) {
        this.requestService.fetch().subscribe((resp) => {
          let result = resp.sort((a, b) => {
            return b.ID - a.ID;
          });
          this.setRequests(result);
        });
      }
    });
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
