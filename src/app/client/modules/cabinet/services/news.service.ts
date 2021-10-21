import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsInterface } from 'src/app/public/type/news.interface';

@Injectable()
export class CabinetNewsService {
  constructor(private _http: HttpClient) {}

  getNews(): Observable<NewsInterface[]> {
    const url = `${environment.apiUrl}//news/top/3`;
    return this._http.get<NewsInterface[]>(url);
  }
}
