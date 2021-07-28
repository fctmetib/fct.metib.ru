import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationService {
  constructor(private http: HttpClient) { }

  getNewNotifications(): Observable<any[]> {
    const url = `${environment.apiUrl}/messages?delivered=true`;
    return this.http.get<any[]>(url);
  }
}
