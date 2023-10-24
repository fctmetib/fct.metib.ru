import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsInterface } from '../type/news.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  public getNews(newsCount: number): Observable<NewsInterface[]> {
    const url = `${environment.apiUrl}/news/top/${newsCount}`;
    return this.http.get<NewsInterface[]>(url);
  }

  public getNewsById(id: string): Observable<NewsInterface> {
    const url = `${environment.apiUrl}/news/${id}`;
    return this.http.get<NewsInterface>(url);
  }

  public getNewsList(): Observable<NewsInterface[]> {
    const url = `${environment.apiUrl}/news`;
    return this.http.get<NewsInterface[]>(url);
  }
}
