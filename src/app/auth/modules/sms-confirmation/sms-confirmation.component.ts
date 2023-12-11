import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, interval, map, switchMap, tap} from 'rxjs';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {FormControl, Validators} from '@angular/forms';
import {AutoUnsubscribeService} from '../../../shared/services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';
import {InputSize} from '../../../shared/ui-kit/input/interfaces/input.interface';
import {ButtonSize} from '../../../shared/ui-kit/button/interfaces/button.interface';

@Component({
  selector: 'mib-sms-confirmation',
  templateUrl: './sms-confirmation.component.html',
  styleUrls: ['./sms-confirmation.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class SmsConfirmationComponent implements OnInit {
  @Input() loading: boolean = false
  @Output() back = new EventEmitter()
  @Output() confirm = new EventEmitter<string>()
  @Output() resend = new EventEmitter()

  public delayDate$ = new BehaviorSubject<number>(0);
  public delay: number = 0;
  public SECONDS: number = 60

  public size: InputSize | ButtonSize = 'l'

  public control = new FormControl(null, [Validators.required])

  constructor(
    private persistenceService: PersistenceService,
    private au: AutoUnsubscribeService
  ) {
  }

  ngOnInit() {
    const delayDate = this.persistenceService.get('emailCodeDelay')
    if (delayDate && +delayDate > new Date().getTime()) {
      this.setDelay(delayDate)
    } else {
      this.setDelay(new Date().getTime() + this.SECONDS * 1000)
    }

    this.delayDate$.pipe(
      tap((value) => {
        this.persistenceService.set('emailCodeDelay', value)
        this.updateDelay(value)
      }),
      switchMap((value) => interval(1000).pipe(
        map(() => value),
        takeUntil(this.au.destroyer)
      )),
      tap((value) => {
        this.updateDelay(value)
      })
    ).subscribe()
  }

  public updateDelay(value: number) {
    const remains = value - new Date().getTime();
    if (remains >= -1000) {
      this.delay = Math.ceil(remains / 1000)
    }
  }

  public setDelay(date: number): void {
    this.delayDate$.next(date)
  }

  public onConfirm(): void {
    this.confirm.emit(this.control.value)
  }

  public onResend(): void {
    this.resend.emit()
    this.setDelay(new Date().getTime() + this.SECONDS * 1000)
  }
}
