import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MenuPointDevice} from './intefaces/menu-point.interface';

@Component({
  selector: 'mib-menu-point',
  templateUrl: './menu-point.component.html',
  styleUrls: ['./menu-point.component.scss']
})
export class MenuPointComponent {

  @Input() device: MenuPointDevice = 'desktop'
  @Input() link: string = ''
  @ViewChild('leftIcon') leftIcon: ElementRef<HTMLDivElement>

  get classes() {
    return {
      [`menu-point_${this.device}`]: true,
      [`menu-point_left-iconly`]: Boolean(this.leftIcon?.nativeElement?.children?.length),
    }
  }

  @Output() press = new EventEmitter<any>()

  constructor() {
  }

  public onClick($event: any): void {
    this.press.emit($event)
  }

}
