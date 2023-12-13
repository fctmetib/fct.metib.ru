import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeliveryAgreement} from '../interfaces/delivery-agreement.interface';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class DeliveryAgreementService {
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
}
