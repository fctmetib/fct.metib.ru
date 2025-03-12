import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DemandDrawerComponent} from './demand-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DemandDrawerRef} from './interfaces/demand-drawer.interface'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DemandDrawerService {
  private clearDocumentState$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)
  public getDocumentState: Observable<any> = this.clearDocumentState$.asObservable()

	constructor(private dialog: MatDialog) {}

	public ref?: DemandDrawerRef

	open(data?: DrawerData): DemandDrawerRef {
		const config: DrawerData = {
			state: 'view'
		}
		this.ref = this.dialog.open(
			DemandDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)

		return this.ref
	}

	get drawerData() {
		return this.ref?.componentInstance?.data
	}

  updateDocumentsState(value: any) {
    this.clearDocumentState$.next(value)
  }
}
