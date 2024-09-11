import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-view-file-dialog',
  templateUrl: './view-file-dialog.component.html',
  styleUrls: ['./view-file-dialog.component.scss'],
})
export class ViewFileDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  subject = new Subject();

  public loading: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {}

  public close() {
    this.ref.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
