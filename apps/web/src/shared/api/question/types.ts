import { Pagination, Tag, User } from '@/shared/types'
import { QuestionOrderBy } from '@/entities/questions/model/types'

export type AskQuestionInput = {
	title: string
	body: string
	tags: string[]
}

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

export type GetQuestionsReq = Pagination & {
	search?: string
	userId?: number
	tagIds?: number[]
	sortBy?: QuestionSortBy
	orderBy?: QuestionOrderBy
}
