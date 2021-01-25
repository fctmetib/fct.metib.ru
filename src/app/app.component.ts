import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metallinvestbank-web';

  constructor(private store: Store) {
    this.store.dispatch(getCurrentUserAction())
  }
}
