import { MenuItem } from 'primeng/api';
import { Component, OnInit, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { adminUserFactoringSelector } from '../auth/store/selectors';
import { getCurrentUserAdminAction } from '../auth/store/actions/getCurrentAdmin.action';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { InactiveDialogComponent } from '../shared/modules/inactive-dialog/inactive-dialog.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private store: Store, public dialogService: DialogService) {}

  public items: MenuItem[];

  refInactiveDialog: DynamicDialogRef;
  userActivity;
  userInactive: Subject<any> = new Subject();

  private subscription$: Subscription = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAdminAction());
    this.store.pipe(select(adminUserFactoringSelector));

    this.items = [
      {
        label: 'Главная',
        routerLink: 'cabinet',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Организации',
        routerLink: 'organizations',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Пользователи',
        routerLink: 'users',
        routerLinkActiveOptions: { exact: true },
      },
      // {
      //   label: 'Бизнес-тесты',
      //   routerLink: 'tests',
      //   routerLinkActiveOptions: { exact: true },
      // },
    ];
    this.setTimeout();
    this.userInactive.subscribe(() => {
      console.log('user has been inactive for 15s');
      this.openInactive();
    });
  }

  public openInactive() {
    if (!this.refInactiveDialog) {
      this.refInactiveDialog = this.dialogService.open(
        InactiveDialogComponent,
        {
          header: 'Внимание',
          width: '50%',
          contentStyle: { 'max-height': '550px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refInactiveDialog.onClose.subscribe(() => {
          this.refInactiveDialog = null;
          this.setTimeout();
        })
      );
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      15000
    );
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnDestroy() {
    if (this.refInactiveDialog) {
      this.refInactiveDialog.close();
    }
    this.userInactive.unsubscribe();
    this.subscription$.unsubscribe();
  }
}
