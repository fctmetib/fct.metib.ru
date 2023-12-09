import { Component, ContentChildren, ElementRef, Input, QueryList, AfterContentInit } from '@angular/core';
import { LinkSize, LinkType } from './interfaces/link.interface';

@Component({
  selector: 'mib-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements AfterContentInit {

  @ContentChildren('leftIcon', { descendants: true, read: ElementRef }) leftIcons: QueryList<ElementRef>;
  @ContentChildren('link-right-icon', { descendants: true, read: ElementRef }) rightIcons: QueryList<ElementRef>;

  @Input() size: LinkSize = 'm';
  @Input() type: LinkType = 'ghost-primary';

  ngAfterContentInit() {
    console.log(this.rightIcons)
  }

  get classes() {
    const leftIconExists = this.leftIcons?.some(el => el.nativeElement.nodeType !== Node.COMMENT_NODE);
    const rightIconExists = this.rightIcons?.some(el => el.nativeElement.nodeType !== Node.COMMENT_NODE);
    return {
      [`link_${this.size}`]: true,
      [`link_type-${this.type}`]: true,
      'link_left-iconly': leftIconExists,
      'link_right-iconly': rightIconExists
    }
  }
}
