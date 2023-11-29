import {MatDialogConfig} from "@angular/material/dialog";

export type DrawerMaxWidthType = number | string

export const drawerConfig: (maxWidth: DrawerMaxWidthType, data?: any) => MatDialogConfig = (maxWidth: DrawerMaxWidthType, data?: any) => {
  return {
    disableClose: true,
    panelClass: 'drawer-cdk',
    maxWidth: `calc(${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''} + 16px)`,
    data
  }
}
