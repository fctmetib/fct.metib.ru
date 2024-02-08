import {MatDialogConfig} from '@angular/material/dialog'

export type ModalDefaultWidth = number | string

export function modalConfig<T>(width: ModalDefaultWidth = 432, data?: T): MatDialogConfig {
	return {
		disableClose: false,
		autoFocus: false,
		panelClass: 'modal-cdk',
		width: `${width}${typeof width === 'number' ? 'px' : ''}`,
		data
	}
}
