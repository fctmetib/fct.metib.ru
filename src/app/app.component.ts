import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFactoringAction } from './client/store/actions/getFactoring.action';
import { currentUserFactoringSelector } from './auth/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(getCurrentUserAction());

    this.store.pipe(select(currentUserFactoringSelector)).subscribe((user) => {
      if (user) {
        let organizationID = +user.OrganizationID;
        this.store.dispatch(getFactoringAction({ organizationID }));
      }
    });
  }
}
