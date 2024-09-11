import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignService {
  constructor(
    private http: HttpClient
  ) {
  }

  getActiveSession(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/v1/sign/session`)
  }

  getPin(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/v1/sign/PinRequest`, null, {
        params: {
            "secretDeliveryMethod": "Почта",
            "secretDeliveryParameter": "martsinyuk.pl@gmail.com"
        }
    })
  }

  createSession(pincode: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/v1/sign/session`, null, {
        params: {
            "pin": pincode,
        }
    })
  }
}
