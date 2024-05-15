import {MatDialogRef} from '@angular/material/dialog'
import {RequestDrawerComponent} from '../request-drawer.component'

export interface RequestDrawerInterface {}

export type DemandDrawerRef = MatDialogRef<RequestDrawerComponent, number[]>
