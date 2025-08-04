import { type ReactNode } from 'react'

export type ApiResponse<T> = {
	data: T
	message?: string
	success: boolean
}

export type Pagination = {
	page?: number
	limit?: number
}

export type SortOption<T = string> = {
	label: ReactNode
	value: T
} & Record<string, any>
