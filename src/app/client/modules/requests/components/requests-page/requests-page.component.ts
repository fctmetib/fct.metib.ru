import { RequestCorrectDialogComponent } from './../request-correct-dialog/request-correct-dialog.component';
import { RequestCreateDialogComponent } from './../request-create-dialog/request-create-dialog.component';
import {
  requestsSelector,
  errorSelector,
  isLoadingSelector,
} from './../../store/selectors';
import { Observable, of } from 'rxjs';
import { RequestsResponseInterface } from './../../types/requestResponse.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { getRequestsAction } from '../../store/actions/getRequests.action';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortEvent, MenuItem, MessageService } from 'primeng/api';
import { RequestsService } from '../../services/requests.service';
import { AgencyRequestCreateDialogComponent } from '../agency-request-create-dialog/agency-request-create-dialog.component';
import { ConfirmRequestInterface } from 'src/app/shared/types/common/confirm-request.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
})
export class RequestsPageComponent implements OnInit, OnDestroy {
  public requests$: Observable<RequestsResponseInterface[] | null>;
  public  error$: Observable<string | null>;
  public isLoading$: Observable<boolean>;

  public displayModal: boolean;
  public ref: DynamicDialogRef;
  public items: MenuItem[] = [];

  public confirmForm: FormGroup;
  public confirmDialog: boolean = false;

  public selectedItems: RequestsResponseInterface[] = [];

  public successRequestsDialogMessage: string = null;
  public errorRequestsDialogMessage: string = null;

  constructor(
    private messageService: MessageService,
    private store: Store,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private requestService: RequestsService
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
    this.requests$ = this.store.pipe(select(requestsSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

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

  fetch(): void {
    // TODO: REWORK ON SIMPLE FETCH
    this.store.dispatch(getRequestsAction());
  }

  showCreateAgencyRequestDialog() {
    this.ref = this.dialogService.open(AgencyRequestCreateDialogComponent, {
      header: 'Заявка на агентский факторинг',
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
    let requests: any[] = [];
    console.log(event);

    //TODO: COMPLETE FILTER

    requests = [...event.data].sort((data1, data2) => {
      // console.log(data1['Number'])
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return event.order * result;
    });

    this.requests$ = of(requests);
  }

  showCorrectionDialog() {
    this.ref = this.dialogService.open(RequestCorrectDialogComponent, {
      header: 'Заявка на коррекцию',
      width: '85%',
      baseZIndex: 10000,
    });
  }

  showEditDialog() {
    let selectedRow = this.selectedItems[0];

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
      });
  }

  public initSend() {
    let requestIDs = this.selectedItems.map(x => x.ID);
    this.requestService.sendInit(requestIDs).subscribe(
      (response) => {
        this.confirmForm.patchValue({
          confirmCode: response.ConfirmationCode,
        });
        this.confirmDialog = true;
      },
      (err) => {
        this.showError('При отправке кода произошла ошибка.');
      }
    );
  }

  public confirmSend(): void {
    this.successRequestsDialogMessage = null;
    this.errorRequestsDialogMessage = null;
    let confirmData: ConfirmRequestInterface = {
      ConfirmationCode: this.confirmForm.value.confirmCode,
      Pin: this.confirmForm.value.pin,
    };
    this.requestService.sendConfirm(confirmData).subscribe((resp) => {
      this.confirmDialog = false;
      this.successRequestsDialogMessage = 'Заявка успешно подтверждена';
    });
  }

  public checkSelecteditems() {
    // TODO: rework on a better solution
    this.items.forEach((i) => {
      if (i.id === 'edit') {
        i.disabled = this.checkSelectedItemIsReadonly();
      }
      if (i.id === 'send') {
        i.disabled = this.checkSelectedItemIsCreate();
      }
    });
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

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка!',
      detail: message,
      sticky: true
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
