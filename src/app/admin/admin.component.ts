import {MenuItem} from 'primeng/api';
import {Component, OnInit, HostListener} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {Subscription} from 'rxjs';
import {InactiveDialogComponent} from '../shared/modules/old-modules/inactive-dialog/inactive-dialog.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public items: MenuItem[];

  refInactiveDialog: DynamicDialogRef;
  userActivity;
  userInactive: Subject<any> = new Subject();

  private subscription$: Subscription = new Subscription();

  constructor(
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Главная',
        routerLink: 'cabinet',
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Организации',
        routerLink: 'organizations',
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Пользователи',
        routerLink: 'users',
        routerLinkActiveOptions: {exact: true},
      },
      // {
      //   label: 'Бизнес-тесты',
      //   routerLink: 'tests',
      //   routerLinkActiveOptions: { exact: true },
      // },
    ];
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.openInactive();
    });
  }

  public openInactive() {
    // if (!this.refInactiveDialog) {
    //   this.refInactiveDialog = this.dialogService.open(
    //     InactiveDialogComponent,
    //     {
    //       header: 'Внимание',
    //       width: '50%',
    //       contentStyle: {'max-height': '550px', overflow: 'auto'},
    //       baseZIndex: 10000,
    //     }
    //   );
    //
    //   this.subscription$.add(
    //     this.refInactiveDialog.onClose.subscribe(() => {
    //       this.refInactiveDialog = null;
    //       this.setTimeout();
    //     })
    //   );
    // }
  }

  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      900000
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
