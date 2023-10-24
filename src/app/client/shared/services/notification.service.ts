import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationService {
  constructor(private http: HttpClient) { }


  getNewNotifications(): Observable<any[]> {
    const url = `${environment.apiUrl}/messages?delivered=false`;
    return this.http.get<any[]>(url);
  }

  getUnreadNotifications(): Observable<any[]> {
    const url = `${environment.apiUrl}/messages?delivered=true`;
    return this.http.get<any[]>(url);
  }

  readNotification(id: string): Observable<any> {
    const url = `${environment.apiUrl}/messages/${id}/delivered`;
    return this.http.post<any[]>(url, null);
  }

  unreadNotification(id: string): Observable<any> {
    const url = `${environment.apiUrl}/messages/${id}/delivered?delivered=false`;
    return this.http.post<any[]>(url, null);
  }
}
