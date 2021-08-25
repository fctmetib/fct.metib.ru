import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFactoringAction } from './client/store/actions/getFactoring.action';
import { currentUserFactoringSelector } from './auth/store/selectors';
import { AuthService } from './auth/services/auth.service';
import { CryptoService } from './shared/services/common/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private authService: AuthService, private cryptoService: CryptoService) {}

  ngOnInit() {
    this.store.dispatch(getCurrentUserAction());

    this.store.pipe(select(currentUserFactoringSelector)).subscribe((user) => {
      if (user && user.CustomerID !== 0) {
        let organizationID = +user.OrganizationID;
        this.store.dispatch(getFactoringAction({ organizationID }));
      }
    });
  }
}
