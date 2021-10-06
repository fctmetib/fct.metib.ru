import { RequestCorrectDialogComponent } from './../request-correct-dialog/request-correct-dialog.component';
import { RequestCreateDialogComponent } from './../request-create-dialog/request-create-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { RequestsResponseInterface } from './../../types/requestResponse.interface';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChildren,
  Directive,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortEvent, MenuItem } from 'primeng/api';
import { RequestsService } from '../../services/requests.service';
import { AgencyRequestCreateDialogComponent } from '../agency-request-create-dialog/agency-request-create-dialog.component';
import { ConfirmRequestInterface } from 'src/app/shared/types/common/confirm-request.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStoreService } from '../../../../../shared/services/store/request.store.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { DocumentViewDialogComponent } from 'src/app/client/shared/components/dialogs/document-view-dialog/document-view-dialog.component';

@Directive({
  selector: '[tableHighlight]',
})
export class TableHighlightDirective {}

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
})
export class RequestsPageComponent implements OnInit, OnDestroy {
  public requests$: Observable<RequestsResponseInterface[] | null>;
  public loading$: Observable<boolean>;
  // public requests: RequestsResponseInterface[];

  public selectedRequest: RequestsResponseInterface;

  public displayModal: boolean;
  public ref: DynamicDialogRef;
  public items: MenuItem[] = [];

  public confirmForm: FormGroup;
  public confirmDialog: boolean = false;

  public selectedItems: RequestsResponseInterface[] = [];

  public successRequestsDialogMessage: string = null;
  public errorRequestsDialogMessage: string = null;

  @ViewChildren(TableHighlightDirective)
  tableHighlight: TableHighlightDirective;

  private refDocumentViewDialog: DynamicDialogRef;

  private subscription$: Subscription = new Subscription();

  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private requestService: RequestsService,
    private requestStoreService: RequestStoreService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
    this.items = [
      {
        id: 'create',
        label: 'Создать',
        command: () => this.showCreateRequestDialog(),
      },
      {
        id: 'edit',
        label: 'Редактировать',
        command: () => this.showEditDialog(),
      },
      {
        id: 'agency',
        label: 'Агентская заявка',
        command: () => this.showCreateAgencyRequestDialog(),
      },
      {
        id: 'createFrom',
        label: 'Создать из подтверждений',
        routerLink: '',
      },
      {
        id: 'createCorrection',
        label: 'Сделать коррекцию',
        command: () => this.showCorrectionDialog(),
      },
      {
        id: 'events',
        label: 'События',
        routerLink: '',
      },
      {
        id: 'documents',
        label: 'Документы',
        routerLink: '',
      },
      {
        id: 'remove',
        label: 'Удалить',
        routerLink: '',
      },
      {
        id: 'send',
        label: 'Отправить',
        command: () => this.initSend(),
      },
    ];

    this.confirmForm = this.fb.group({
      pin: ['', [Validators.required]],
      confirmCode: [''],
    });
  }

  public selectRow(request: RequestsResponseInterface) {
    this.subscription$.add(
      this.requestService
        .getRequestByIdAndParams(request.ID, true, true, true)
        .subscribe((requestWithAdditionalData) => {
          this.selectedRequest = requestWithAdditionalData;
        })
    );
  }

  public documentViewHandler(document) {
    const data = {
      document,
      requestID: this.selectedRequest.ID,
    }
    this.openDocumentViewer(data)
  }

  refresh(): void {
    this.fetch(true);
  }

  fetch(isRefresh?: boolean): void {
    this.requests$ = this.requestStoreService.getRequests(isRefresh);
    this.loading$ = this.requestStoreService.getLoading();
  }

  showCreateAgencyRequestDialog() {
    this.ref = this.dialogService.open(AgencyRequestCreateDialogComponent, {
      header: 'Реестр поручений',
      width: '85%',
      contentStyle: { height: '800px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log('closed');
    });
  }

  showCreateRequestDialog() {
    this.ref = this.dialogService.open(RequestCreateDialogComponent, {
      header: 'Создание заявки',
      width: '85%',
      contentStyle: { height: '800px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log('closed');
    });
  }

  customSort(event: SortEvent) {
    // let requests: any[] = [];
    // console.log(event);
    // //TODO: COMPLETE FILTER
    // requests = [...event.data].sort((data1, data2) => {
    //   // console.log(data1['Number'])
    //   let value1 = data1[event.field];
    //   let value2 = data2[event.field];
    //   let result = null;
    //   if (value1 == null && value2 != null) {
    //     result = -1;
    //   } else if (value1 != null && value2 == null) {
    //     result = 1;
    //   } else if (value1 == null && value2 == null) {
    //     result = 0;
    //   } else if (typeof value1 === 'string' && typeof value2 === 'string') {
    //     result = value1.localeCompare(value2);
    //   } else {
    //     result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    //   }
    //   return event.order * result;
    // });
    // this.requests = [...requests];
  }

  showCorrectionDialog() {
    this.ref = this.dialogService.open(RequestCorrectDialogComponent, {
      data: this.selectedItems,
      header: 'Заявка на коррекцию',
      width: '85%',
      baseZIndex: 10000,
    });
  }

  showEditDialog() {
    let selectedRow = this.selectedItems[0];

    this.subscription$.add(
      this.requestService
        .getRequestByIdAndParams(selectedRow.ID, true, true, true)
        .subscribe((resp) => {
          selectedRow = resp;

          if (selectedRow) {
            this.ref = this.dialogService.open(RequestCreateDialogComponent, {
              header: 'Редактирование заявки',
              width: '70%',
              contentStyle: { height: '800px', overflow: 'auto' },
              baseZIndex: 10000,
              data: selectedRow,
            });

            this.ref.onClose.subscribe((data: any) => {
              console.log('closed');
            });
          }
        })
    );
  }

  public initSend() {
    let requestIDs = this.selectedItems.map((x) => x.ID);
    this.subscription$.add(
      this.requestService.sendInit(requestIDs).subscribe((response) => {
        this.confirmForm.patchValue({
          confirmCode: response.ConfirmationCode,
        });
        this.confirmDialog = true;
      })
    );
  }

  public confirmSend(): void {
    this.successRequestsDialogMessage = null;
    this.errorRequestsDialogMessage = null;
    let confirmData: ConfirmRequestInterface = {
      ConfirmationCode: this.confirmForm.value.confirmCode,
      Pin: this.confirmForm.value.pin,
    };

    this.subscription$.add(
      this.requestService.sendConfirm(confirmData).subscribe((resp) => {
        this.confirmDialog = false;
        this.successRequestsDialogMessage = 'Заявка успешно подтверждена';
      })
    );
  }

  public checkSelecteditems() {
    // TODO: rework on a better solution
    this.items.forEach((i) => {
      if (i.id === 'send') {
        i.disabled = this.checkSelectedItemIsCreate();
      }
      if (i.id === 'remove') {
        i.disabled = this.checkSelectedItemIsCreate();
      }
      if (i.id === 'edit') {
        i.disabled = this.checkSelectedItemIsReadonly();
        return;
      }
      if (i.id === 'edit') {
        i.disabled = this.checkSelectedItemIsCreate();
        return;
      }
    });
  }

  // @HostListener('window:mouseup', ['$event'])
  // mouseUp(event){
  //   console.log('ff', event.target)
  //   console.log(window.getSelection().getRangeAt(0))
  //   let container: any = window.getSelection().getRangeAt(0).commonAncestorContainer
  //   let children = container.children;
  //   console.log(children)
  //   let ff = this.tableHighlight;
  //   console.log(ff)
  // }

  private openDocumentViewer(document: any) {
    this.refDocumentViewDialog = this.dialogService.open(
      DocumentViewDialogComponent,
      {
        header: 'Просмотр Документа',
        width: '50%',
        contentStyle: { 'max-height': '550px', overflow: 'auto' },
        baseZIndex: 10000,
        data: document,
      }
    );

    this.subscription$.add(
      this.refDocumentViewDialog.onClose.subscribe(() => {})
    );
  }

  private checkSelectedItemIsReadonly(): boolean {
    let isFromDuty = this.selectedItems.filter((x) => x.ReadOnly === true);
    console.log(isFromDuty);
    return isFromDuty.length > 0 ? true : false;
  }

  private checkSelectedItemIsCreate(): boolean {
    let isCreated = this.selectedItems.filter((x) => x.Status !== 'Создана');
    console.log(isCreated);
    return isCreated.length > 0 ? true : false;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this.ref) {
      this.ref.close();
    }
  }
}
