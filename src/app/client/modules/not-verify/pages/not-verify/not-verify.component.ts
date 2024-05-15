import {Component} from '@angular/core'
import {RequestDrawerService} from '../../modules/request-drawer/request-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {VerifyDrawerService} from '../../modules/verify-drawer/verify-drawer.service'

@Component({
	selector: 'mib-not-verify',
	templateUrl: './not-verify.component.html',
	styleUrls: ['./not-verify.component.scss']
})
export class NotVerifyComponent {
	public notVerifyRequest = {
		title: 'Запрос на ЭПЦ',
		description:
			'Запрос на подтверждение или авторизацию документа с использованием электронной цифровой подписи'
	}

	constructor(
		private requestDrawerService: RequestDrawerService,
		private verifyDrawerService: VerifyDrawerService
	) {}

	openVerifyDrawer() {
		console.log('open openQueryDrawer>>>')
		this.verifyDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}

	openRequestDrawer() {
		console.log('open openRequestDrawers>>>')
		this.requestDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}
}
