import { Pagination } from './common.types'
import { Tag } from './tag'
import { User } from './user.types'

export type Question = {
	id: number
	title: string
	body: string
	slug: string
	tags: Tag[]
	createdAt: string
	updatedAt: string
	user: User
}

export type GetQuestionsResponse = {
	questions: Question[]
	total: number
}

export const enum QuestionSortBy {
	CreatedAt = 'createdAt',
	UpdatedAt = 'updatedAt'
}

export const enum QuestionOrderBy {
	NEWEST = 'NEWEST',
	OLDEST = 'OLDEST'
}

export type GetQuestionsReq = Pagination & {
	search?: string
	userId?: number
	tagIds?: number[]
	sortBy?: QuestionSortBy
	orderBy?: QuestionOrderBy
}
