import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss'],
})
export class ContractsPageComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  public isLoading: boolean = false;
  public listContracts: DeliveryInterface[] = [];

  public listDisplayContracts: DeliveryInterface[] = [];
  public isPagination: boolean = false;
  public paginationPage: number = 0;
  public paginationRows: number = 10;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.fetch();
  }

  public updateData() {
    this.fetch();
  }

  paginate(event?) {
    this.listDisplayContracts = [];
    if (event) {
      this.paginationPage = event.page;

      let currentIndex = event.page * event.rows;
      this.listDisplayContracts = this.listContracts.slice(
        currentIndex,
        currentIndex + event.rows
      );
    } else {
      console.log('Im here');

      let currentIndex = this.paginationPage * this.paginationRows;
      this.updateCurrentPage(currentIndex);

      console.log('Im here', currentIndex);

      this.listDisplayContracts = this.listContracts.slice(
        currentIndex,
        currentIndex + this.paginationRows
      );
    }
  }

  private fetch() {
    this.isLoading = true;
    this.deliveryService.getDeliveriesWithStats().subscribe((resp) => {
      this.listContracts = resp.sort((a, b) => {
        return new Date(b.DateFrom).getTime() - new Date(a.DateFrom).getTime();
      });
      this.paginate();
      this.isLoading = false;
    });
  }

  private updateCurrentPage(currentPage: number): void {
    this.paginator.changePage(currentPage);
  }
}
