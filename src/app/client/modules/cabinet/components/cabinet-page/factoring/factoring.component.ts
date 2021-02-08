import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClientService } from 'src/app/shared/services/common/client.service';
import { FactoringInterface } from 'src/app/protected/types/factoring.interface';

@Component({
  selector: 'app-factoring',
  templateUrl: './factoring.component.html',
  styleUrls: ['./factoring.component.scss'],
})
export class FactoringComponent implements OnInit {
  @Input('factoringUser') factoringUser: CurrentUserFactoringInterface

  currentUser: CurrentUserFactoringInterface;
  public factoring: FactoringInterface;

  constructor(
    private clientService: ClientService,
    private authSerice: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    this.currentUser = this.factoringUser;
    this.clientService.getClientFactoringById(+this.currentUser.OrganizationID).subscribe(factoring => {
      this.factoring = factoring;
    });
  }
}
