import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FactoringInterface } from '../../../../types/factoring.interface';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { currentUserFactoringSelector, isLoadingSelector } from 'src/app/auth/store/selectors';
import { ClientService } from 'src/app/shared/services/common/client.service';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent implements OnInit {
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public loading$: Observable<boolean | null>;

  factoring: FactoringInterface;

  constructor(
    private clientService: ClientService,
    private authSerice: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(isLoadingSelector));
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
  }

  public logout(): void {
    this.authSerice.logout();
  }
}
