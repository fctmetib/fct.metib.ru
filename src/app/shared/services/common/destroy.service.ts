import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Observable abstraction over ngOnDestroy to use with takeUntil
 *
 * @example:
 * @Component({
 *    providers: [DestroyService] // creates instance of service per component
 * })
 * Foo {
 *    some$: Observable<any>;
 *    constructor(private destroy$: DestroyService) {
 *      some$.pipe(takeUntil(this.destroy$)).subscribe();
 *    }
 * }
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
