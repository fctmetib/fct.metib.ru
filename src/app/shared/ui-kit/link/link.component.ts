import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LinkSize, LinkType} from './interfaces/link.interface';

@Component({
  selector: 'mib-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit, AfterViewInit, OnDestroy {

  private mutationObserver: MutationObserver;

  @ViewChild('leftIcon', {static: false}) leftIcon: ElementRef<HTMLDivElement>
  @ViewChild('rightIcon', {static: false}) rightIcon: ElementRef<HTMLDivElement>

  @Input() size: LinkSize = 'm'
  @Input() type: LinkType = 'ghost-primary'

  classes: {[key: string] : boolean} = {}

  ngOnInit() {
    this.updateClasses()
  }

  ngAfterViewInit() {
    this.initMutationObserver();
  }

  private initMutationObserver() {
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Вызови здесь метод, который обновляет классы
          this.updateClasses();
        }
      });
    });

    this.observeIcons();
  }

  private observeIcons() {
    if (this.leftIcon) {
      this.mutationObserver.observe(this.leftIcon.nativeElement, { childList: true });
    }
    if (this.rightIcon) {
      this.mutationObserver.observe(this.rightIcon.nativeElement, { childList: true });
    }
  }


  private updateClasses() {
    this.classes = {
      [`link_${this.size}`]: true,
      [`link_type-${this.type}`]: true,
      'link_left-iconly': Boolean(this.leftIcon?.nativeElement?.querySelector('[link-left-icon]')),
      'link_right-iconly': Boolean(this.rightIcon?.nativeElement?.querySelector('[link-right-icon]'))
    }
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
