import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { InactiveDialogComponent } from '../shared/modules/inactive-dialog/inactive-dialog.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/common/localstorage.service';
import { AuthService } from '../auth/services/auth.service';
import { OrganizationService } from '../shared/services/share/organization.service';
import { OrganizationInterface } from '../shared/types/organization/organization.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-not-verify-client',
  templateUrl: './not-verify-client.component.html',
  styleUrls: ['./not-verify-client.component.scss'],
})
export class NotVerifyClientComponent implements OnInit, OnDestroy {
  items: MenuItem[];

  refInactiveDialog: DynamicDialogRef;

  userActivity: ReturnType<typeof setTimeout>;
  userInactive: Subject<any> = new Subject();
  private subscription$: Subscription = new Subscription();

  public preloader: boolean = false;

  public organization: OrganizationInterface;

  constructor(
    public dialogService: DialogService,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.preloader = true;
    if (this.localStorageService.getValue('fromPublic')) {
      this.localStorageService.clearValue('fromPublic');
      let currentUrl = this.router.url;
      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    } else {
      this.preloader = false;
    }

    const isUserLinked = this.authService.isUserLinked();

    if (isUserLinked) {
      this.subscription$.add(
        this.organizationService
          .getOrganizationById(isUserLinked)
          .subscribe((responseOrganization) => {
            this.organization = responseOrganization;
          })
      );
    }

    this.items = [
      // {
      //   label: 'Запросы',
      //   routerLink: 'demand',
      //   styleClass: 'p-menuitem-link-active',
      //   routerLinkActiveOptions: { exact: true },
      // },
      {
        label: 'Запросы',
        routerLink: 'new-demand',
        styleClass: 'p-menuitem-link-active',
        routerLinkActiveOptions: { exact: true },
      },
    ];
    this.setTimeout();
    this.userInactive.subscribe(() => {
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
    this.userActivity = setTimeout(() => {
      this.userInactive.next(undefined);
    }, 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('click', ['$event.target'])
  closeAccountOwner() {
    const _event: any = event;

    if (!_event.target.classList.contains('clickable')) {
      if (isPlatformBrowser(this.platformId)) {
        if (document.getElementById('dropdownMenu').classList.contains('show')) {
          document.getElementById('dropdownMenu').classList.remove('show');
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.refInactiveDialog) {
      this.refInactiveDialog.close();
    }
    this.userInactive.unsubscribe();
    this.subscription$.unsubscribe();
  }
}
