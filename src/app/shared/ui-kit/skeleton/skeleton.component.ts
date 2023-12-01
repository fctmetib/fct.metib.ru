import {Component, Input} from '@angular/core';
import {Properties} from "csstype";

export type SkeletonTheme = 'dark' | 'light'

@Component({
  selector: 'mib-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() styles: Properties = {};
  @Input() theme: SkeletonTheme = 'light';
}
