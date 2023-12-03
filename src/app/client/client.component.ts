import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID, ViewChild, ChangeDetectorRef, ElementRef, AfterViewInit
} from '@angular/core'
import {ScrollService} from '../shared/services/scroll.service';
import {ToolsService} from '../shared/services/tools.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements  AfterViewInit, OnDestroy {
  @ViewChild('scrollable') scrollable!: ElementRef<HTMLDivElement>;

  private resizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;

  public withoutScroll: boolean = !this.toolsService.mobileAndTabletCheck();

  constructor(
    public scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
    private toolsService: ToolsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && !this.toolsService.mobileAndTabletCheck()) {
      // ResizeObserver
      this.resizeObserver = new ResizeObserver(entries => {
        this.checkScroll(this.scrollable.nativeElement);
      });
      this.resizeObserver.observe(this.scrollable.nativeElement);

      // // MutationObserver
      // this.mutationObserver = new MutationObserver(mutations => {
      //   this.checkScroll(this.scrollable.nativeElement);
      // });
      // this.mutationObserver.observe(this.scrollable.nativeElement, { childList: true, subtree: true });
    }
  }

  private checkScroll(element: HTMLDivElement) {
    this.withoutScroll = element.scrollHeight <= element.clientHeight;
    console.log(element.scrollHeight, element.clientHeight);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.resizeObserver && this.scrollable) {
      this.resizeObserver.unobserve(this.scrollable.nativeElement);
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
