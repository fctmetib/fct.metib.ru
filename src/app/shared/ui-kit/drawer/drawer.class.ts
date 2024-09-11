import {DrawerData, DrawerState} from './interfaces/drawer.interface';

export class Drawer {
  public state: DrawerState = 'view'

  constructor(
    data: DrawerData
  ) {
    this.state = data.state
  }

  get isEditing() {
    return this.state === 'edit'
  }
}
