import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'contacts',
	styleUrls: ['./contacts.component.scss'],
	templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	datas = [
		{
			head: [
				{
					img: './assets/images/staff/big/prav-b.jpg',
					name: 'Прохоров Александр',
					position: 'Директор департамента факторинга',
					email: 'factoring@metib.ru'
				}
			]
		},
		{
			headOfDep: [
				{
					img: './assets/images/staff/big/osam-b.jpg',
					name: 'Исаева Анастасия',
					position: 'Начальник управления',
					email: 'osam@metib.ru'
				}
			]
		},
		{
			salesDep: [
				{
					img: '',
					name: 'Капитанский Павел',
					position: 'Специалист',
					email: 'pkapitanskiy@metib.ru'
				},
				{
					img: './assets/images/staff/big/dkobyakov-b.jpg',
					name: 'Кобяков Даниил',
					position: 'Специалист',
					email: 'dkobyakov@metib.ru'
				},
				{
					img: './assets/images/staff/big/dnovikova-b.jpg',
					name: 'Новикова Дарья',
					position: 'Специалист',
					email: 'dnovikova@metib.ru'
				}
			]
		},
		{
			salesOrgDep: [
				{
					img: './assets/images/staff/big/emelocheva-b.jpg',
					name: 'Удалых Елена',
					position: 'Главный специалист',
					email: 'emelocheva@metib.ru'
				}
			]
		},
		{
			supportDep: [
				{
					img: './assets/images/staff/big/eyv-b.jpg',
					name: 'Ермолова Юлия',
					position: 'Начальник отдела',
					email: 'eyv@metib.ru'
				},
				{
					img: './assets/images/staff/big/knvl-b.jpg',
					name: 'Куприянова Наталья',
					position: 'Заместитель начальника',
					email: 'knvl@metib.ru'
				},
				{
					img: './assets/images/staff/big/ievtushenko-b.jpg',
					name: 'Евтушенко Ирина',
					position: 'Старший экономист',
					email: 'ievtushenko@metib.ru'
				},
				{
					img: './assets/images/staff/big/dladnaya-b.jpg',
					name: 'Ладная Дарья',
					position: 'Главный экономист',
					email: 'dladnaya@metib.ru'
				},
				{
					img: './assets/images/staff/big/chai-b.jpg',
					name: 'Макушкина Антонина',
					position: 'Ведущий экономист',
					email: 'chai@metib.ru'
				},
				{
					img: './assets/images/staff/big/ymanelyuk-b.jpg',
					name: 'Манелюк Юлия',
					position: 'Старший экономист',
					email: 'ymanelyuk@metib.ru'
				},
				{
					img: './assets/images/staff/big/emelnikova-b.jpg',
					name: 'Мельникова Екатерина',
					position: 'Экономист',
					email: 'emelnikova@metib.ru'
				},
				{
					img: './assets/images/staff/big/smovsesyan-b.jpg',
					name: 'Мовсесян Стелла',
					position: 'Экономист',
					email: 'smovsesyan@metib.ru'
				}
			]
		},
		{
			devDep: [
				{
					img: './assets/images/staff/big/belec-b.jpg',
					name: 'Мотылёва Екатерина',
					position: 'Начальник управления',
					email: 'belek@metib.ru'
				}
			]
		},
		{
			deptDep: [
				{
					img: './assets/images/staff/big/bji-b.jpg',
					name: 'Бакунина Юлия',
					position: 'Начальник управления',
					email: 'bji@metib.ru'
				}
			]
		}
	]

	dataSpb = [
		{
			managers: [
				{
					img: './assets/images/staff/big/covyazina-b.jpg',
					name: 'Ковязина Екатерина',
					position:
						'Главный специалист',
					email: 'ekovyazina@metib.ru'
				}
			]
		}
	]

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
