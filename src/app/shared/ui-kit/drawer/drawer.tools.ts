import {MatDialogConfig} from '@angular/material/dialog';

export type DrawerMaxWidthType = number | string

export const drawerConfig: (maxWidth?: DrawerMaxWidthType, data?: any) => MatDialogConfig = (maxWidth: DrawerMaxWidthType = 640, data?: any) => {
  return {
    disableClose: true,
    panelClass: 'drawer-cdk',
    maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}`,
    data
  }
}
