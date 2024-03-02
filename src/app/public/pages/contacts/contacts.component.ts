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
			managers: [
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
		},
		{
			supportDep: [
				{
					img: './assets/images/staff/big/dladnaya-b.jpg',
					name: 'Ладная Дарья',
					position: 'Главный экономист',
					email: 'dladnaya@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/chai-b.jpg',
					name: 'Макушкина Антонина',
					position: 'Ведущий экономист',
					email: 'chai@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/ievtushenko-b.jpg',
					name: 'Евтушенко Ирина',
					position: 'Старший экономист',
					email: 'ievtushenko@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/ymanelyuk-b.jpg',
					name: 'Манелюк Юлия',
					position: 'Главный экономист',
					email: 'ymanelyuk@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/emelnikova-b.jpg',
					name: 'Мельникова Екатерина',
					position: 'Ведущий экономист',
					email: 'emelnikova@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/smovsesyan-b.jpg',
					name: 'Мовсесян Стелла',
					position: 'Старший экономист',
					email: 'smovsesyan@metib.ru',
					tel: '000-000'
				}
			]
		},
		{
			salesDep: [
				{
					img: './assets/images/staff/big/dandrianov-b.jpg',
					name: 'Андрианов Дмитрий',
					position: 'Специалист отдела продаж',
					email: 'dandrianov@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/ivanovaap-b.jpg',
					name: 'Иванова Анастасия',
					position: 'Специалист отдела продаж',
					email: 'ivanovaap@metib.ru',
					tel: '000-000'
				},
				{
					img: './assets/images/staff/big/dkobyakov-b.jpg',
					name: 'Кобяков Даниил',
					position: 'Специалист отдела продаж',
					email: 'dkobyakov@metib.ru',
					tel: '000-000'
				}
			]
		},
		{
			salesOrgDep: [
				{
					img: './assets/images/staff/big/kkhrapova-b.jpg',
					name: 'Храпова Ксения',
					position: 'Специалист отдела организации продаж',
					email: 'kkhrapova@metib.ru',
					tel: '000-000'
				}
			]
		}
	]
}
