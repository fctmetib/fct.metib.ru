import {IDraftList, IHistoryList, IQueryList} from './data.models'

export const querylist: IQueryList[] = [
  {
    id: 1,
    title: 'Запрос на ЭЦП',
    description:
      'Запрос на подтверждение или авторизацию документа с использованием электронной цифровой подписи',
    quantity: 12,
    isUserVerified: false
  },
  {
    id: 2,
    title: 'Запрос на Поручительство',
    description:
      'Просьба о финансовой или юридической гарантии за выполнение обязательств или погашение долга третьей стороны',
    quantity: 0,
    isUserVerified: true
  },
  {
    id: 3,
    title: 'Запрос на изменение профиля',
    description: 'Запрос для внесения изменений в профиль на платформе',
    quantity: 2,
    isUserVerified: true
  },
  {
    id: 4,
    title: 'Запрос на обновление лимита',
    description: 'Просьба о пересмотре или увеличении предоставленного лимита',
    quantity: 1,
    isUserVerified: true
  },
  {
    id: 5,
    title: 'Запрос на добавление дебитора',
    description: 'Запрос на внесение нового клиента или контрагента в систему',
    quantity: 3,
    isUserVerified: true
  },
  // {
  //   id: 6,
  //   title: 'Регистрация канала верификации',
  //   description:
  //     'Запрос для проверки и подтверждения информации или данных о компании',
  //   quantity: 6
  // },

  {
  	id: 7,
  	title: 'Запрос на факторинг',
  	description:
  		'Запрос со стороны компании (клиента) к фактору с целью продажи своих дебиторских обязательств.',
  	quantity: 0,
    visibleWithoutRoles: ['Customer']
  },
  {
  	id: 8,
  	title: 'Запрос на агентский факторинг',
  	description:
  		'Запрос от компании (клиента) к фактору с целью установления агентского соглашения. В агентском факторинге фактор выполняет функции агента, а не покупателя дебиторских обязательств.',
  	quantity: 0,
    visibleWithoutRoles: ['Debtor']
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
      avatarUrl: './assets/images/woman-avatar.jpg'
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
      avatarUrl: './assets/images/woman-avatar.jpg'
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
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  },
  {
    id: 4,
    number: '142/02-2016',
    type: 'Запрос на ЭЦП',
    date: '2014-06-09T00:00:00',
    status: false,
    charge: {
      name: 'Бирюкова Кристина (11-11)',
      avatarUrl: './assets/images/woman-avatar.jpg'
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
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  },
  {
    id: 6,
    number: '1345/05-2018',
    type: 'Запрос на ЭЦП',
    date: '2013-07-09T00:00:00',
    status: false,
    charge: {
      name: 'Бирюкова Кристина (11-11)',
      avatarUrl: './assets/images/woman-avatar.jpg'
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
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  },
  {
    id: 8,
    number: '3455/03-20xzc14',
    type: 'Запрос на ЭЦП',
    date: '2022-03-09T00:00:00',
    status: true,
    charge: {
      name: 'Бирюкова Кристина (11-11)',
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  },
  {
    id: 9,
    number: '3455/03-2018764',
    type: 'Запрос на ЭЦП',
    date: '2022-03-09T00:00:00',
    status: false,
    charge: {
      name: 'Бирюкова Кристина (11-11)',
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  },
  {
    id: 10,
    number: '3455/03-243544',
    type: 'Запрос на ЭЦП',
    date: '2022-03-09T00:00:00',
    status: true,
    charge: {
      name: 'Бирюкова Кристина (11-11)',
      avatarUrl: './assets/images/woman-avatar.jpg'
    }
  }
]

export const draftlist: IDraftList[] = [
  {
    id: 1,
    number: '1085/08-201524',
    type: 'Запрос на ЭЦП',
    progress: '30%'
  },
  {
    id: 2,
    number: '1086/09-20452615',
    type: 'Запрос на ЭЦП',
    progress: '50%'
  },
  {
    id: 3,
    number: '105/02-2746015',
    type: 'Запрос на ЭЦП',
    progress: '35%'
  },
  {
    id: 4,
    number: '142/02-2016746',
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
    number: '3455/03-223454',
    type: 'Запрос на ЭЦП',
    progress: '20%'
  },
  {
    id: 8,
    number: '1085/08-202435',
    type: 'Запрос на ЭЦП',
    progress: '30%'
  },
  {
    id: 9,
    number: '1086/09-20234',
    type: 'Запрос на ЭЦП',
    progress: '50%'
  },
  {
    id: 10,
    number: '105/02-2015',
    type: 'Запрос на ЭЦП',
    progress: '35%'
  },
  {
    id: 11,
    number: '142/02-20235',
    type: 'Запрос на ЭЦП',
    progress: '67%'
  },
  {
    id: 12,
    number: '3524/09-22345',
    type: 'Запрос на ЭЦП',
    progress: '90%'
  },
  {
    id: 13,
    number: '1345/05-23456',
    type: 'Запрос на ЭЦП',
    progress: '70%'
  },
  {
    id: 14,
    number: '3455/03-2345614',
    type: 'Запрос на ЭЦП',
    progress: '20%'
  },
  {
    id: 15,
    number: '1085/08-56355',
    type: 'Запрос на ЭЦП',
    progress: '30%'
  },
  {
    id: 16,
    number: '1086/09-546',
    type: 'Запрос на ЭЦП',
    progress: '50%'
  },
  {
    id: 17,
    number: '105/02-20143',
    type: 'Запрос на ЭЦП',
    progress: '35%'
  },
  {
    id: 18,
    number: '142/02-20432',
    type: 'Запрос на ЭЦП',
    progress: '67%'
  },
  {
    id: 19,
    number: '3524/09-2245',
    type: 'Запрос на ЭЦП',
    progress: '90%'
  },
  {
    id: 20,
    number: '1345/05-22435',
    type: 'Запрос на ЭЦП',
    progress: '70%'
  },
  {
    id: 21,
    number: '3455/03-2356',
    type: 'Запрос на ЭЦП',
    progress: '20%'
  },
  {
    id: 22,
    number: '3455/03-2245',
    type: 'Запрос на ЭЦП',
    progress: '60%'
  }
]
