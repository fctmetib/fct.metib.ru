import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {AdvancedDuty} from '../../pages/free-duty-page/interfaces/free-duty.interface';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {FreeDutyService} from '../../services/free-duty.service';
import {RequestsService} from '../../services/requests.service';
import {BehaviorSubject, finalize, tap} from 'rxjs';

@Component({
  selector: 'mib-free-duty-request-drawer',
  templateUrl: './free-duty-request-drawer.component.html',
  styleUrls: ['./free-duty-request-drawer.component.scss']
})
export class FreeDutyRequestDrawerComponent implements OnInit {

  public sending$ = new BehaviorSubject<boolean>(false)

  public PAGINATOR_ITEMS_PER_PAGE = 6;
  public PAGINATOR_PAGE_TO_SHOW = 5;

  public dutiesVisible: AdvancedDuty[] = []

  constructor(
    public dialogRef: MatDialogRef<FreeDutyRequestDrawerComponent>,
    public toolsService: ToolsService,
    private freeDutyService: FreeDutyService,
    private requestsService: RequestsService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<AdvancedDuty[]>
  ) {
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
    this.requestsService.createRequest(this.data.data.map(x => x.ID)).pipe(
      tap((response) => {
        this.dialogRef.close(response)
      }),
      finalize(() => {
        this.sending$.next(false)
      })
    ).subscribe()
  }
}
