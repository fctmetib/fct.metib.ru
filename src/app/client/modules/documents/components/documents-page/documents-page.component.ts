import { ViewFileDialogComponent } from './../../../../../shared/modules/view-file-dialog/view-file-dialog.component';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
})
export class DocumentsPageComponent implements OnInit {
  public loading: boolean = false;

  private subscription$: Subscription = new Subscription();
  refUpdatePasswordDialog: DynamicDialogRef;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  public openUpdatePassword() {
    if (!this.refUpdatePasswordDialog) {
      this.refUpdatePasswordDialog = this.dialogService.open(
        ViewFileDialogComponent,
        {
          header: 'Редактировать документ',
          width: '976px',
          contentStyle: { 'max-height': '677px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refUpdatePasswordDialog.onClose.subscribe(() => {
          this.refUpdatePasswordDialog = null;
        })
      );
    }
  }
}
