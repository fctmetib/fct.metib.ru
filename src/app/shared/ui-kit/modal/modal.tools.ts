import {MatDialogConfig} from '@angular/material/dialog'

export type ModalDefaultWidth = number | string

export function modalConfig<T>(
	width: ModalDefaultWidth = 432,
	data?: T
): MatDialogConfig {
	return {
		disableClose: false,
		autoFocus: false,
		panelClass: 'modal-cdk',
		width: `${width}${typeof width === 'number' ? 'px' : ''}`,
		data
	}
}

/* 
import {MatDialogConfig} from '@angular/material/dialog'

export type ModalDefaultMaxWidth = number | string

export const modalConfig: (
	maxWidth?: ModalDefaultMaxWidth,
	data?: any
) => MatDialogConfig = (maxWidth: ModalDefaultMaxWidth = 432, data?: any) => {
	return {
		disableClose: false,
		autoFocus: false,
		panelClass: 'modal-cdk',
		maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}`,
		data
	}
}
*/
