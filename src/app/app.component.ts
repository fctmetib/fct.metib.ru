import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFactoringAction } from './client/store/actions/getFactoring.action';
import { currentUserFactoringSelector } from './auth/store/selectors';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    let isUserVerified = this.authService.isUserVerified();

    if (isUserVerified) {
      this.store.dispatch(getCurrentUserAction());

      this.store
        .pipe(select(currentUserFactoringSelector))
        .subscribe((user) => {
          if (user) {
            let organizationID = +user.OrganizationID;
            this.store.dispatch(getFactoringAction({ organizationID }));
          }
        });
    }
  }
}
