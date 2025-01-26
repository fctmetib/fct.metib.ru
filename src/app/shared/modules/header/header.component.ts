import {
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Inject,
	Input,
	OnInit,
	Output,
	PLATFORM_ID,
	ViewChild
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { BehaviorSubject, Observable, filter, finalize, switchMap, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserFactoring } from '../../types/userFactoring';
import { UserGeneral } from '../../types/userGeneral';
import { Customer } from '../../types/customer/customer';
import { MenuItem } from 'primeng/api';
import { ClientService } from '../../services/common/client.service';
import { Properties } from 'csstype';
import { DropdownService } from '../../ui-kit/dropdown/services/dropdown.service';
import { BreakpointObserverService } from '../../services/common/breakpoint-observer.service';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from '../../tokens/window.token';
import { SystemUserService } from '../../services/system-user.service';

@Component({
	selector: 'mib-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() signedIn: boolean = false;
	@Input() showExtension: boolean = false;
	@Input() showProfileButton: boolean = false;

	@Output() onBurger = new EventEmitter();

	@ViewChild('header') el: ElementRef<HTMLDivElement>;

	authService = inject(AuthService);
	breakpointService = inject(BreakpointObserverService);
	private clientService = inject(ClientService);
	private systemUserService = inject(SystemUserService);
	private platformId: Object = inject(PLATFORM_ID);
	private window = inject(WINDOW);

	items: MenuItem[];
	baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar/';
	baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`;

	userLoading$ = new BehaviorSubject<boolean>(false);
	factoringLoading$ = new BehaviorSubject<boolean>(false);

	currentUserFactoring$ = new BehaviorSubject<UserFactoring>(null);
	currentUser$ = new BehaviorSubject<UserGeneral>(null);
	factoring$ = new BehaviorSubject<Customer>(null);

	currentUserAdmin$ = new BehaviorSubject<UserGeneral>(null);

	isVerified$ = new BehaviorSubject<boolean>(false);

	skeleton: Properties = {
		borderRadius: '8px'
	};

	isDesktop$: Observable<boolean>;
	systemUser = this.systemUserService?.getCookieUser();

	get isCustomer() {
		return this.systemUser?.Roles?.includes('Customer');
	}
	get isUser() {
		return this.systemUser?.Roles?.includes('User');
	}
	get isAdmin() {
		return this.systemUser?.Roles?.includes('Admin');
	}
	get isStaff() {
		return this.systemUser?.Roles?.includes('Staff');
	}

	get classes() {
		return {
			'header_show-extension': this.showExtension,
			[`header_${this.signedIn ? 'signed' : 'unsigned'}`]: true
		};
	}

	get profile() {
		return this.currentUser$?.value?.Profile;
	}

	get login() {
		return this.currentUser$?.value?.Profile.Login;
	}

	get currentUserAvatar() {
		return this.currentUser$?.value?.Profile.AvatarImage;
	}

	get manager() {
		return this.factoring$.value?.Manager;
	}

	get managerAvatar() {
		return this.baseAvatarUrl + this.factoring$.value?.Manager?.Avatar;
	}

	get managerInitials() {
		return this.getInitials(this.manager?.Name ?? 'О');
	}

	get name() {
		return `${this.profile?.Name?.Last} ${this.profile?.Name?.First}`;
	}

	get nameInitials() {
		return this.getInitials(this.name);
	}

	get height() {
		return this.el?.nativeElement?.offsetHeight ?? 0;
	}

	private getInitials(name: string) {
		return name
			.split(' ')
			.map(x => x.slice(0, 1))
			.join('');
	}

	ngOnInit() {
		this.isVerified$.next(this.authService.isUserVerified());
		this.isDesktop$ = this.breakpointService.isDesktop();
		this.userLoading$.next(true);
		this.factoringLoading$.next(true);
		this.authService.currentUser$
			.pipe(
				filter(Boolean),
				tap(currentUser => {
					console.log(currentUser);
					this.currentUser$.next(currentUser.userGeneral);
					this.currentUserFactoring$.next(currentUser.userFactoring);
					this.userLoading$.next(false);
				}),
				switchMap(currentUser =>
					this.clientService
						.getClientFactoringById(+currentUser.userFactoring.OrganizationID)
						.pipe(takeUntil(this.isVerified$))
						.pipe(finalize(() => this.factoringLoading$.next(false)))
				),
				tap(clientFactoring => {
					this.factoring$.next(clientFactoring);
				})
			)
			.subscribe();

		this.authService.currentUserAdmin$
			.pipe(
				filter(Boolean),
				tap(currentAdmin => {
					this.currentUser$.next(currentAdmin.userGeneral);
					this.currentUserFactoring$.next(currentAdmin.userFactoring);
					this.userLoading$.next(false);
				})
			)
			.subscribe();
	}

	logout() {
		this.authService.logout();
	}

	openExternalSite() {
		if (isPlatformBrowser(this.platformId)) {
			this.window?.open('https://fct.metallinvestbank.ru/login', '_blank');
		}
	}

	openExternalSiteByURL(url: string) {
		if (isPlatformBrowser(this.platformId)) {
			this.window?.open(url, '_blank');
		}
	}
}
