export type ApiResponse<T> = {
	data: T
	message?: string
	success: boolean
}

export type Pagination = {
	page?: number
	limit?: number
}
