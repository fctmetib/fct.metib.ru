import {Component} from '@angular/core'

@Component({
	selector: 'contacts',
	styleUrls: ['./contacts.component.scss'],
	templateUrl: './contacts.component.html'
})
export class ContactsComponent {
	constructor() {}

	datas = [
		{
			img: './assets/images/staff/big/prav-b.jpg',
			name: 'Прохоров Александр',
			position: 'Директор департамента',
			email: 'prav@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/osam-b.jpg',
			name: 'Исаева Анастасия',
			position: 'Начальник по работе с клиентами',
			email: 'osam@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/bji-b.jpg',
			name: 'Бакунина Юлия',
			position: 'Начальник по работе с дебиторами',
			email: 'bji@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/belec-b.jpg',
			name: 'Мотылёва Екатерина',
			position: 'Начальник по развитию факторинговых продуктов',
			email: 'belec@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/eyv-b.jpg',
			name: 'Ермолова Юлия',
			position: 'Начальник по сопровождению  факторинговых операций',
			email: 'eyv@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/knvl-b.jpg',
			name: 'Куприянова Наталья',
			position: 'Зам. Начальника по сопровождению  факторинговых операций',
			email: 'knvl@metib.ru',
			tel: '000-000'
		},
		{
			img: './assets/images/staff/big/yrovenskikh-b.jpg',
			name: 'Ровенских Юлия',
			position: 'Начальник отдела по организации продаж',
			email: 'yrovenskikh@metib.ru',
			tel: '000-000'
		}
	]
}
