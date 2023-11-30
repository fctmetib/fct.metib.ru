import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mib-table-head-cell',
  templateUrl: './table-head-cell.component.html',
  styleUrls: ['./table-head-cell.component.scss']
})
export class TableHeadCellComponent implements OnInit {
  checkboxId: string;
  @Input() showCheckbox: boolean = false;

  ngOnInit() {
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);
  }
}
