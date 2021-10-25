import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mib-file-error-dialog',
  styleUrls: ['./mib-file-error-dialog.component.scss'],
  templateUrl: './mib-file-error-dialog.component.html'
})

export class MibFileErrorDialogComponent implements OnInit {
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
