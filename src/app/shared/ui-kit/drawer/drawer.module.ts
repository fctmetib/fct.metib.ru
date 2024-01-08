import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DrawerComponent } from './drawer.component'
import { DrawerHeaderComponent } from './components/drawer-header/drawer-header.component'
import { ButtonModule } from '../button/button.module'
import { IconModule } from '../ref-icon/icon.module'
import { SpacingModule } from '../spacing/spacing.module'
import { DrawerFooterComponent } from './components/drawer-footer/drawer-footer.component';
import { DrawerContainerComponent } from './components/drawer-container/drawer-container.component'

@NgModule({
	declarations: [DrawerComponent, DrawerHeaderComponent, DrawerFooterComponent, DrawerContainerComponent],
	imports: [CommonModule, ButtonModule, IconModule, SpacingModule],
    exports: [DrawerComponent, DrawerHeaderComponent, DrawerFooterComponent, DrawerContainerComponent]
})
export class DrawerModule {}
