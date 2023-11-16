import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestsService } from '../../services/requests.service';
import { ClientRequestInterface } from 'src/app/shared/types/client/client-request.interface';
import { RequestTypeEnum } from 'src/app/shared/types/enums/request-type.enum';

@Component({
  selector: 'app-request-correct-dialog',
  templateUrl: './request-correct-dialog.component.html',
  styleUrls: ['./request-correct-dialog.component.scss'],
})
export class RequestCorrectDialogComponent implements OnDestroy {
  public request: RequestsResponseInterface;
  public shipments: ClientShipmentInterface[] = [];
  public changedShipments: ClientShipmentInterface[] = [];
  public sumCurrentPage: number = 0;

  public successMessage: string = '';

  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    private service: RequestsService,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    this.initValues();
  }

  public setChangedShipment(
    shipment: ClientShipmentInterface,
    changedSumm: number
  ) {
    // shipment.SummToFactor = changedSumm;
    if (shipment.Summ < shipment.SummToFactor) {
      shipment.Summ = shipment.SummToFactor;
    } else {
      this.changedShipments.push(shipment);
      this.calcSumCurrentPage();
    }
  }

  public onSubmit(): void {
    this.successMessage = '';

    let data: ClientRequestInterface = {
      Date: new Date(),
      DeliveryID: this.request.Delivery.ID,
      ID: this.request.ID,
      Shipments: this.changedShipments,
      Type: RequestTypeEnum.Correction,
    };
    this.subscription$.add(
      this.service.add(data).subscribe((resp) => {
        this.successMessage = 'Заявка на коррекцию успешно создана!';
      })
    );
  }

  private initValues(): void {
    let id = this.config.data[0].ID;

    this.subscription$.add(
      this.service
        .getRequestByIdAndParams(id, true, false, false)
        .subscribe((resp) => {
          this.request = resp;
          this.shipments = this.request.Shipments;
          this.calcSumCurrentPage();
        })
    );
  }

  private calcSumCurrentPage(): void {
    let sum = this.shipments.map((x) => x.Summ);
    this.sumCurrentPage = sum.reduce(
      (prev, current) => Number(prev) + Number(current)
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
