import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public isScrollBlocked$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  blockScroll(): void {
    if (!this.isScrollBlocked$.value) {
      this.isScrollBlocked$.next(true)
    }
  }

  allowScroll(): void {
    if (this.isScrollBlocked$.value) {
      this.isScrollBlocked$.next(false)
    }
  }
}
