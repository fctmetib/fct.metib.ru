import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandDrawerComponent} from './demand-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {DemandDrawerService} from './demand-drawer.service'
import {TextareaModule} from '../../../../../shared/ui-kit/textarea/textarea.module';

@NgModule({
  declarations: [DemandDrawerComponent],
  imports: [
    CommonModule,
    DrawerModule,
    MatDialogModule,
    SpacingModule,
    ButtonModule,
    IconModule,
    MibDragAndDropModule,
    InputModule,
    // TextareaModule
  ],
  providers: [DemandDrawerService]
})
export class DemandDrawerModule {
}
