import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-report-init-dialog',
  templateUrl: './report-init-dialog.component.html',
  styleUrls: ['./report-init-dialog.component.scss'],
})
export class ReportInitDialogComponent {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
  }

  public onSubmit(): void {}
}
