import {
  AfterViewInit,
  Component,
  ContentChildren, inject,
  Input,
  OnInit,
  QueryList
} from '@angular/core';
import {DeviceType} from '../../../../interfaces/shared.interface'
import {TableCellComponent} from '../table-cell/table-cell.component'
import {TableRowAnimationService} from '../../services/table-row-animation.service'
import {TableComponent} from '../../table.component'
import {AnimationService} from '../../../../animations/animations.service'
import {ToolsService} from '../../../../services/tools.service'
import { startWith } from 'rxjs/operators';
import { Observable, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export const TABLE_ROW_ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@UntilDestroy()
@Component({
	selector: 'mib-table-row',
	templateUrl: './table-row.component.html',
	styleUrls: ['./table-row.component.scss'],
	animations: [
		new AnimationService().generateAnimation(TABLE_ROW_ANIMATION_CONFIG)
	]
})
export class TableRowComponent implements OnInit {
	@ContentChildren(TableCellComponent) cells: QueryList<TableCellComponent>
	@Input() rowId: number // Уникальный идентификатор для строки
	@Input() rowStatus: string
	@Input() device: DeviceType = 'desktop'
	@Input() underlined: boolean = false
  @Input() showCheckbox: boolean = true;

	id: string = null

  private tableRowAnimationService = inject(TableRowAnimationService)
  private toolsService = inject(ToolsService)

	ngOnInit(): void {
		this.id = this.toolsService.generateId()
	}

	get animationState() {
		return this.tableRowAnimationService.getAnimationState(this.rowId)
	}

	get cell(): TableCellComponent | undefined {
		return this.cells.find(cell => cell.isVisible)
	}

	selectRow() {
		this.cell?.toggleCheckbox()
	}

	get state() {
		return Boolean(this.cell?.state)
	}

  get checkboxChanges(): Observable<boolean> | undefined  {
    if (this.cell) {
      return this.cell.control.valueChanges
    }
    return undefined
  }
}
