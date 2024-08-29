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
	selector: 'mib-agent-client',
	templateUrl: './agent-client.component.html',
	styleUrls: ['./agent-client.component.scss']
})
export class AgentClientComponent implements AfterViewInit, OnDestroy {
	@ViewChild('scrollable') scrollable!: ElementRef<HTMLDivElement>

	private resizeObserver!: ResizeObserver

	public withoutScroll: boolean = !this.toolsService.mobileAndTabletCheck(
		isPlatformBrowser(this.platformId)
	)

	constructor(
		public scrollService: ScrollService,
		private cdr: ChangeDetectorRef,
		private toolsService: ToolsService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	ngAfterViewInit() {
		if (
			isPlatformBrowser(this.platformId) &&
			!this.toolsService.mobileAndTabletCheck(
				isPlatformBrowser(this.platformId)
			)
		) {
			this.resizeObserver = new ResizeObserver(entries => {
				this.checkScroll(this.scrollable.nativeElement)
			})
			this.resizeObserver.observe(this.scrollable.nativeElement)
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