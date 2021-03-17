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
import { SortEvent, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
})
export class RequestsPageComponent implements OnInit, OnDestroy {
  requests$: Observable<RequestsResponseInterface[] | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  displayModal: boolean;
  ref: DynamicDialogRef;
  items: MenuItem[] = [];

  selectedItems: RequestsResponseInterface[] = [];

  constructor(private store: Store, public dialogService: DialogService) {}

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
        label: 'Редактировать',
        command: () => this.showEditDialog(),
      },
      {
        label: 'Создать',
        command: () => this.showCreateRequestDialog(),
      },
      {
        label: 'Создать из подтверждений',
        routerLink: '',
      },
      {
        label: 'Сделать коррекцию',
        routerLink: '',
      },
      {
        label: 'События',
        routerLink: '',
      },
      {
        label: 'Документы',
        routerLink: '',
      },
      {
        label: 'Удалить',
        routerLink: '',
      },
      {
        label: 'Отправить',
        routerLink: '',
      },
    ];
  }

  fetch(): void {
    this.store.dispatch(getRequestsAction());
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
      if(data.success) {
        this.fetch();
      }
    });
  }

  customSort(event: SortEvent) {
    let requests: any[] = [];
    console.log(event);

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

  showEditDialog() {
    let selectedRow = this.selectedItems[0];
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
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
