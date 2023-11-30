export type DrawerState = 'edit' | 'create' | 'view'

export interface DrawerData<Data = any> {
  state: DrawerState
  data?: Data
}
