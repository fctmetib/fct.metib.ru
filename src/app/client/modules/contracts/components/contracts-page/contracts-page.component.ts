import { CounterpartyReferenceInterface } from './../../../../../shared/types/counterparty/counterparty-reference.interface';
import { MibArray } from './../../../../../shared/classes/arrays/mib-array.class';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { RequestsService } from './../../../requests/services/requests.service';
import { Router } from '@angular/router';
import { OrganizationInterface } from './../../../../../shared/types/organization/organization.interface';
import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { OrganizationService } from 'src/app/shared/services/share/organization.service';
import { ShipmentInterface } from 'src/app/shared/types/common/shipment-interface';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankRequisitesInterface } from 'src/app/shared/types/bank/bank-requisites.interface';
import { AccountsService } from 'src/app/shared/services/common/accounts.service';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss'],
})
export class ContractsPageComponent implements OnInit, OnDestroy {
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  public noFilter: boolean = true;

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

  public debtorsList: CounterpartyReferenceInterface[] = [];
  public selectedDebtor: CounterpartyReferenceInterface = {
    ID: 0,
    Title: 'Все',
  };

  public isOrganizationError: boolean = false;
  public isOrganizationLoading: boolean = false;
  public currentOrganizationContent: string;
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

  public cols: any[];
  public _selectedColumns: any[];

  public isShipmentsError: boolean = false;
  public isShipmentsLoading: boolean = false;
  public currentShipments: ShipmentInterface[] = [];

  private bankRequisites: BankRequisitesInterface;
  private subscription$: Subscription = new Subscription();

  constructor(
    private deliveryService: DeliveryService,
    private accountsService: AccountsService,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.fetch();

    this.bankRequisites = new MIBCommon().getBankRequisites();
    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'Account', header: 'Аккаунт' },
      { field: 'DateAddon', header: 'Дата дополнения' },
      { field: 'DatePayment', header: 'Дата оплата' },
      { field: 'DateShipment', header: 'Дата поставки' },
      { field: 'DutyCustomer', header: 'Задолженность дебтора' },
      { field: 'DutyDebtor', header: 'Задолженность клиента' },
    ];

    this._selectedColumns = this.cols;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  public showPropertyDialog(id): void {
    this.displayProperty = true;
    this.isOrganizationLoading = true;
    this.isOrganizationError = false;

    this.subscription$.add(
      this.deliveryService.getDeliveryAccounts(id).subscribe(
        (resp) => {
          const accountPayment = resp.filter((x) =>
            x.Number.startsWith('612 12')
          )[0];
          const duties = resp.filter((x) => x.Number.startsWith('458 12'));

          console.log(accountPayment);
          console.log(duties);
          // this.currentOrganization = resp;

          this.currentOrganizationContent = `Банк: ${this.bankRequisites.Title}
        Получатель: ${this.bankRequisites.Title}
        Кор/с: ${this.bankRequisites.COR}
        БИК: ${this.bankRequisites.BIK}
        ИНН: ${this.bankRequisites.INN}
        КПП: ${this.bankRequisites.KPP}
        Счет для оплаты задолженности: ${accountPayment.Number || ''}
        Счет для оплаты комиссии: ${duties[0]?.Number || ''}
        Счет для оплаты комиссии Фактор-Клиента: ${duties[1]?.Number || ''}
        Примеры назначения платежа: Оплата задолженности по договору поручительства в рамках Генерального договора № 20/12-2005 от 16.02.2006, в т. ч. НДС
        Задолженность по ранее профинансированным отгрузкам (просрочка, возврат, коррекция):
        ${accountPayment?.Title || ''}
        Назначение: Оплата ежемесячной комиссии в рамках Генерального договора № 20/12-2005 от 16.02.2006, в т. ч. НДС
        Оплата комиссионного вознаграждения в рамках Генерального договора № 20/12-2005 от 16.02.2006, в т. ч. НДС
        `;
          this.isOrganizationLoading = false;
        },
        (error) => {
          this.isOrganizationError = true;
          this.isOrganizationLoading = false;
        }
      )
    );
  }

  public showShipmentsDialog(id): void {
    this.displayShipments = true;
    this.isShipmentsLoading = true;
    this.isShipmentsError = false;

    this.subscription$.add(
      this.deliveryService.getShipments(id).subscribe(
        (resp) => {
          this.currentShipments = resp;
          this.isShipmentsLoading = false;
        },
        (error) => {
          this.isShipmentsError = true;
          this.isShipmentsLoading = false;
        }
      )
    );
  }

  public getAccountInfo(id): string {
    let foundedObject = this.currentShipments.find((x) => x.ID === id);

    let result: string = '';
    if (foundedObject.Waybill) return foundedObject.Waybill;

    if (foundedObject.Account) return foundedObject.Account;

    if (foundedObject.Request.Number) return foundedObject.Request.Number;

    return result;
  }

  public getOrganizationList(): string[] {
    if (!this.currentOrganizationContent) return;

    let organizationList: string[] = [];
    organizationList = this.currentOrganizationContent.split('\n');
    return organizationList;
  }

  public copyDynamicText() {
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
    this.noFilter = true;
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

  public onDebtorChange(value) {
    if (value === 0) {
      this.paginate();
      return;
    } else {
      this.noFilter = false;
      this.listDisplayContracts = this.listContracts.filter(
        (x) => x.Debtor.ID === value
      );
    }
  }

  private fetch() {
    this.isLoading = true;

    this.subscription$.add(
      this.deliveryService.getDeliveriesWithStats().subscribe((resp) => {
        this.listContracts = resp.sort((a, b) => {
          return (
            new Date(b.DateFrom).getTime() - new Date(a.DateFrom).getTime()
          );
        });

        this.filterByDate();

        this.paginate();

        this.debtorsList = [
          {
            ID: 0,
            Title: 'Все',
          },
        ];

        let debtors = this.listContracts.map((x) => x.Debtor);
        let uniqDebtors = MibArray.getUniqByProperty(debtors, 'Title');

        this.debtorsList.push(...uniqDebtors);

        this.isLoading = false;
      })
    );

    this.accountsService.getAccounts().subscribe(resp => {

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

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
