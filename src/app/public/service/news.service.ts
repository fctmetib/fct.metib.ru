import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsInterface } from '../type/news.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(newsCount: number): Observable<NewsInterface[]> {
    const url = `${environment.apiUrl}/news/top/${newsCount}`;
    return this.http.get<NewsInterface[]>(url);
  }

  getNewsById(id: string): Observable<NewsInterface> {
    const url = `${environment.apiUrl}/news/${id}`;
    return this.http.get<NewsInterface>(url);
  }

  getNewsList(): Observable<NewsInterface[]> {
    let url = `${environment.apiUrl}/news`;
    return this.http.get<NewsInterface[]>(url);
  }
}
