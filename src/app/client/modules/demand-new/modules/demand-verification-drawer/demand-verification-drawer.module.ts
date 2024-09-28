import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandVerificationDrawerComponent} from './demand-verification-drawer.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {DemandVerificationDrawerService} from './demand-verification-drawer.service'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [DemandVerificationDrawerComponent],
  imports: [
    CommonModule,
    DrawerModule,
    SpacingModule,
    DropdownPointModule,
    CheckboxModule,
    InputModule,
    LabelModule,
    ButtonModule,
    SelectModule,
    TextareaModule,
    AutosizeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DemandVerificationDrawerService]
})
export class DemandVerificationDrawerModule {
}
