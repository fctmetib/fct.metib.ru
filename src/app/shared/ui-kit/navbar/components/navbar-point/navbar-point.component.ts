import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  NgZone,
  OnDestroy,
  Output, PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {NavbarPointSize, NavbarPointType} from '../../interfaces/navbar-point.interface';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'mib-navbar-point',
  templateUrl: './navbar-point.component.html',
  styleUrls: ['./navbar-point.component.scss']
})
export class NavbarPointComponent implements AfterViewInit, OnDestroy {

  private mutationObserver: MutationObserver;

  @ViewChild('leftIcon', {static: false}) leftIcon: ElementRef<HTMLDivElement>
  @Input() value: string = ''

  @Input() set size(value: NavbarPointSize) {
    this._size = value
  }

  @Input() set type(value: NavbarPointType) {
    this._type = value
  }

  @Input() set selected(value: boolean) {
    this._selected = value
    this.updateClasses()
  }

  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() press = new EventEmitter<any>();

  public _selected: boolean = false;
  public _type: NavbarPointType = 'separator'
  public _size: NavbarPointSize = 'm'

  public classes: { [key: string]: boolean } = {}

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.updateClasses()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMutationObserver();
      this.cdr.detectChanges()
    }
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
      this.mutationObserver.observe(this.leftIcon.nativeElement, {childList: true});
    }
  }


  private updateClasses() {
    this.classes = {
      [`navbar-point_${this._size}`]: true,
      [`navbar-point_type-${this._type}`]: true,
      'navbar-point_left-iconly': Boolean(this.leftIcon?.nativeElement?.querySelector('[navbar-point-left-icon]')),
      'navbar-point_selected': this._selected,
    }
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
