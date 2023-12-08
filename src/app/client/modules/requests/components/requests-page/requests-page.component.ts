import { RequestCorrectDialogComponent } from './../request-correct-dialog/request-correct-dialog.component';
import { RequestCreateDialogComponent } from './../request-create-dialog/request-create-dialog.component';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { RequestsResponseInterface } from './../../types/requestResponse.interface';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  Directive,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortEvent, MenuItem } from 'primeng/api';
import { RequestsService } from '../../services/requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStoreService } from 'src/app/shared/services/store/request.store.service';
import { DocumentViewDialogComponent } from 'src/app/client/shared/components/dialogs/document-view-dialog/document-view-dialog.component';
import { SignService } from 'src/app/shared/services/share/sign.service';
import { EventsViewComponent } from './events-view/events-view.component';

@Directive({
  selector: '[tableHighlight]',
})
export class TableHighlightDirective { }

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
})
export class RequestsPageComponent implements OnInit, OnDestroy {
  public requests$: Observable<RequestsResponseInterface[] | null>;
  public loading$: Observable<boolean>;

  public selectedRequest$ = new BehaviorSubject<RequestsResponseInterface>(null);

  public displayModal: boolean;
  public ref: DynamicDialogRef;
  public eventViewRef: DynamicDialogRef;
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
    private signService: SignService,
  ) { }

  public ngOnInit(): void {
    this.initializeValues();
    this.fetch();
  }

  private initializeValues(): void {
    this.loading$ = this.requestStoreService.getLoading;
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
        // todo: нужно
        id: 'createCorrection',
        label: 'Сделать коррекцию',
        command: () => this.showCorrectionDialog(),
      },
      {
        id: 'events',
        label: 'События',
        command: () => this.getEvents(),
      },
      {
        id: 'remove',
        label: 'Удалить',
        command: () => this.removeRequests(),
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

  public selectRow(request: RequestsResponseInterface): void {
    this.subscription$.add(
      this.requestService
        .getRequestByIdAndParams(request.ID, true, true)
        .subscribe((requestWithAdditionalData) => {
          this.selectedRequest$.next(requestWithAdditionalData);
        })
    );
  }

  public documentViewHandler(document: any): void {
    this.openDocumentViewer({
      document,
      requestID: this.selectedRequest$.value.ID,
    });
  }

  public refresh(): void {
    this.fetch(true);
  }

  private fetch(isRefresh?: boolean): void {
    this.requestStoreService.clear();
    this.requests$ = this.requestStoreService.getRequests(isRefresh);
  }

  private showCreateRequestDialog(): void {
    this.ref = this.dialogService.open(RequestCreateDialogComponent, {
      header: 'Создание заявки',
      baseZIndex: 10000,
    });

    this.ref.onClose.pipe(
      tap(() => {
        this.fetch();
      })
    ).subscribe();
  }

  public customSort(event: SortEvent): void {
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

  private showCorrectionDialog(): void {
    let selectedRow = this.selectedItems[0];

    if (selectedRow && !selectedRow.IsCorrected) {
      this.ref = this.dialogService.open(RequestCorrectDialogComponent, {
        data: this.selectedItems,
        header: 'Заявка на коррекцию',
        width: '85%',
        baseZIndex: 10000,
      });
      this.ref.onClose.pipe(
        tap(() => {
          this.fetch();
        })
      ).subscribe()
    }

  }

  private showEditDialog(): void {
    let selectedRow = this.selectedItems[0];

    if (selectedRow && !selectedRow.ReadOnly) {
      this.subscription$.add(
        this.requestService
          .getRequestByIdAndParams(selectedRow.ID, true, true)
          .subscribe((resp: RequestsResponseInterface): void => {
            selectedRow = resp;
  
            if (selectedRow) {
              this.ref = this.dialogService.open(RequestCreateDialogComponent, {
                header: 'Редактирование заявки',
                width: '70%',
                contentStyle: { height: '800px', overflow: 'auto' },
                baseZIndex: 10000,
                data: selectedRow,
              });
            }
          })
      );
    }
  }

  private initSend(): void {
    let requestIDs = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID);
    this.subscription$.add(
      this.signService.getActiveSession().pipe(
        switchMap((result) => {
          if (result) {
            return this.requestService.send(requestIDs).pipe(
              tap(() => this.fetch())
              )
          } else {
            return this.signService.getPin().pipe(
              tap(() => {
                this.confirmDialog = true;
              })
            )
          }
        }),
        tap(() => {
        })
      ).subscribe()
    );
  }

  public confirmSend(): void {
    let requestIDs = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID);
    this.successRequestsDialogMessage = null;
    this.errorRequestsDialogMessage = null;

    this.subscription$.add(
      this.signService.createSession(this.confirmForm.value.pin).pipe(
        switchMap(() => this.requestService.send(requestIDs)),
        tap(() => {
          this.confirmDialog = false;
          this.fetch();
          this.successRequestsDialogMessage = 'Заявка успешно подтверждена';
        })
      ).subscribe()
    );
  }

  public checkSelecteditems(): void {
    // TODO: rework on a better solution
    this.items.forEach((item: MenuItem): void => {
      switch (item.id) {
        case 'send':
        case 'remove':
          item.disabled = this.checkSelectedItemIsCreate();
          break;
        case 'edit':
          item.disabled = this.checkSelectedItemIsReadonly();
          break;
        case 'edit':
          item.disabled = this.checkSelectedItemIsCreate();
          break;
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

  private openDocumentViewer(document: any): void {
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
  }

  private checkSelectedItemIsReadonly(): boolean {
    let isFromDuty = this.selectedItems.filter((x) => x.ReadOnly === true);
    return isFromDuty.length > 0 ? true : false;
  }

  private checkSelectedItemIsCreate(): boolean {
    let isCreated = this.selectedItems.filter((x) => x.Status !== 'Создана');
    return isCreated.length > 0 ? true : false;
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    if (this.ref) {
      this.ref.close();
    }
  }

  private getEvents(): void {
    let requestID = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID)[0];
    this.requestService.getRequestEvents(requestID).pipe(
      tap((events) => {
        this.eventViewRef = this.dialogService.open(
          EventsViewComponent,
          {
            header: 'История',
            width: '50%',
            contentStyle: { 'max-height': '550px', overflow: 'auto' },
            baseZIndex: 10000,
            data: events,
          }
        );
      })
    ).subscribe();
  }

  private removeRequests(): void {
    let requestIDs = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID);
    this.requestService.delete(requestIDs).pipe(
      tap(() => {
        this.fetch();
      })
    ).subscribe();
  }
}
