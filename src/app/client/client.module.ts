import { NotificationService } from './shared/services/notification.service'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { ClientRoutingModule } from './client-routing.module'
import { SkeletonModule } from 'primeng/skeleton'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { RadioButtonModule } from 'primeng/radiobutton'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MenubarModule } from 'primeng/menubar'
import { MenuModule } from 'primeng/menu'
import { AvatarModule } from 'primeng/avatar'
import { ClientService } from '../shared/services/common/client.service'
import { DeliveryService } from '../shared/services/share/delivery.service'
import { OrganizationService } from '../shared/services/share/organization.service'
import { ClientComponent } from './client.component'
import { HeaderComponent } from './shared/components/header/header.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '../shared/services/auth.interceptor'
import { MobileHeaderComponent } from './shared/components/mobile-header/mobile-header.component'
import { DialogService } from 'primeng/dynamicdialog'
import { InactiveDialogModule } from '../shared/modules/inactive-dialog/inactive-dialog.module'
import { AccordionModule } from 'primeng/accordion'
import { MIBNotifyAccordionComponent } from './shared/components/mib-notify-accordion/mib-notify-accordion.component'
import { MIBNotifyAccordionGroupComponent } from './shared/components/mib-notify-accordion/mib-notify-accordion-group.component'
import { UpdatePasswordDialogModule } from '../shared/modules/update-password-dialog/update-password-dialog.module'
import { NotifyDialogComponent } from './shared/components/dialogs/notify-dialog/notify-dialog.component'
import { ButtonModule as ButtonModule22 } from '../shared/ui-kit/button/button.module'
import { RefIconModule } from '../shared/ui-kit/ref-icon/ref-icon.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		HttpClientModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		DropdownModule,
		MenuModule,
		SkeletonModule,
		ProgressSpinnerModule,
		FormsModule,
		ClientRoutingModule,
		ReactiveFormsModule,
		AccordionModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		InactiveDialogModule,
		UpdatePasswordDialogModule,
		ButtonModule22,
		RefIconModule
	],
	declarations: [
		ClientComponent,
		NotifyDialogComponent,
		// Layout
		HeaderComponent,
		MobileHeaderComponent,
		// Components
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
