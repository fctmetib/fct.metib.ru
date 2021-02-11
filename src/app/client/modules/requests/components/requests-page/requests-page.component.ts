import { RequestCreateDialogComponent } from './../request-create-dialog/request-create-dialog.component';
import {
  requestsSelector,
  errorSelector,
  isLoadingSelector,
} from './../../store/selectors';
import { Observable } from 'rxjs';
import { RequestsResponseInterface } from './../../types/requestResponse.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestsListSelector } from '../../store/selectors';
import { getRequestsAction } from '../../store/actions/getRequests.action';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  loading: boolean = true;
  ref: DynamicDialogRef;

  selectedItems: RequestsResponseInterface[];

  constructor(
    private store: Store,
    public dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    this.requests$ = this.store.pipe(select(requestsSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  fetch(): void {
    this.store.dispatch(getRequestsAction());
  }

  showCreateRequestDialog() {
    this.ref = this.dialogService.open(RequestCreateDialogComponent, {
      header: 'Создать Заявку',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log('closed');
    });
  }

  OnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  selectProduct(item: any) {
    console.log(item);
  }

  onRowSelect(event) {
    console.log(event.data);
  }

  onRowUnselect(event) {
    console.log(event.data);
  }
}
