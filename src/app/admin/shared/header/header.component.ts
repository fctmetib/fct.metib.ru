import {environment} from 'src/environments/environment'

import {AuthService} from 'src/app/auth/services/auth.service'
import {BehaviorSubject, Observable, filter, tap} from 'rxjs'
import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {PageStoreService} from '../services/page-store.service'
import {PageInterface} from '../types/page.interface'
import {Subscription} from 'rxjs'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {isPlatformBrowser} from '@angular/common'
import {UserFactoring} from 'src/app/shared/types/userFactoring'
import {UpdatePasswordDialogComponent} from '../../../shared/modules/old-modules/update-password-dialog/update-password-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[]
  public baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar'
  public baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`

  public adminUserFactoring$ = new BehaviorSubject<UserFactoring>(null)
  public page$: Observable<PageInterface>

  private subscription$: Subscription = new Subscription()
  private refUpdatePasswordDialog: DynamicDialogRef

  constructor(
    public readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly pageStoreService: PageStoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  public ngOnInit(): void {
    this.authService.currentUserAdmin$
      .pipe(
        filter(Boolean),
        tap(currentUser => {
          this.adminUserFactoring$.next(currentUser.userFactoring)
        })
      )
      .subscribe()
    this.page$ = this.pageStoreService.getPage()
  }

  public logout(): void {
    this.authService.logout()
  }

  public openUpdatePassword(): void {
    if (!this.refUpdatePasswordDialog) {
      this.refUpdatePasswordDialog = this.dialogService.open(
        UpdatePasswordDialogComponent,
        {
          header: 'Смена пароля',
          width: '450px',
          contentStyle: {'max-height': '550px', overflow: 'auto'},
          baseZIndex: 10000
        }
      )

      this.subscription$.add(
        this.refUpdatePasswordDialog.onClose.subscribe(() => {
          this.refUpdatePasswordDialog = null
        })
      )
    }
  }

  public openAccountOwner(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('dropdownMenu').classList.toggle('show')
    }
  }
}
