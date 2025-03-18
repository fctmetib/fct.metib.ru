import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {drawerAnimation} from "./drawer.animations";

@Component({
  selector: 'mib-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    drawerAnimation
  ]
})
export class DrawerComponent {
  @Input() autoHeight = false
  @ViewChild('header') header?: ElementRef<HTMLDivElement>
  @ViewChild('footer') footer?: ElementRef<HTMLDivElement>

  get height() {
    return `calc(100vh - ${this.header?.nativeElement?.offsetHeight ?? 0}px - ${this.footer?.nativeElement?.offsetHeight}px)`
  }

}
