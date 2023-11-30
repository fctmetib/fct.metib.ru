import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {tap} from 'rxjs';

@Component({
  selector: 'mib-table-head-cell',
  templateUrl: './table-head-cell.component.html',
  styleUrls: ['./table-head-cell.component.scss']
})
export class TableHeadCellComponent implements OnInit, OnChanges {
  checkboxId: string;
  @Input() showCheckbox: boolean = false;
  @Input() checked: boolean;
  @Output() onCheck = new EventEmitter<boolean>();

  control: FormControl = new FormControl<boolean>(false)

  ngOnInit() {
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);

    this.control.valueChanges.pipe(
      tap((value) => {
        this.onCheck.emit(value)
      })
    ).subscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.checked) {
      this.control.setValue(this.checked, { emitEvent: false });
    }
  }
}
