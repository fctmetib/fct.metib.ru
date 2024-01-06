import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {FreeDutyService} from '../../services/free-duty.service';
import {BehaviorSubject, finalize, tap} from 'rxjs';
import {Duty} from '../../../../../shared/types/duty/duty';

@Component({
  selector: 'mib-free-duty-request-drawer',
  templateUrl: './free-duty-request-drawer.component.html',
  styleUrls: ['./free-duty-request-drawer.component.scss'],
})
export class FreeDutyRequestDrawerComponent implements OnInit {

  public sending$ = new BehaviorSubject<boolean>(false)

  public PAGINATOR_ITEMS_PER_PAGE = 6;
  public PAGINATOR_PAGE_TO_SHOW = 5;

  public dutiesVisible: Duty[] = []

  constructor(
    public dialogRef: MatDialogRef<FreeDutyRequestDrawerComponent>,
    public toolsService: ToolsService,
    private freeDutyService: FreeDutyService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<Duty[]>
  ) {
  }

  trackByFunction(index, data: Duty) {
    return data.ID
  }

  ngOnInit() {
    this.onPageChange(1)
  }

  get fullRest() {
    return this.data.data.reduce((n, i) => n + i.Rest ?? 0, 0)
  }

  onPageChange(page: number) {
    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE;
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE;

    this.dutiesVisible = this.data.data.slice(startIndex, endIndex);
  }

  submit() {
    this.sending$.next(true)
    this.freeDutyService.freeDuty(this.data.data.map(x => x.ID)).pipe(
      tap((response) => {
        this.dialogRef.close(response)
      }),
      finalize(() => {
        this.sending$.next(false)
      })
    ).subscribe()
  }
}
