import { RequestsService } from './../../../requests/services/requests.service';
import { Router } from '@angular/router';
import { OrganizationInterface } from './../../../../../shared/types/organization/organization.interface';
import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { OrganizationService } from 'src/app/shared/services/share/organization.service';
import { ShipmentInterface } from 'src/app/shared/types/common/shipment-interface';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss'],
})
export class ContractsPageComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  public isLoading: boolean = false;
  public listContracts: DeliveryInterface[] = [];
  public listContractsFiltered: DeliveryInterface[] = [];

  public isPagination: boolean = true;
  public btnShowAllText: string = 'Показать всё';

  public listDisplayContracts: DeliveryInterface[] = [];
  public paginationPage: number = 0;
  public paginationRows: number = 10;

  public displayProperty: boolean = false;
  public displayShipments: boolean = false;

  public isOrganizationError: boolean = false;
  public isOrganizationLoading: boolean = false;
  public currentOrganizationContent: any;
  public currentOrganization: OrganizationInterface = {
    ABSID: 0,
    Account: {
      BIK: '',
      Bank: '',
      COR: '',
      Number: '',
    },
    Accountant: '',
    CustomerID: 0,
    DebtorID: 0,
    Description: '',
    Email: '',
    ID: 0,
    INN: '',
    KPP: '',
    LegalForm: '',
    OGRN: '',
    OKATO: '',
    OKPO: '',
    OKVED: '',
    RegDate: new Date(),
    RegRegion: '',
    Signer: {
      FIO: '',
      Position: '',
      Reason: '',
    },
    State: '',
    Telephone: '',
    Title: '',
    WebSite: '',
  };

  public isShipmentsError: boolean = false;
  public isShipmentsLoading: boolean = false;
  public currentShipments: ShipmentInterface[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private organizationService: OrganizationService,
    private _clipboardService: ClipboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetch();
  }

  public openDetails(id): void {
    this.router.navigate([`contracts/details/${id}`]);
  }

  public showPropertyDialog(id): void {
    this.displayProperty = true;
    this.isOrganizationLoading = true;
    this.isOrganizationError = false;

    this.organizationService.getOrganizationById(id).subscribe(
      (resp) => {
        this.currentOrganization = resp;

        this.currentOrganizationContent = `Банк: ${resp?.Account?.Bank}
        Получатель: ${resp?.Account?.Bank}
        Кор/с: ${resp?.Account?.COR}
        БИК: ${resp?.Account?.BIK}
        ИНН: ${resp?.INN}
        КПП: ${resp?.KPP}
        Счет для оплаты задолженности: ${resp?.ABSID}
        Счет для оплаты комиссии: ${resp?.ABSID}
        Счет для оплаты комиссии Фактор-Клиента: ${resp?.ABSID}
        Примеры назначения платежа: ${resp?.ABSID}
        Задолженность по ранее профинансированным отгрузкам (просрочка, возврат, коррекция):
        ${resp?.ABSID}
        Назначение: ${resp?.Description}`;
        this.isOrganizationLoading = false;
      },
      (error) => {
        this.isOrganizationError = true;
        this.isOrganizationLoading = false;
      }
    );
  }

  public showShipmentsDialog(id): void {
    this.displayShipments = true;
    this.isShipmentsLoading = true;
    this.isShipmentsError = false;

    this.deliveryService.getShipments(id).subscribe(
      (resp) => {
        this.currentShipments = resp;
        this.isShipmentsLoading = false;
      },
      (error) => {
        this.isShipmentsError = true;
        this.isShipmentsLoading = false;
      }
    );
  }

  copyDynamicText() {
    this._clipboardService.copyFromContent(this.currentOrganizationContent);
  }

  public showAllToggle() {
    this.isPagination = !this.isPagination;

    if (this.isPagination) {
      this.btnShowAllText = 'Показать всё';
      this.filterByDate();

      let event = {
        page: 0,
        rows: 10,
      };

      this.paginate(event);
    } else {
      this.btnShowAllText = 'Показать действующие';
      this.listContractsFiltered = this.listContracts;
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
      this.listDisplayContracts = this.listContractsFiltered.slice(
        currentIndex,
        currentIndex + event.rows
      );
    } else {
      let currentIndex = this.paginationPage * this.paginationRows;
      this.updateCurrentPage(currentIndex);

      this.listDisplayContracts = this.listContractsFiltered.slice(
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

      this.filterByDate();

      this.paginate();
      this.isLoading = false;
    });
  }

  private updateCurrentPage(currentPage: number): void {
    this.paginator.changePage(currentPage);
  }

  private filterByDate(): void {
    this.listContractsFiltered = this.listContracts.filter(
      (x) => new Date(x.DateTo) > new Date()
    );
    console.log(this.listContractsFiltered);
  }
}
