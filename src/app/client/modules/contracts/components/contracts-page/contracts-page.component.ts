import { CounterpartyReferenceInterface } from './../../../../../shared/types/counterparty/counterparty-reference.interface';
import { MibArray } from './../../../../../shared/classes/arrays/mib-array.class';
import { OrganizationInterface } from './../../../../../shared/types/organization/organization.interface';
import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { ShipmentInterface } from 'src/app/shared/types/common/shipment-interface';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';

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

  /**
   * @property Хранит в себе данные, полученные от бекенда
   */
  public listContracts: DeliveryInterface[] = [];

  /**
   * @property Хранит в себе данные, для отображения "Действующие договоры"
   */
  public listContractsFiltered: DeliveryInterface[] = [];

  public isPagination: boolean = true;
  public btnShowAllText: string = 'Показать всё';

  /**
   * @property Отвечает за отображение данных
   */
  public listDisplayContracts: DeliveryInterface[] = [];

  public type: string = 'current';

  public paginationPage: number = 0;
  public paginationRows: number = 10;

  public displayProperty: boolean = false;
  public displayShipments: boolean = false;

  public debtorsList: CounterpartyReferenceInterface[] = [];
  public selectedDebtorDisplay: CounterpartyReferenceInterface = {
    ID: 0,
    Title: 'Все',
  };
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

  private subscription$: Subscription = new Subscription();

  constructor(
    private deliveryService: DeliveryService,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.fetch();

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
      this.deliveryService.getRequisitesById(id).subscribe(
        (resp) => {
          this.currentOrganizationContent = resp;
          this.isOrganizationLoading = false;
        },
        (error) => {
          this.isOrganizationError = true;
          this.isOrganizationLoading = false;
        }
      )
    );
  }

  public getSumDutyDebtor(): number {
    if (this.cols.find((x) => x.field === 'DutyDebtor')) {
      return this.currentShipments.reduce(
        (sum, current) => sum + current.DutyDebtor,
        0
      );
    }
  }

  public getSumDutyCustomer(): number {
    if (this.cols.find((x) => x.field === 'DutyCustomer')) {
      return this.currentShipments.reduce(
        (sum, current) => sum + current.DutyCustomer,
        0
      );
    }
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
    if (this.type === 'all') {
      this.btnShowAllText = 'Показать всё';
      this.type = 'current';
    } else if (this.type === 'current') {
      this.btnShowAllText = 'Показать действующие';
      this.type = 'all';
    }

    this.updateDisplayData(this.type, this.selectedDebtor.ID);
  }

  // start

  /**
   *
   *
   * @private
   * @param {string} type - тип кнопки - "Показать действующие" = "current"; "Показать все" = "all";
   * @param {number} debtorId - id дебтора
   */
  private updateDisplayData(type: string, debtorId: number) {
    // список всех договоров
    let list: DeliveryInterface[] = this.listContracts;

    // отсекаем данные из общего списка по типу type
    let filteredByDateList: DeliveryInterface[] = [];
    if (type === 'current') {
      filteredByDateList = this.getCurrentList(list);
    }
    if (type === 'all') {
      filteredByDateList = list;
    }

    // отсекаем данные по debtorId
    let filteredByDebtorList: DeliveryInterface[] = [];
    if (debtorId) {
      filteredByDebtorList = filteredByDateList.filter(
        (x) => x.Debtor.ID === debtorId
      );
    } else {
      filteredByDebtorList = filteredByDateList;
    }

    // задаем данные в filtered list
    this.listContractsFiltered = filteredByDebtorList;

    // делаем пагинацию
    this.paginateData();
  }

  public paginateData(event?): void {
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

  private getCurrentList(
    originalList: DeliveryInterface[]
  ): DeliveryInterface[] {
    let filteredList: DeliveryInterface[] = originalList.filter(
      (x) => new Date(x.DateTo) > new Date()
    );
    return filteredList;
  }

  // end

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
      this.selectedDebtor = {
        ID: 0,
        Title: 'Все',
      };
      this.btnShowAllText = 'Показать всё';
      this.type = 'current';
      this.updateDisplayData(this.type, this.selectedDebtor.ID);
    } else {
      let selectedDebtor = this.debtorsList.find((x) => x.ID === value);
      this.selectedDebtor = {
        ID: value,
        Title: selectedDebtor.Title,
      };
      this.paginationPage = 0;
      this.paginationRows = 10;
      this.updateDisplayData(this.type, this.selectedDebtor.ID);
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

        this.selectedDebtorDisplay = {
          ID: 0,
          Title: 'Все'
        };
        this.selectedDebtor = {
          ID: 0,
          Title: 'Все',
        };
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
  }

  private updateCurrentPage(currentPage: number): void {
    this.paginator.changePage(currentPage);
  }

  private filterByDate(): void {
    this.listContractsFiltered = this.listContracts.filter(
      (x) => new Date(x.DateTo) > new Date()
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public exportExcel(): void {
    import('xlsx').then((xlsx) => {
      let exportData: any[] = [];
      this.currentShipments.forEach((item) => {
        let object: any = {};
        this.cols.forEach((column) => {
          object[column.field] = item[column.field];
        });
        exportData.push(object);
      });

      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this._saveAsExcelFile(excelBuffer, 'отчет');
    });
  }

  private _saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
