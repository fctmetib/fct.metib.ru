import {Component} from '@angular/core'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
	public iconsDatas = [
		{
			id: 1,
			icon: 'fi_shield',
			// icon: 'fi_clipboard',
			title: 'Надежно',
			text: 'Отсутствие риска неоплаты со стороны дебитора'
		},
		{
			id: 2,
			icon: 'fi_copy',
			title: 'Прозрачно',
			text: 'Тарифные планы без скрытых комиссий или платежей'
		},
		{
			id: 3,
			icon: 'fi_clipboard',
			// icon: 'fi_shield',
			title: 'Без залога',
			text: 'Для оформления не требуется залог, нужна только поставка'
		},
		{
			id: 4,
			icon: 'fi_twitter',
			title: 'Без ограничений',
			text: 'Полученные деньги можно тратить на любые цели'
		}
	]
	constructor(private toaster: ToasterService) {}

	public getFunding() {
		console.log('get funding')
	}
}
