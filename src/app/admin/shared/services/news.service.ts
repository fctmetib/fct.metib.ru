import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsInterface } from '../types/news.interface';

@Injectable()
export class NewsService {
  /**
  * Создает экземпляр News сервиса.
  */
  constructor(private http: HttpClient) {}

  /**
  * Получает список новостей
  * @returns Возвращает список новостей
  */
  getNewsList(): Observable<NewsInterface[]> {
    let url = `${environment.apiUrl}/news`;
    return this.http.get<NewsInterface[]>(url);
  }

  addNewsItem(data: NewsInterface): Observable<NewsInterface> {
    let url = `${environment.apiUrl}/news`;
    return this.http.post<NewsInterface>(url, data);
  }

  addNewsImage(file, newsId): Observable<any> {
    var formdata = new FormData();
    formdata.append('', file);

    let url = `${environment.apiFileUploadUrl}/news/${newsId}/image`;
    return this.http.post<string>(url, formdata);
  }
}
