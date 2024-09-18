import {isPlatformBrowser} from '@angular/common'
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	PLATFORM_ID,
	ViewChild
} from '@angular/core'
import {ScrollService} from '../shared/services/scroll.service'
import {ToolsService} from '../shared/services/tools.service'

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit, OnDestroy {
	@ViewChild('scrollable') scrollable!: ElementRef<HTMLDivElement>

	private resizeObserver!: ResizeObserver

	public withoutScroll: boolean = false;

	constructor(
		public scrollService: ScrollService,
		private cdr: ChangeDetectorRef,
		private toolsService: ToolsService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	ngAfterViewInit() {
		if (
			isPlatformBrowser(this.platformId) &&
			!this.toolsService.mobileAndTabletCheck(isPlatformBrowser(this.platformId))
		  ) {
			this.resizeObserver = new ResizeObserver(entries => {
			  this.checkScroll(this.scrollable.nativeElement);
			});
			this.resizeObserver.observe(this.scrollable.nativeElement);
	  
			this.withoutScroll = !this.toolsService.mobileAndTabletCheck(isPlatformBrowser(this.platformId));
		  }
	}

	private checkScroll(element: HTMLDivElement) {
		this.withoutScroll = element.scrollHeight <= element.clientHeight
		this.cdr.detectChanges()
	}

	ngOnDestroy() {
		if (this.resizeObserver && this.scrollable) {
			this.resizeObserver.unobserve(this.scrollable.nativeElement)
		}
	}
}

// import {MenuItem} from 'primeng/api';
// import {Component, OnInit, HostListener} from '@angular/core';
// import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
// import {Subject} from 'rxjs';
// import {Subscription} from 'rxjs';
// import {InactiveDialogComponent} from '../shared/modules/old-modules/inactive-dialog/inactive-dialog.component';

// @Component({
//   selector: 'admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.scss'],
// })
// export class AdminComponent implements OnInit {
//   public items: MenuItem[];

//   refInactiveDialog: DynamicDialogRef;
//   userActivity;
//   userInactive: Subject<any> = new Subject();

//   private subscription$: Subscription = new Subscription();

//   constructor(
//     public dialogService: DialogService
//   ) {
//   }

//   ngOnInit(): void {
//     this.items = [
//       {
//         label: 'Главная',
//         routerLink: 'cabinet',
//         routerLinkActiveOptions: {exact: true},
//       },
//       {
//         label: 'Организации',
//         routerLink: 'organizations',
//         routerLinkActiveOptions: {exact: true},
//       },
//       {
//         label: 'Пользователи',
//         routerLink: 'users',
//         routerLinkActiveOptions: {exact: true},
//       },
//       // {
//       //   label: 'Бизнес-тесты',
//       //   routerLink: 'tests',
//       //   routerLinkActiveOptions: { exact: true },
//       // },
//     ];
//     this.setTimeout();
//     this.userInactive.subscribe(() => {
//       this.openInactive();
//     });
//   }

//   public openInactive() {
//     // if (!this.refInactiveDialog) {
//     //   this.refInactiveDialog = this.dialogService.open(
//     //     InactiveDialogComponent,
//     //     {
//     //       header: 'Внимание',
//     //       width: '50%',
//     //       contentStyle: {'max-height': '550px', overflow: 'auto'},
//     //       baseZIndex: 10000,
//     //     }
//     //   );
//     //
//     //   this.subscription$.add(
//     //     this.refInactiveDialog.onClose.subscribe(() => {
//     //       this.refInactiveDialog = null;
//     //       this.setTimeout();
//     //     })
//     //   );
//     // }
//   }

//   setTimeout() {
//     this.userActivity = setTimeout(
//       () => this.userInactive.next(undefined),
//       900000
//     );
//   }

//   @HostListener('window:mousemove') refreshUserState() {
//     clearTimeout(this.userActivity);
//     this.setTimeout();
//   }

//   ngOnDestroy() {
//     if (this.refInactiveDialog) {
//       this.refInactiveDialog.close();
//     }
//     this.userInactive.unsubscribe();
//     this.subscription$.unsubscribe();
//   }
// }
