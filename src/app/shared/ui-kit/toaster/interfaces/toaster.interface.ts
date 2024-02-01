export type ToasterType = 'default' | 'success' | 'failure'
export type ToasterDevice = 'desktop' | 'mobile'

export interface Toaster {
	type: ToasterType
	title: string
	description: string
	delay: number
}
