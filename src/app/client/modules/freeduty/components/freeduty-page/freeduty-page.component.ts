import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DutyService } from 'src/app/shared/services/share/duty.service';

@Component({
  selector: 'app-freeduty-page',
  templateUrl: './freeduty-page.component.html',
  styleUrls: ['./freeduty-page.component.scss'],
})
export class FreedutyPageComponent implements OnInit {

  constructor(private store: Store, public dialogService: DialogService, private dutyService: DutyService) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
  }

  fetch(): void {
    this.dutyService.fetch(44110, new Date(), new Date(), true).subscribe(resp => {

    })
  }
}
