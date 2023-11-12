import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RefIconService} from "./services/ref-icon.service";
import {BehaviorSubject, Subscription, tap} from "rxjs";

@Component({
  selector: 'gl-ref-icon',
  templateUrl: './ref-icon.component.html',
  styleUrls: ['./ref-icon.component.scss']
})
export class RefIconComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() set name(name: string) {
    this._name$.next(name)
  }
  @Input() strokeSize?: number;
  @ViewChild('icon') icon!: ElementRef<HTMLDivElement>

  public _name$ = new BehaviorSubject<string>('')
  public sub: Subscription = new Subscription();
  public svg!: SafeHtml;
  public styles: {
    [key: string]: string
  } = {};

  constructor(
    private iconRegistry: RefIconService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.sub = this._name$.pipe(
      tap(icon => {
        const svg = this.iconRegistry.getIcon(icon);
        this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngAfterViewInit() {
    const svg = this.icon.nativeElement.querySelector('svg');
    const paths = this.icon.nativeElement.querySelectorAll('path');

    if (svg && this.strokeSize) {
      paths.forEach(path => {
        this.renderer.setStyle(path, 'stroke-width', `${this.strokeSize}px`);
      });
    }
  }

}
