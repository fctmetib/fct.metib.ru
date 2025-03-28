import {FileMode} from 'src/app/shared/types/file/file-model.interface'
import {DemandAnketInterface} from './demand-anket.interface'
import {DemandFactoringInterface} from './demand-factoring.interface'

export interface DemandDataBaseInterface {
  Limit: number
  Comment: string
	Type: string
	Files: FileMode[]
	Anket?: DemandAnketInterface
	Factoring?: DemandFactoringInterface
}

export interface DemandQueryBaseInterface {
	Subject: string
	Question: string
	Type: string
	Files: []
}
