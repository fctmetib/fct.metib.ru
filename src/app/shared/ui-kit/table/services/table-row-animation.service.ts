import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TABLE_ROW_ANIMATION_CONFIG} from '../components/table-row/table-row.component';

@Injectable({
  providedIn: 'root'
})
export class TableRowAnimationService {
  private animationStates = new Map<number, BehaviorSubject<boolean>>();
  private animationDone = new Subject<number>(); // Для оповещения о завершении анимации

  constructor() {
  }

// Метод для начала анимации строки по ID
  animateRowById(id: number) {
    let state = this.animationStates.get(id);
    if (!state) {
      state = new BehaviorSubject(false);
      this.animationStates.set(id, state);
    }
    state.next(true);

    // Запланировать окончание анимации
    setTimeout(() => {
      state.next(false); // Сбросить состояние анимации
      this.animationDone.next(id); // Оповестить о завершении
    }, TABLE_ROW_ANIMATION_CONFIG.duration);
  }

  // Получение состояния анимации для строки
  getAnimationState(id: number): Observable<boolean> {
    let state = this.animationStates.get(id);
    if (!state) {
      state = new BehaviorSubject(false);
      this.animationStates.set(id, state);
    }
    return state.asObservable();
  }

  // Метод для начала анимации строки и ожидания её завершения
  animateRowAndAwaitCompletion(id: number): Observable<void> {
    return new Observable(observer => {
      let state = this.animationStates.get(id);
      if (!state) {
        state = new BehaviorSubject(false);
        this.animationStates.set(id, state);
      }
      state.next(true); // Начать анимацию

      // Установить таймер для завершения анимации
      setTimeout(() => {
        state.next(false); // Окончание анимации
        observer.next(); // Уведомить об окончании
        observer.complete(); // Завершить Observable
      }, TABLE_ROW_ANIMATION_CONFIG.duration);
    });
  }

  // Метод для ожидания завершения анимации
  waitForAnimationToComplete(id: number): Observable<number> {
    return new Observable(observer => {
      const subscription = this.animationDone.subscribe(animId => {
        if (animId === id) {
          observer.next(id);
          observer.complete();
        }
      });

      // Очистить подписку при завершении
      return () => subscription.unsubscribe();
    });
  }
}
