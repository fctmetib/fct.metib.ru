export interface IQueryList {
	id: number
	title: string
	description: string
	quantity: number
  isUserVerified?: boolean
  visibleWithRoles?: string[]
  visibleWithoutRoles?: string[]
}

export interface IDraftList {
	id: number
	number: string
	type: string
	progress: string
}

export interface IHistoryList {
	id: number
	number: string
	type: string
	date: string
	status: boolean
	charge: ICharge
}

export interface ICharge {
	name: string
	avatarUrl: string
}
