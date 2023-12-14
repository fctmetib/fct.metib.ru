import { IDraftList, IHistoryList, IQueryList } from './data.models'

export const querylist: IQueryList[] = [
	{
		id: 1,
		title: 'Запрос на ЭЦП',
		description:
			'Запрос на подтверждение или авторизацию документа с использованием электронной цифровой подписи',
		quantity: 12
	},
	{
		id: 2,
		title: 'Запрос на Поручительство',
		description:
			'Просьба о финансовой или юридической гарантии за выполнение обязательств или погашение долга третьей стороны',
		quantity: 0
	},
	{
		id: 3,
		title: 'Запрос на обновление лимита',
		description: 'Просьба о пересмотре или увеличении предоставленного лимита',
		quantity: 1
	},
	{
		id: 4,
		title: 'Запрос на добавление дебитора',
		description: 'Запрос на внесение нового клиента или контрагента в систему',
		quantity: 3
	},
	{
		id: 5,
		title: 'Регистрация канала верификации',
		description:
			'Запрос для проверки и подтверждения информации или данных о компании',
		quantity: 6
	},
	{
		id: 6,
		title: 'Запрос на изменение профиля',
		description: 'Запрос для внесения изменений в профиль на платформе',
		quantity: 2
	}
]

export const historylist: IHistoryList[] = [
	{
		id: 1,
		number: '1085/08-2015',
		type: 'Запрос на ЭЦП',
		date: '2019-01-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 2,
		number: '1086/09-2015',
		type: 'Запрос на ЭЦП',
		date: '2015-02-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 3,
		number: '105/02-2015',
		type: 'Запрос на ЭЦП',
		date: '2015-04-10T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 4,
		number: '142/02-2016',
		type: 'Запрос на ЭЦП',
		date: '2014-06-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 5,
		number: '3524/09-2016',
		type: 'Запрос на ЭЦП',
		date: '2012-03-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 6,
		number: '1345/05-2018',
		type: 'Запрос на ЭЦП',
		date: '2013-07-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	},
	{
		id: 7,
		number: '3455/03-2014',
		type: 'Запрос на ЭЦП',
		date: '2022-03-09T00:00:00',
		status: true,
		charge: {
			name: 'Бирюкова Кристина (11-11)',
			avatarUrl: './assets/123'
		}
	}
]

export const draftlist: IDraftList[] = [
	{
		id: 1,
		number: '1085/08-2015',
		type: 'Запрос на ЭЦП',
		progress: '30%'
	},
	{
		id: 2,
		number: '1086/09-2015',
		type: 'Запрос на ЭЦП',
		progress: '50%'
	},
	{
		id: 3,
		number: '105/02-2015',
		type: 'Запрос на ЭЦП',
		progress: '35%'
	},
	{
		id: 4,
		number: '142/02-2016',
		type: 'Запрос на ЭЦП',
		progress: '67%'
	},
	{
		id: 5,
		number: '3524/09-2016',
		type: 'Запрос на ЭЦП',
		progress: '90%'
	},
	{
		id: 6,
		number: '1345/05-2018',
		type: 'Запрос на ЭЦП',
		progress: '70%'
	},
	{
		id: 7,
		number: '3455/03-2014',
		type: 'Запрос на ЭЦП',
		progress: '20%'
	}
]
