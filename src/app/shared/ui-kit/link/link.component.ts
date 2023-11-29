import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LinkSize, LinkType} from './interfaces/link.interface';

@Component({
  selector: 'mib-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  @ViewChild('leftIcon', {static: false}) leftIcon: ElementRef<HTMLDivElement>
  @ViewChild('rightIcon', {static: false}) rightIcon: ElementRef<HTMLDivElement>

  @Input() size: LinkSize = 'm'
  @Input() type: LinkType = 'ghost-primary'

  get classes() {
    console.log(this.rightIcon?.nativeElement?.querySelector('[link-right-icon]'))
    return {
      [`link_${this.size}`]: true,
      [`link_type-${this.type}`]: true,
      'link_left-iconly': Boolean(this.leftIcon?.nativeElement?.querySelector('[link-left-icon]')),
      'link_right-iconly': Boolean(this.rightIcon?.nativeElement?.querySelector('[link-right-icon]'))
    }
  }
}
