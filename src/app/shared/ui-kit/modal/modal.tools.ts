import {MatDialogConfig} from '@angular/material/dialog'

export type ModalDefaultWidth = number | string

export const modalConfig: (
	maxWidth?: ModalDefaultWidth,
	data?: any
) => MatDialogConfig = (width: ModalDefaultWidth = 432, data?: any) => {
	return {
		disableClose: false,
		autoFocus: false,
		panelClass: 'modal-cdk',
		width: `${width}${typeof width === 'number' ? 'px' : ''}`,
		data
	}
}