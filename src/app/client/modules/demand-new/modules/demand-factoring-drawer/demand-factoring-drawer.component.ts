import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-demand-factoring-drawer',
	templateUrl: './demand-factoring-drawer.component.html',
	styleUrls: ['./demand-factoring-drawer.component.scss']
})
export class DemandFactoringDrawerComponent {
	public progres$ = new BehaviorSubject<number>(1)
	public progress: number = 1
	public maxPage: number = 5
	public pageCount: number = 1

	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandFactoringDrawerComponent>
	) {}

	public nextPage() {
		if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
			this.progress = this.progres$.value + 1
			this.progres$.next(this.progress)
			this.pageCount = this.progress
			console.log('next', this.progress)
		} else {
			return
		}
	}

	public prevPage() {
		if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
			this.progress = this.progres$.value - 1
			this.progres$.next(this.progress)
			this.pageCount = this.progress
			console.log('prev', this.progress)
		} else {
			return
		}
	}

	public submitData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
		// this.dialogRef.close()
	}
}
