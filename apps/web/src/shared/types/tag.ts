import { Pagination } from './common.types'

export type Tag = {
	id: number
	name: string
	description?: string
	createdAt: string
	updatedAt?: string
}

export type GetTagsResponse = {
	tags: Tag[]
	total: number
}

export const enum TagOrderBy {
	Newest = 'newest',
	Name = 'name',
	Popular = 'popular'
}

export type GetTagsReq = Pagination & {
	search?: string
	orderByTag?: TagOrderBy
}
