import {
  Component, ContentChildren, ElementRef,
  EventEmitter, HostListener,
  inject, InjectionToken,
  Input,
  OnInit,
  Output, QueryList,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ToolsService } from '../../../../services/tools.service';
import { SortTableActionComponent } from '../sort-table-action/sort-table-action.component';
import { FilterTableActionComponent } from '../filter-table-action/filter-table-action.component';
import {
  HeadCellFilterActionsDirective
} from './directives/head-cell-filter-action/head-cell-filter-actions.directive';
import { TableCellBaseComponent } from '../table-cell-base/table-cell-base.component';

export const HEAD_CELL_IS_HOVER = new InjectionToken<Observable<boolean>>('HEAD_CELL_IS_HOVER', {
  providedIn: 'root',
  factory: () => of(false)
});


@Component({
  selector: 'mib-table-head-cell',
  templateUrl: './table-head-cell.component.html',
  styleUrls: ['./table-head-cell.component.scss'],
  providers: [
    {
      provide: HEAD_CELL_IS_HOVER,
      useFactory: (headCellComponent: TableHeadCellComponent) => headCellComponent.isHover$.asObservable(),
      deps: [TableHeadCellComponent]
    }
  ]
})
export class TableHeadCellComponent extends TableCellBaseComponent implements OnInit {
  @Input() field = '';
  @Input() sortType: 'alphabetical' | 'numerical' | 'date' | 'boolean' = 'alphabetical';
  @Output() onCheck = new EventEmitter<boolean>();

  @ViewChild(SortTableActionComponent) sortActionComponent?: SortTableActionComponent;
  @ViewChild(FilterTableActionComponent) filterActionComponent?: FilterTableActionComponent;
  @ViewChild('label', { static: true }) labelElement: ElementRef<HTMLLabelElement>;

  @ContentChildren(HeadCellFilterActionsDirective) filterPoints: QueryList<HeadCellFilterActionsDirective>;

  checkboxId: string;
  id: string = null;
  control = new FormControl<boolean>(false);
  isHover$ = new BehaviorSubject<boolean>(false);

  private toolsService = inject(ToolsService);

  get label() {
    return this.labelElement.nativeElement.innerHTML;
  }

  get isSortable() {
    return Boolean(this.sortType && this.field);
  }

  get isFilterable() {
    return Boolean(this.filterPoints.length);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHover$.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const state = Boolean(this.filterActionComponent?.filterDropdown?.isVisible);
    this.isHover$.next(state);
  }

  ngOnInit() {
    this.id = this.toolsService.generateId();
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);

    this.control.valueChanges.pipe(
      tap(value => {
        this.onCheck.emit(value);
      })
    ).subscribe();
  }

}
