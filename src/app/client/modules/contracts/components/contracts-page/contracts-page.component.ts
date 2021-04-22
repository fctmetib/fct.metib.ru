import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {

  public isLoading: boolean = false;
  public listContracts: DeliveryInterface[] = [];


  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.isLoading = true;
    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.listContracts = resp;
      this.isLoading = false;
    });

  }
}
