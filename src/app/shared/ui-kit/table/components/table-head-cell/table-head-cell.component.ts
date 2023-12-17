import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {tap} from 'rxjs';
import {ToolsService} from '../../../../services/tools.service';
import {TableComponent} from '../../table.component';

@Component({
  selector: 'mib-table-head-cell',
  templateUrl: './table-head-cell.component.html',
  styleUrls: ['./table-head-cell.component.scss']
})
export class TableHeadCellComponent implements OnInit, OnChanges {
  checkboxId: string;
  @Input() showCheckbox: boolean = false;
  @Input() checked: boolean = false;
  @Input() sortable: boolean = false;
  @Output() onCheck = new EventEmitter<boolean>();
  @Output() onSort = new EventEmitter<boolean>()

  control: FormControl = new FormControl<boolean>(false)

  id: string = this.toolsService.generateId();
  selected: boolean = false;
  selectedAsSortable: boolean = false;

  constructor(
    private toolsService: ToolsService,
    private tableComponent: TableComponent
  ) {
  }

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

  toggle() {
    if (this.sortable) {
      this.selected = this.selectedAsSortable ? !this.selected : false
      this.onSort.emit(this.selected)
      this.tableComponent.selectHeadCell(this)
    }
  }

}
