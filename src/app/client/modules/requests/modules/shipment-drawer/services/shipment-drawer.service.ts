import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {ShipmentDrawerComponent} from '../shipment-drawer.component';
import {Shipment, ShipmentReq} from '../interfaces/shipment.interface';
import {drawerConfig} from '../../../../../../shared/ui-kit/drawer/drawer.tools';

@Injectable()
export class ShipmentDrawerService {
  constructor(private dialog: MatDialog) {
  }

  open<T>(data?: DrawerData<T>): MatDialogRef<ShipmentDrawerComponent, ShipmentReq> {
    const config: DrawerData = {
      state: 'view',
    }
    return this.dialog.open(
      ShipmentDrawerComponent,
      drawerConfig(data?.maxWidth, Object.assign(config, data))
    )
  }
}
