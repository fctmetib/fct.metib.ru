import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsInterface } from '../type/news.interface';
import { ClientRequestInterface } from '../../shared/types/client/client-request.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(newsID: number): Observable<NewsInterface> {
    const url = `${environment.apiUrl}/news/top/${newsID}`;
    return this.http.get<NewsInterface>(url);
  }
  
  getNewsList(): Observable<NewsInterface[]> {
    let url = `${environment.apiUrl}/news`;
    return this.http.get<NewsInterface[]>(url);
  }
}
