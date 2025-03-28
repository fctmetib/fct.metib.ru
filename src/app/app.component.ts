import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {AuthService} from './auth/services/auth.service'
import {DestroyService} from './shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'
import {isPlatformBrowser} from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private destroy$: DestroyService,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.scrollToTop()
        }
      })
      // this.authSrv.reauth().pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        if (this.authSrv.isUserLoggedIn) {
          this.authSrv.reauth().pipe(takeUntil(this.destroy$)).subscribe()
        }
      }, 1800000)
    }
  }

  scrollToTop(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = 0
    }
  }
}
