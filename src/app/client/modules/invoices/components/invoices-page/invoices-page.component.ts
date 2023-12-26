import {FormBuilder} from '@angular/forms'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {BehaviorSubject, Subscription} from 'rxjs'
import {DatePipe} from '@angular/common'
import {Properties} from 'csstype'

@Component({
	selector: 'app-invoices-page',
	templateUrl: './invoices-page.component.html',
	styleUrls: ['./invoices-page.component.scss']
})
export class InvoicesPageComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	selectedRequestsCount: number
	severalRequestsChecked: boolean = false
}

//   public isLoading: false;
//  // public reportData: DelayInterface[] = [];

//  // private columns: ReportColumntInterface[] = [];
//   private _subscription$: Subscription = new Subscription();

//   public filterDialog: boolean = false;
//  //public filterForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     public datepipe: DatePipe,
//   ) {}

//   ngOnInit() {
//   }

//   public openDateModal() {
//     this.filterDialog = true;
//   }

//   public closeDateModal() {
//     this.filterDialog = false;
//   }

//   //#region private logic

//   //#endregion

//   ngOnDestroy() {
//     this._subscription$.unsubscribe();
//   }
// }
