import {FormBuilder} from '@angular/forms'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {DatePipe} from '@angular/common'

@Component({
	selector: 'app-invoice-page',
	templateUrl: './invoice-page.component.html',
	styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit, OnDestroy {
	public isLoading: false
	// public reportData: DelayInterface[] = [];

	// private columns: ReportColumntInterface[] = [];
	private _subscription$: Subscription = new Subscription()

	public filterDialog: boolean = false
	//public filterForm: FormGroup;

	constructor(private fb: FormBuilder, public datepipe: DatePipe) {}

	ngOnInit() {}

	public openDateModal() {
		this.filterDialog = true
	}

	public closeDateModal() {
		this.filterDialog = false
	}

	//#region private logic

	//#endregion

	ngOnDestroy() {
		this._subscription$.unsubscribe()
	}
}
