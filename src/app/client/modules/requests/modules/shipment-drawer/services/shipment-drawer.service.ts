import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {ShipmentDrawerComponent} from '../shipment-drawer.component';
import {Shipment, ShipmentReq} from '../interfaces/shipment.interface';
import {drawerConfig} from '../../../../../../shared/ui-kit/drawer/drawer.tools';
import {Subject} from 'rxjs';

@Injectable()
export class ShipmentDrawerService {

  public shipment$ = new Subject<ShipmentReq>()

  constructor(private dialog: MatDialog) {
  }

  emitShipment(data: ShipmentReq) {
    this.shipment$.next(data)
  }

  open<T>(data?: DrawerData<T>): MatDialogRef<ShipmentDrawerComponent> {
    const config: DrawerData = {
      state: 'view',
    }
    return this.dialog.open(
      ShipmentDrawerComponent,
      drawerConfig(data?.maxWidth, Object.assign(config, data))
    )
  }
}
