import { requestsSelector, errorSelector, isLoadingSelector } from './../../store/selectors';
import { Observable } from 'rxjs';
import { RequestsResponseInterface } from './../../types/requestResponse.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestsListSelector } from '../../store/selectors';
import { getRequestsAction } from '../../store/actions/getRequests.action';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {
  requests$: Observable<RequestsResponseInterface[] | null>
  error$: Observable<string | null>
  isLoading$: Observable<boolean>



  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeValues()
    this.fetch()
  }



  ngOnDestroy(): void {

  }

  initializeValues(): void {
    this.requests$ = this.store.pipe(select(requestsSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }

  fetch(): void {
    this.store.dispatch(getRequestsAction())
  }
}
