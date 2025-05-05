import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Manager {
  CustomerID: number;
  ManagerID: number;
  Manager: string;
  Phone: string;
  EMail: string;
  AvatarCode: string;
  AvatarImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  private http = inject(HttpClient);

  getManager() {
    return this.http.get<Manager>(`${environment.apiUrl}/v1/managers`);
  }
}
