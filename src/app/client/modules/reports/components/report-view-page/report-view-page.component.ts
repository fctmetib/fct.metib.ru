import { Component, inject, OnInit } from '@angular/core';
import { ReportViewPageService } from './report-view-page.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss'],
})
export class ReportViewPageComponent implements OnInit {
  private router = inject(Router)

  reportViewPageService = inject(ReportViewPageService)

  public PAGINATOR_ITEMS_PER_PAGE = 10
  public PAGINATOR_PAGE_TO_SHOW = 5
  currentPage$ = new BehaviorSubject<number>(1)
  tableData = this.reportViewPageService.getPreparedTableData()

  visibleRows = []

  ngOnInit() {
    if (!this.reportViewPageService.isTableExist()) {
      this.router.navigateByUrl('client/reports')
    }
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    this.currentPage$.next(page)
    this.visibleRows = this.sliceArrayByPage(page)
  }

  sliceArrayByPage<T>(page: number) {
    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    return this.tableData.rows.slice(startIndex, endIndex)
  }

}
