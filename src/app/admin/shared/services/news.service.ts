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

  /**
  * Удаляет новость по id
  * @returns Ничего не возвращает
  */
  removeNewsItem(newsID: string): Observable<any> {
    let url = `${environment.apiUrl}/news/${newsID}`;
    return this.http.delete<any>(url);
  }

  /**
  * Обновляет новость по id
  * @returns Ничего не возвращает
  */
  updateNewsItem(data: NewsInterface, newsID: string): Observable<NewsInterface> {
    let url = `${environment.apiUrl}/news/${newsID}`;
    return this.http.post<NewsInterface>(url, data);
  }

  /**
  * Добавляет новую новость
  * @returns Ничего не возвращает
  */
  addNewsItem(data: NewsInterface): Observable<NewsInterface> {
    let url = `${environment.apiUrl}/news`;
    return this.http.post<NewsInterface>(url, data);
  }

  /**
  * Добавляет картинку в новость, по id
  * @returns Ничего не возвращает
  */
  addNewsImage(file, newsId): Observable<any> {
    var formdata = new FormData();
    formdata.append('', file);

    let url = `${environment.apiFileUploadUrl}/news/${newsId}/image`;
    return this.http.post<string>(url, formdata);
  }
}
