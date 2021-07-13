import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageInterface } from '../types/page.interface';

@Injectable()
export class PageStoreService {
  private _page$: BehaviorSubject<PageInterface> =
    new BehaviorSubject({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!'
    });

  constructor() {}

  public setPage(page: PageInterface) {
    this._page$.next(page);
  }

  public getPage(): Observable<PageInterface> {
    return this._page$;
  }
}
