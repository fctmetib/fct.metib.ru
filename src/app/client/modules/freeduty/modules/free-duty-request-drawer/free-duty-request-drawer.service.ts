import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FreeDutyRequestDrawerComponent} from './free-duty-request-drawer.component';
import {drawerConfig} from '../../../../../shared/ui-kit/drawer/drawer.tools';

@Injectable()
export class FreeDutyRequestDrawerService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  open(data?: DrawerData) {
    const config: DrawerData = {
      state: 'view'
    }
    return this.dialog.open(FreeDutyRequestDrawerComponent, drawerConfig(Object.assign(config, data)))
  }
}
