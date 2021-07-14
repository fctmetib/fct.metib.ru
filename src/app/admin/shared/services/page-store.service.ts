import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageInterface } from '../types/page.interface';

@Injectable()
export class PageStoreService {
  public _page$: BehaviorSubject<PageInterface> =
    new BehaviorSubject({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!'
    });

  public page$: Subject<PageInterface> = new Subject();

  constructor() {}

  public setPage(page: PageInterface) {
    console.log('NEXT PAGE IS', page)
    this._page$.next(page);
    this.page$.next(page);
  }

  public getPage(): Observable<PageInterface> {
    return this._page$;
  }
}
