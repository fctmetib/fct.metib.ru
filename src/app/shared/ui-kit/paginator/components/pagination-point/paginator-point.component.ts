import {Component, Input} from '@angular/core';

@Component({
  selector: 'mib-paginator-point',
  templateUrl: './paginator-point.component.html',
  styleUrls: ['./paginator-point.component.scss']
})
export class PaginatorPointComponent {
  @Input() selected: boolean = false;
}
