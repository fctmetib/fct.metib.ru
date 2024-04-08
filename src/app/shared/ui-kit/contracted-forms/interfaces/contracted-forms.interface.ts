import {PaymentParticipant} from '../../../../client/modules/invoices/interfaces/client.invoice'

export type ContractedFormsState = 'edit' | 'create' | 'view'
export type ContractedFormsDevice = 'Desktop' | 'Mobile'
export enum ContractedFormsEnum {
	BankDetails = 'BankDetails',
	EnterpriseRealEstate = 'EnterpriseRealEstate',
	ElectronicDocumentManagement = 'ElectronicDocumentManagement',
	DebtObligations = 'DebtObligations',
	ATemplateForAllOccasions = 'ATemplateForAllOccasions'
}

export interface BankDetailsData {
	paymentParticipant: PaymentParticipant
	// openDate: string
	// closeDate: string
}
