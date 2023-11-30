import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {tap} from 'rxjs';

@Component({
  selector: 'mib-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  private _totalCount: number;

  @Input() set totalCount(value: number) {
    this._totalCount = value
    this.totalPages = Math.ceil(this._totalCount / this._itemsPerPage);
  }

  @Input() pagesToShow: number;

  @Input() set itemsPerPage(value: number) {
    this._itemsPerPage = value < 1 ? 1 : value; // Защита от некорректных значений
    this.totalPages = Math.ceil(this._totalCount / this._itemsPerPage);
    this.updatePageControl();
  }

  private _itemsPerPage: number;

  @Output() pageChange = new EventEmitter<number>();

  public pageControl = new FormControl(1);
  public totalPages: number;

  private updatePageControl() {
    if (this.pageControl.value > this.totalPages) {
      this.pageControl.setValue(this.totalPages);
    }
  }

  ngOnInit() {
    this.pageControl.valueChanges.pipe(
      tap(n => {
        if (n) {
          let d = n;
          if (n > this.totalPages) {
            d = this.totalPages;
            this.pageControl.setValue(d, {emitEvent: false});
          }
          this.pageChange.emit(d);
        }
      })
    ).subscribe();
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageControl.setValue(page);
    }
  }

  get pages(): number[] {
    const pageArray: number[] = [];

    // Начальная и конечная страница для отображения
    let startPage: number, endPage: number;

    if (this.totalPages <= this.pagesToShow) {
      // Все страницы помещаются в диапазон для отображения
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // Вычисляем начальную и конечную страницу
      const maxPagesBeforeCurrentPage = Math.floor(this.pagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(this.pagesToShow / 2) - 1;
      if (this.pageControl.value <= maxPagesBeforeCurrentPage) {
        // Текущая страница близко к началу
        startPage = 1;
        endPage = this.pagesToShow;
      } else if (this.pageControl.value + maxPagesAfterCurrentPage >= this.totalPages) {
        // Текущая страница близко к концу
        startPage = this.totalPages - this.pagesToShow + 1;
        endPage = this.totalPages;
      } else {
        // Текущая страница где-то посередине
        startPage = this.pageControl.value - maxPagesBeforeCurrentPage;
        endPage = this.pageControl.value + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }

    return pageArray;
  }

  goToLastPage() {
    this.onPageChange(this.totalPages);
  }

  goToFirstPage() {
    this.onPageChange(1);
  }

  onSelectPage(page: number) {
    this.pageControl.setValue(page)
  }
}
