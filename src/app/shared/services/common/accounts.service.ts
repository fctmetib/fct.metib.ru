import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbsAccountDTOInterface } from '../../types/account/abs-account-dto.interface';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<AbsAccountDTOInterface[]> {
    return this.http.get<AbsAccountDTOInterface[]>(`${environment.apiUrl}/accounts`);
  }
}
