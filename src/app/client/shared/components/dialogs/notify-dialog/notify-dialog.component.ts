import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

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
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    if (this.config.data) {
      this.notificationsList = this.config.data;
    }
  }

  public readNotificationHandler(event: any) {
    let id: string = event.id;
    let isOpen: boolean = event.isOpen;

    if (isOpen) {
      console.log('ID: ', id);
      this.subscription$.add(
        this.notifyService.readNotification(id).subscribe((resp) => {})
      );
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
