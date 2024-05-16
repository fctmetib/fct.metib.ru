import {MatDialogRef} from '@angular/material/dialog'
import {VerifyRequestDrawerComponent} from '../verify-request-drawer.component'

export interface RequestDrawerInterface {}

export type DemandDrawerRef = MatDialogRef<VerifyRequestDrawerComponent, number[]>
