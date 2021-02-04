import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FactoringInterface } from '../../../../types/factoring.interface';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { currentUserFactoringSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent implements OnInit {
  currentUser$: Observable<CurrentUserFactoringInterface | null>;
  factoring: FactoringInterface;

  loading: boolean = false;

  constructor(
    private clientService: ClientService,
    private authSerice: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    this.loading = true;
    this.currentUser$ = this.store.pipe(select(currentUserFactoringSelector));
    this.currentUser$.subscribe((user) => {
      this.clientService.getFactoring(user.OrganizationID).subscribe((factoring) => {
        this.factoring = factoring
        this.loading = false;
      });
    });
  }

  public logout(): void {
    this.authSerice.logout();
  }
}
