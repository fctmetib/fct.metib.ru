export enum DrawerStateEnum {
  EDIT = 'edit',
  CREATE = 'create',
  VIEW = 'view'
}

export type DrawerState = 'edit' | 'create' | 'view'

export interface DrawerData<T = any> {
  state: DrawerState
  data?: T
}
