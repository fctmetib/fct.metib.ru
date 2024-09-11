export interface PaginatorRequest {
  pagination: PaginatorOptions
}

export interface PaginatorOptions {
  page: number
  limit: number
}

export interface PaginatorAsyncOptionsDto<ConditionsType> {
  conditions: ConditionsType
  pagination: PaginatorOptions
}

export interface PaginatorResponse<T> {
  totalItems: number
  totalPages: number
  limit: number
  page: number
  items: T[]
}
