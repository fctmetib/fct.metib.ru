export interface ClientInvoiceInterface {
	ID: number
	Date: Date
	Amount: number
	AmountCurrency: number
	CurrencyCode: string
	AccountDebet: number
	AccountCredit: number
	Comment?: string
	Payer: {
		INN: number
		Account: number
		Title?: string
		BIC: number
		BankAccount: number
		BankName?: string
	}
	Beneficiary: {
		INN: number
		Account: number
		Title?: string
		BIC: number
		BankAccount: number
		BankName?: string
	}
	ShipmentsCount?: number
}
