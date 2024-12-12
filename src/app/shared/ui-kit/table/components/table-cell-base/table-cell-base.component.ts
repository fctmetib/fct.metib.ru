import { ChangeDetectorRef, Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mib-table-cell-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-cell-base.component.html',
  styleUrls: ['./table-cell-base.component.scss'],
})
export class TableCellBaseComponent {

  private cdr = inject(ChangeDetectorRef)

  private _isCheckboxDisplayed: boolean = false
  private _isVisible: boolean = true;

  get isCheckboxDisplayed(): boolean {
    return this._isCheckboxDisplayed;
  }

  set isCheckboxDisplayed(value: boolean) {
    this._isCheckboxDisplayed = value;
    this.cdr.detectChanges()
  }

  get isVisible() {
    return this._isVisible;
  }

  @HostBinding('class.table-cell-content-is-hidden')
  get isHidden() {
    return !this._isVisible
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  @HostBinding('style.flex')
  get getFlexStyle() {
    if (this._isVisible) {
      return ''
    } else {
      return '0 1 0'
    }
  }
}
