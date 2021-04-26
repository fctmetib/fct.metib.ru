import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { OrganizationService } from 'src/app/shared/services/share/organization.service';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss'],
})
export class ContractsPageComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  public isLoading: boolean = false;
  public listContracts: DeliveryInterface[] = [];

  public isPagination: boolean = true;
  public btnShowAllText: string = 'Показать всё';

  public listDisplayContracts: DeliveryInterface[] = [];
  public paginationPage: number = 0;
  public paginationRows: number = 10;

  public displayProperty: boolean = false;
  public displayShipments: boolean = false;

  constructor(private deliveryService: DeliveryService, private organizationService: OrganizationService) {}

  ngOnInit() {
    this.fetch();
  }

  showPropertyDialog(id): void {
    this.displayProperty = true;
    this.organizationService.getOrganizationById(44110).subscribe(resp => {
    });
  }

  showShipmentsDialog(id): void {
    this.displayShipments = true;
  }

  public showAllToggle() {
    this.isPagination = !this.isPagination;

    if(this.isPagination) {
      this.btnShowAllText = 'Показать всё';
      this.paginate();
    } else {
      this.listDisplayContracts = this.listContracts;
      this.btnShowAllText = 'Разбить на страницы';
    }
  }

  public updateData() {
    this.fetch();
  }

  public paginate(event?): void {
    this.listDisplayContracts = [];
    if (event) {
      this.paginationPage = event.page;

      let currentIndex = event.page * event.rows;
      this.listDisplayContracts = this.listContracts.slice(
        currentIndex,
        currentIndex + event.rows
      );
    } else {
      let currentIndex = this.paginationPage * this.paginationRows;
      this.updateCurrentPage(currentIndex);

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
