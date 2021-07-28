import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss'],
})
export class NotifyDialogComponent implements OnInit, OnDestroy {

  public notificationsList: any[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    if (this.config.data) {
      console.log(this.config.data);
      this.notificationsList = this.config.data;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
