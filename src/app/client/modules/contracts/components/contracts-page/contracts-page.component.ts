import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss'],
})
export class ContractsPageComponent implements OnInit {
  public isLoading: boolean = false;
  public listContracts: DeliveryInterface[] = [];

  public listDisplayContracts: DeliveryInterface[] = [];
  public isPagination: boolean = false;
  public paginationPage: number = 1;
  public paginationRows: number = 10;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.fetch();
  }

  public updateData() {
    this.fetch();
  }

  paginate(event?) {
    console.log(event);
    console.log(this.listContracts);
    if (event) {
      this.paginationPage = event.page;

      let currentIndex = event.page * event.rows;
      this.listDisplayContracts = this.listContracts.slice(currentIndex, currentIndex * event.rows);
    } else {
      let currentIndex = this.paginationPage * this.paginationRows;
      this.listDisplayContracts = this.listContracts.slice(currentIndex, currentIndex * this.paginationRows);
    }

    console.log(this.listContracts);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }

  private fetch() {
    this.isLoading = true;
    this.deliveryService.getDeliveriesWithStats().subscribe((resp) => {
      this.listContracts = resp;
      this.paginate();
      this.isLoading = false;
    });
  }
}
