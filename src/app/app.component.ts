import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFactoringAction } from './client/store/actions/getFactoring.action';
import { currentUserFactoringSelector } from './auth/store/selectors';
import { CurrentUserFactoringInterface } from './shared/types/currentUserFactoring.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());

    this.store
      .pipe(select(currentUserFactoringSelector))
      .subscribe((user: CurrentUserFactoringInterface): void => {
        if (user && user.CustomerID !== 0) {
          let organizationID = +user.OrganizationID;
          this.store.dispatch(getFactoringAction({ organizationID }));
        }
      });
  }
}
