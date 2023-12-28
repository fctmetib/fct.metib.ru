import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {InvoiceDrawer} from './interfaces/invoice-drawer.interface'

@Component({
	selector: 'mib-invoice-drawer',
	templateUrl: './invoice-drawer.component.html',
	styleUrls: ['./invoice-drawer.component.scss']
})
export class InvoiceDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '60px'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public selectedShipmentsCount: number = 0
	public severalShipmentsChecked: boolean = false

	public invoiceAnimationStates: Record<number, boolean> = {}

	datas = 10000000
	datasID: DrawerData<InvoiceDrawer>

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<InvoiceDrawer>,
		public dialogRef: MatDialogRef<InvoiceDrawerComponent>
	) {}

	ngOnInit(): void {
		this.datasID = this.data
		console.log('datasID :>> ', this.datasID)
	}
}
