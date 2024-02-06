import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {SignPinModalComponent} from './sign-pin-modal.component'
import {
	SignPinModalData,
	SignPinModalOutput,
	SignPinModalRef
} from './sign-pin-modal.interface'
import {
	BehaviorSubject,
	filter,
	finalize,
	map,
	Observable,
	switchMap
} from 'rxjs'
import {SignService} from '../../../services/share/sign.service'

@Injectable({
	providedIn: 'root'
})
export class SignPinModalService {
	constructor(private dialog: MatDialog, private signService: SignService) {}

	open<ActionType = any>(
		data: SignPinModalData<ActionType>
	): SignPinModalRef<ActionType> {
		return this.dialog.open(SignPinModalComponent, modalConfig(432, data))
	}

	sign<ActionType>(
		req$: Observable<ActionType>,
		loading$: BehaviorSubject<boolean>
	): Observable<SignPinModalOutput<ActionType>> {
		return this.signService.getActiveSession().pipe(
			switchMap(result => {
				if (result) {
					return req$.pipe(
						map(data => ({
							data,
							verified: true
						}))
					)
				} else {
					return this.signService.getPin().pipe(
						switchMap(() => {
							loading$.next(false)
							return this.open({
								action: () => req$
							})
								.afterClosed()
								.pipe(filter(Boolean))
						})
					)
				}
			}),
			finalize(() => loading$.next(false))
		)
	}
}
