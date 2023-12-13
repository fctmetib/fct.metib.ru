import { IQueryList } from './data.models'

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
		quantity: 16
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

export const factoring = {
	ABSID: 10035729313,
	Title: 'ДРИВИКС ООО',
	Limit: 1500000000.0,
	Contract: {
		Number: '1085/08-2015',
		Date: '2019-01-09T00:00:00'
	},
	Organization: {
		Title: 'ООО «ДРИВИКС»',
		Inn: '7704742940',
		Kpp: '772301001',
		ID: 44110
	},
	Manager: {
		Avatar: 'd0095f34-1b02-47d2-83e3-7514f599c049',
		Name: 'Манелюк Юлия',
		Email: 'ymanelyuk@metib.ru',
		Extension: '51-61',
		ID: 456
	},
	ID: 1050
}

export const finststistics = {
	CustomerID: 1050,
	Limit: 1500000000.0,
	UsedLimit: 937597409.4,
	DelayAmount: 43545937.0
}

export const digisign = {
	Organization: {
		Type: 1,
		LegalForm: 'ООО',
		FullTitle: 'Общество с ограниченной ответственностью «ДРИВИКС»',
		ShortTitle: 'ООО «ДРИВИКС»',
		ForeignTitle: '',
		Phone: '(495) 231-44-34',
		Email: 'info@drivix.com',
		Website: 'drivix.com',
		LegalAddress: {
			PostCode: '115432',
			Country: null,
			RegionTitle: 'Москва',
			RegionCode: 77,
			District: null,
			City: null,
			Locality: null,
			Street: 'Трофимова',
			House: 'Двлд 14стр1',
			Appartment: 'эт/пом/ком 4/V/12'
		},
		FactAddressEquals: false,
		FactAddress: {
			PostCode: '115432',
			Country: 'Российская Федерация',
			RegionTitle: 'Москва',
			RegionCode: 0,
			District: '',
			City: 'Москва',
			Locality: '',
			Street: 'ул. Трофимова',
			House: 'д.14, стр.1, 4 эт.',
			Appartment: ''
		},
		PostAddressEquals: true,
		PostAddress: {
			PostCode: '115432',
			Country: 'Российская Федерация',
			RegionTitle: 'г. Москва',
			RegionCode: 77,
			District: '',
			City: '',
			Locality: '',
			Street: 'ул. Трофимова',
			House: 'двлд. 14, стр. 1',
			Appartment: 'эт. 4, пом. V, ком. 12'
		},
		Requisites: {
			LegalForm: 'ООО',
			INN: '7704742940',
			KPP: '772301001',
			OGRN: '1097746843700',
			OKPO: '64532378',
			OKATO: '45290594000',
			OKVED: '46.43',
			Signer: {
				FIO: 'Котов Андрей Андреевич',
				Position: 'Генеральный директор',
				Reason:
					'в лице Генерального директора Котова А. А., действующего на основании Устава'
			},
			AccountManager: '',
			BankAccount: {
				Bank: 'ПАО АКБ "МЕТАЛЛИНВЕСТБАНК"',
				COR: '30101810300000000176',
				BIK: '044525176',
				Number: '407 02 810 6 1400 0000081'
			},
			RegistrationDate: '2009-12-28T00:00:00',
			RegistrationRegionID: 382,
			SalesManagerID: 0
		},
		Settings: {
			BorderHour: 16,
			AgregateUnload: true,
			FabricPostingType: 1,
			SystemNameType: 2
		}
	},
	Person: {
		NameFirst: 'Андрей',
		NameLast: 'Котов',
		NameSecond: 'Андреевич',
		Gender: 1,
		SNILS: '042-789-623 88',
		INN: '123456789166',
		BirthDate: '1984-07-17T00:00:00',
		BirthCountryCode: null,
		BirthPlace: 'гор. Москва',
		Phone: '8-985-914-2135',
		Email: 'mey@drivix.ru'
	},
	Passport: {
		Number: '4510439394',
		Date: '2009-12-07T00:00:00',
		Expire: null,
		IssuerTitle:
			'отделением по району преображенское оуфмс россии по гор.москве',
		IssuerCode: '770-057',
		IsForeign: false,
		Nationality: ''
	},
	PersonPosition: 'Генеральный директор',
	PersonalAgreement: false,
	identificationPointGuid: '00000000-0000-0000-0000-000000000000',
	Type: 'DigitalSignature',
	Files: [
		{
			ID: 109499,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 109500,
			Identifier: 'INN',
			Code: '8560862b-d3e4-47dc-a78a-c37a61dac9ad',
			FileName: 'Сидетельство о постановке на учет 2009г..jpg',
			Size: 234882
		},
		{
			ID: 109501,
			Identifier: 'OGRN',
			Code: 'ca84e7df-6c78-4c37-a5dd-363266c8902f',
			FileName: 'Свидетельство о государственной регистрации Дривикс 2009.jpg',
			Size: 325853
		},
		{
			ID: 109502,
			Identifier: 'SNILS',
			Code: '0a7c0466-661e-4b39-93e2-9ad4dcc46d05',
			FileName: 'СНИЛС КОТОВ.pdf',
			Size: 112182
		},
		{
			ID: 109503,
			Identifier: 'GenDir',
			Code: '0755c764-a73b-4d1e-b3b3-ab3e38503586',
			FileName: 'Приказ 5.pdf',
			Size: 186020
		},
		{
			ID: 0,
			Identifier: 'Application',
			Code: '5a55f746-a738-4192-ad54-9402d0ee7da5',
			FileName: 'ЭЦП Дривикс.pdf',
			Size: 455395
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		},
		{
			ID: 224087,
			Identifier: 'Passport',
			Code: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
			FileName: 'паспорт котов все страницы.pdf',
			Size: 6860446
		}
	]
}

export const user = {
	Profile: {
		Name: {
			First: 'Андрей',
			Last: 'Котов'
		},
		IsMale: true,
		Phone: '8-985-914-2135',
		Email: 'mey@drivix.ru',
		Login: 'mey@drivix.ru'
	},
	Passport: {
		Number: '4510439394',
		Date: '2009-12-07T00:00:00',
		IssuerTitle:
			'отделением по району преображенское оуфмс россии по гор.москве',
		IssuerCode: '770-057',
		IsForeign: false,
		Nationality: ''
	},
	PassportFileCode: '48b1818c-b0b4-47bd-b16b-4a90df751e04',
	Avatar: '',
	ID: 1483
}
