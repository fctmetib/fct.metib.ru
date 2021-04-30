import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';

@Component({
  selector: 'app-request-correct-dialog',
  templateUrl: './request-correct-dialog.component.html',
  styleUrls: ['./request-correct-dialog.component.scss'],
})
export class RequestCorrectDialogComponent {

  public requests: RequestsResponseInterface[] = [];

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
    this.requests.push({
      Date: new Date(),
      Delivery: null,
      Documents: null,
      Files: null,
      ID: 1,
      Number: '1',
      Shipments: null,
      Status: null,
      Summ: 6127,
      Type: ''
    })
    this.requests.push({
      Date: new Date(),
      Delivery: null,
      Documents: null,
      Files: null,
      ID: 2,
      Number: '2',
      Shipments: null,
      Status: null,
      Summ: 6147,
      Type: ''
    })
  }
}
