import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, timer, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-inactive-dialog',
  templateUrl: './inactive-dialog.component.html',
  styleUrls: ['./inactive-dialog.component.scss'],
})
export class InactiveDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subject = new Subject();

  public counter$: Observable<number>;
  count = 30;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count),
      takeUntil(this.subject)
    );
  }

  ngOnInit() {
    this.subscription = this.counter$.subscribe(val => {
      console.log(val, 'time to logout')
      if (val <= 0) {
        this.subject.next();
        this.subscription.unsubscribe();
        this.authService.logout('inActive');
      }
   });
  }

  public close() {
    this.ref.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
