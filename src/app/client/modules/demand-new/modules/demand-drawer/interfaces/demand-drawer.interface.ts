import {MatDialogRef} from '@angular/material/dialog';
import {DemandDrawerComponent} from '../demand-drawer.component';

export interface DemandDrawerInterface {
}

export interface FileReadOptions {
  FileName: string
  Size: number
  DemandFileID?: number
}

export type DemandDrawerRef = MatDialogRef<DemandDrawerComponent, number[]>
