import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeliveryAgreement} from '../interfaces/shipment.interface';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class DeliveryService {
  constructor(
    private http: HttpClient
  ) {
  }

  getRefs(debtorID: number): Observable<DeliveryAgreement[]> {
    return this.http.get<DeliveryAgreement[]>(`${environment.apiUrl}/v1/deliveries/refs`, {
      params: {
        debtorID
      }
    })
  }

  getFreeLimit(deliveryID: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/v1/deliveries/FreeLimit`, {
      params: {
        deliveryID
      }
    })
  }
}
