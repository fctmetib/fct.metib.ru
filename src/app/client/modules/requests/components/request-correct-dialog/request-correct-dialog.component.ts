import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-request-correct-dialog',
  templateUrl: './request-correct-dialog.component.html',
  styleUrls: ['./request-correct-dialog.component.scss'],
})
export class RequestCorrectDialogComponent {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
  }

  public onSubmit(): void {}


  private initValues(): void {

  }
}
