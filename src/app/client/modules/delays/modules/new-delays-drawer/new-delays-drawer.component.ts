import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-new-delays-drawer',
	templateUrl: './new-delays-drawer.component.html',
	styleUrls: ['./new-delays-drawer.component.scss']
})
export class NewDelaysDrawerComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<NewDelaysDrawerComponent>
	) {}
}
