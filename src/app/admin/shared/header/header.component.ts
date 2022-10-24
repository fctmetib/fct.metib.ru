import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { adminUserFactoringSelector } from 'src/app/auth/store/selectors';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { PageStoreService } from '../services/page-store.service';
import { PageInterface } from '../types/page.interface';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdatePasswordDialogComponent } from 'src/app/shared/modules/update-password-dialog/update-password-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[];
  public baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar';
  public baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`;

  public adminUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public page$: Observable<PageInterface>;

  private subscription$: Subscription = new Subscription();
  private refUpdatePasswordDialog: DynamicDialogRef;

  constructor(
    private readonly store: Store,
    public readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly pageStoreService: PageStoreService
  ) { }

  public ngOnInit(): void {
    this.adminUserFactoring$ = this.store.pipe(
      select(adminUserFactoringSelector)
    );
    this.page$ = this.pageStoreService.getPage();
  }

  public logout(): void {
    this.authService.logout();
  }

  public openUpdatePassword(): void {
    if (!this.refUpdatePasswordDialog) {
      this.refUpdatePasswordDialog = this.dialogService.open(
        UpdatePasswordDialogComponent,
        {
          header: 'Смена пароля',
          width: '450px',
          contentStyle: { 'max-height': '550px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refUpdatePasswordDialog.onClose.subscribe(() => {
          this.refUpdatePasswordDialog = null;
        })
      );
    }
  }

  public openAccountOwner(): void {
    document.getElementById('dropdownMenu').classList.toggle('show');
  }
}
