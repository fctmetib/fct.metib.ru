import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {RefIconService} from './services/ref-icon.service'
import {BehaviorSubject, tap} from 'rxjs'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'mib-icon',
  templateUrl: './ref-icon.component.html',
  styleUrls: ['./ref-icon.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class RefIconComponent implements OnInit, AfterViewInit {
  @Input() set name(name: string) {
    this._name$.next(name)
  }

  @Input() strokeSize?: number
  @ViewChild('icon', {static: false}) icon!: ElementRef<HTMLDivElement>

  public _name$ = new BehaviorSubject<string>('')
  public svg!: SafeHtml
  public styles: {
    [key: string]: string
  } = {}

  constructor(
    private iconRegistry: RefIconService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private au: AutoUnsubscribeService,
  ) {
  }

  ngOnInit() {
    this._name$.pipe(
      tap(icon => {
        const svg = this.iconRegistry.getIcon(icon)
        this.svg = this.sanitizer.bypassSecurityTrustHtml(svg)
      }),
      takeUntil(this.au.destroyer),
    ).subscribe()
  }

  ngAfterViewInit() {
    const svg = this.icon?.nativeElement?.querySelector('svg');
    const paths = this.icon?.nativeElement?.querySelectorAll('path');
    if (svg && this.strokeSize) {
      paths.forEach(path => {
        this.renderer.setStyle(path, 'stroke-width', `${this.strokeSize}px`);
      });
    }
  }

}
