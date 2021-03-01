import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import { DatePipe } from '@angular/common';
import { DutyFilterRequestInterface } from 'src/app/shared/types/duty/duty-filter-request.interface';
import { getFreedutyAction } from '../../store/actions/getFreeduty.action';
import { errorSelector, freedutySelector, isLoadingSelector } from '../../store/selectors';
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface';

@Component({
  selector: 'app-freeduty-page',
  templateUrl: './freeduty-page.component.html',
  styleUrls: ['./freeduty-page.component.scss'],
  providers: [DatePipe]
})
export class FreedutyPageComponent implements OnInit {
  freeduty$: Observable<DutyInterface[] | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;


  constructor(private store: Store, public dialogService: DialogService, private dutyService: DutyService, public datepipe: DatePipe) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
    this.freeduty$ = this.store.pipe(select(freedutySelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

  }

  updateData(): void {
    this.fetch();
  }

  fetch(): void {
    let data: DutyFilterRequestInterface = {
      CustomerID: 1050,
      DateFrom: new Date(),
      DateTo: new Date(),
      Free: true
    }

    this.store.dispatch(getFreedutyAction({data}));
  }
}
