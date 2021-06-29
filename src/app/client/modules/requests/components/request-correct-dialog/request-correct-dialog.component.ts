import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-request-correct-dialog',
  templateUrl: './request-correct-dialog.component.html',
  styleUrls: ['./request-correct-dialog.component.scss'],
})
export class RequestCorrectDialogComponent implements OnDestroy {

  public request: RequestsResponseInterface;
  public shipments: ClientShipmentInterface[] = [];
  public sumCurrentPage: number = 0;

  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    private service: RequestsService,
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
  }

  public onSubmit(): void { }

  private initValues(): void {
    console.log('DATA', this.config.data[0])
    let id = this.config.data[0].ID;

    this.subscription$.add(
      this.service.getRequestByIdAndParams(id, true, false, false).subscribe(resp => {
        this.request = resp;
        this.shipments = this.request.Shipments;
        console.log('Shipments', this.shipments)
        let sum = this.shipments.map(x => x.Summ);
        this.sumCurrentPage = sum.reduce((prev, current) => prev + current);
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
