import { DrawerMaxWidthType } from '../drawer.tools'

export enum DrawerStateEnum {
	EDIT = 'edit',
	CREATE = 'create',
	VIEW = 'view'
}

export type DrawerState = 'edit' | 'create' | 'view'

export interface DrawerData<T = any> {
	state?: DrawerState
	maxWidth?: DrawerMaxWidthType
	data?: T

}
