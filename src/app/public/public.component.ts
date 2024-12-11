import { isPlatformBrowser } from '@angular/common';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core'

@Component({
	selector: 'public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class PublicComponent implements AfterViewInit {
	public height: number = 103;

	constructor(
	  private elementRef: ElementRef,
	  private cd: ChangeDetectorRef,
	  @Inject(PLATFORM_ID) private platformId: object
	) {}
  
	ngAfterViewInit(): void {
	  if (isPlatformBrowser(this.platformId)) {
		this.height = this.elementRef.nativeElement.offsetHeight;
		this.cd.detectChanges();
	  }
	}
}
