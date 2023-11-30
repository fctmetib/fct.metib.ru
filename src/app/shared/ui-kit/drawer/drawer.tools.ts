import {MatDialogConfig} from "@angular/material/dialog";

export type DrawerMaxWidthType = number | string

export const drawerConfig: (data?: any) => MatDialogConfig = (data?: any) => {
  return {
    disableClose: true,
    panelClass: 'drawer-cdk',
    maxWidth: 640,
    data
  }
}
