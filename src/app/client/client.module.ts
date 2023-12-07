import { NotificationService } from './shared/services/notification.service'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { ClientRoutingModule } from './client-routing.module'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { RadioButtonModule } from 'primeng/radiobutton'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MenubarModule } from 'primeng/menubar'
import { MenuModule } from 'primeng/menu'
import { ClientService } from '../shared/services/common/client.service'
import { DeliveryService } from '../shared/services/share/delivery.service'
import { OrganizationService } from '../shared/services/share/organization.service'
import { ClientComponent } from './client.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '../shared/services/auth.interceptor'
import { DialogService } from 'primeng/dynamicdialog'
import { AccordionModule } from 'primeng/accordion'
import { MIBNotifyAccordionComponent } from './shared/components/mib-notify-accordion/mib-notify-accordion.component'
import { MIBNotifyAccordionGroupComponent } from './shared/components/mib-notify-accordion/mib-notify-accordion-group.component'
import { NotifyDialogComponent } from './shared/components/dialogs/notify-dialog/notify-dialog.component'
import { ButtonModule as ButtonModule22 } from '../shared/ui-kit/button/button.module'
import { RefIconModule } from '../shared/ui-kit/ref-icon/ref-icon.module'
import { AvatarModule } from '../shared/ui-kit/avatar/avatar.module'
import { SidebarModule } from '../shared/ui-kit/sidebar/sidebar.module'
import { SpacingModule } from '../shared/ui-kit/spacing/spacing.module'
import { SkeletonModule } from '../shared/ui-kit/skeleton/skeleton.module'
import { DropdownModule } from '../shared/ui-kit/dropdown/dropdown.module'
import { DropdownPointModule } from '../shared/ui-kit/dropdown-point/dropdown-point.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { HeaderModule } from '../shared/modules/header/header.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		HttpClientModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		MenuModule,
		ProgressSpinnerModule,
		FormsModule,
		ClientRoutingModule,
		ReactiveFormsModule,
		AccordionModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		ButtonModule22,
		RefIconModule,
		SidebarModule,
		SpacingModule,
		SkeletonModule,
		DropdownModule,
		DropdownPointModule,
		ClipboardModule,
		HeaderModule
	],
	declarations: [
		ClientComponent,
		NotifyDialogComponent,
		MIBNotifyAccordionGroupComponent,
		MIBNotifyAccordionComponent
	],
	providers: [
		ClientService,
		DeliveryService,
		NotificationService,
		DialogService,
		NotificationService,
		OrganizationService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class ClientModule {}
