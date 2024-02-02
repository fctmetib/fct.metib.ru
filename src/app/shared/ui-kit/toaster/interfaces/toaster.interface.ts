import {ToasterType} from './toaster-point.interface'

export interface Toaster {
	type: ToasterType
	title: string
	description: string
	delay: number
}
