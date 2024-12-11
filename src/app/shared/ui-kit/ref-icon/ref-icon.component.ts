import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {RefIconService} from './services/ref-icon.service';
import {BehaviorSubject, tap, switchMap} from 'rxjs';
import {TransferState, makeStateKey} from '@angular/platform-browser';

@Component({
  selector: 'mib-icon',
  templateUrl: './ref-icon.component.html',
  styleUrls: ['./ref-icon.component.scss']
})
export class RefIconComponent implements OnInit {
  @Input() set name(name: string) {
    this._name$.next(name);
  }

  @Input() strokeSize?: number;
  @ViewChild('icon', { static: false }) icon!: ElementRef<HTMLDivElement>;

  private _name$ = new BehaviorSubject<string>('');
  public svg!: SafeHtml | null;
  public styles: { [key: string]: string } = {};

  constructor(private iconRegistry: RefIconService, private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngOnInit() {
    this._name$.pipe(
      switchMap(async name => {
        const svg = await this.iconRegistry.getIcon(name);
        return this.sanitizer.bypassSecurityTrustHtml(svg);
      })
    ).subscribe(svg => (this.svg = svg));
  }

  ngAfterViewInit() {
    this.applyStrokeSize();
  }

  private applyStrokeSize() {
    const svg = this.icon?.nativeElement?.querySelector('svg');
    const paths = this.icon?.nativeElement?.querySelectorAll('path');
    if (svg && this.strokeSize) {
      paths.forEach(path => {
        this.renderer.setStyle(path, 'stroke-width', `${this.strokeSize}px`);
      });
    }
  }
}
