import {Component, Input} from '@angular/core';

@Component({
  selector: 'mib-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.scss']
})
export class SpacingComponent {
  @Input() type: 'xs2' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xl2'
  @Input() customSpace: number = 0
}
