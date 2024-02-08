export interface ClientInvoice {
	ID: number
	Date: string
	Amount: number
	AmountCurrency: number
	CurrencyCode: string
	AccountDebet: number
	AccountCredit: number
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
