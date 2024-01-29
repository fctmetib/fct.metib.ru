export interface DeliveryContractsInterface {
	ID: number
	Title: string
	Number: string
	DateFrom: string
	DateTo: string
	Tariff: {
		Identifier: string
		Title: string
	}
	Customer: {
		ID: number
		OrganizationID: number
		INN: string
		Title: string
	}
	Debtor: {
		ID: number
		OrganizationID: number
		INN: string
		Title: string
	}
	Delay: {
		Count: number
		Day: number
		Work: true
		Min: number
		Max: number
	}
	Statistics: {
		Count: number
		DutyDebtor: number
		DutyCustomer: number
		DelayDuty: number
		FreeLimit: number
	}
}

export interface AdvancedDeliveryContracts extends DeliveryContractsInterface {
	AdvancedContract?: boolean
}
