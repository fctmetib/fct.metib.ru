import { DeliveryService } from '../../../../../shared/services/share/delivery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-details-page',
  templateUrl: './contract-details-page.component.html',
  styleUrls: ['./contract-details-page.component.scss'],
})
export class ContractDetailsPageComponent implements OnInit {

  public isLoading: boolean = false;
  public displayShipments: boolean = false;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
  //  this.fetch();
  }

  // private fetch() {
  //   this.isLoading = true;
  //   this.deliveryService.getDelivery().subscribe((resp) => {
  //     this.isLoading = false;
  //   });
  // }
}
