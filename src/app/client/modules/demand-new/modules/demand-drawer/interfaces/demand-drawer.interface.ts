import {MatDialogRef} from '@angular/material/dialog';
import {DemandDrawerComponent} from '../demand-drawer.component';

export interface DemandDrawerInterface {
}

export type DemandDrawerRef = MatDialogRef<DemandDrawerComponent, number[]>
