import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/shared/services/common/file.service';

@Component({
  selector: 'app-document-view-dialog',
  templateUrl: './document-view-dialog.component.html',
  styleUrls: ['./document-view-dialog.component.scss'],
})
export class DocumentViewDialogComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fileService: FileService
  ) {}

  ngOnInit() {
    if (this.config.data) {
      const data = this.config.data;
      console.log(data);
      this.subscription$.add(
        this.fileService
          .getFile(data.requestID, data.document.DocumentID)
          .subscribe((response) => {})
      );
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
