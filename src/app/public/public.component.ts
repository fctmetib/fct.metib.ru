import {isPlatformBrowser} from '@angular/common'
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
	ViewEncapsulation
} from '@angular/core'

@Component({
	selector: 'public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class PublicComponent implements AfterViewInit {
	public height: number = 103

	@ViewChild('header', {static: false}) headerElement!: ElementRef

	constructor(
		private elementRef: ElementRef,
		private cd: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId: object
	) {}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.headerElement?.nativeElement) {
				const headerNativeElement = this.headerElement.nativeElement
				this.height = headerNativeElement.offsetHeight
				this.cd.detectChanges()
			}
		}
	}
}
