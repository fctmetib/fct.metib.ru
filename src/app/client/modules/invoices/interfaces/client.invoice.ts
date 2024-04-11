export interface ClientInvoice {
	ID: number
	Date: string
	Amount: number
	AmountCurrency: number
	CurrencyCode: string
	AccountDebet: string
	AccountCredit: string
	Comment?: string
	Payer: PaymentParticipant
	Beneficiary: PaymentParticipant
	ShipmentsCount?: number
}

export interface PaymentParticipant {
	INN: number
	Account: number
	Title?: string
	BIC: number
	BankAccount: number
	BankName?: string
}

export interface ExtendedClientInvoice extends ClientInvoice {
	Number: string // Добавлено из JSON
	PaymentLinks: PaymentLink[] // Новая часть, отсутствовала в ClientInvoice
	ABSID: number
}

export interface PaymentLink {
	Amount: number
	Shipment: {
		ID: number
		Account: string
		Waybill: string
		Invoice: string
		DateShipment: string
		DatePayment: string
		DateAddon: string
		Summ: number
		DutyDebtor: number
		DutyCustomer: number
		Request: {
			ID: number
			Number: string
			Date: string
			MediaRequestID: number
		}
		Delivery: {
			CurrencyCode: string
			Title: string
			CustomerID: number
			Customer: string
			DebtorID: number
			Debtor: string
			ID: number
		}
		shipmentID: number
	}
}

// Кажется, PaymentParticipant уже покрывает нужные поля, но добавим KPP для полноты, если он нужен
export interface ExtendedPaymentParticipant extends PaymentParticipant {
	KPP?: string // Опциональное поле, добавлено из JSON
}

// Обновим типы для AccountDebet и AccountCredit, чтобы соответствовали JSON
// Также, поправка на типы данных согласно твоему JSON
export interface CorrectedClientInvoice extends ExtendedClientInvoice {}
