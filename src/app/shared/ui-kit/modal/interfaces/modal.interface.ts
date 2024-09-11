import {ModalDefaultWidth} from '../modal.tools'

export type ModalType = 'success' | 'failure' | 'navigation' | 'informational'
export type ModalContent = 'pin' | 'new-shipment' | 'default'

export interface ModalData<T = any> {
	type?: ModalType
	content?: ModalContent
	width?: ModalDefaultWidth
	data?: T
}
