import {ToasterPointType} from './toaster-point.interface'

export interface Toaster {
	type: ToasterPointType
	title: string
	description: string
	contrast: boolean
	showDescription: boolean
	delay: number
}
