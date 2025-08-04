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
	views: number
	answersCount: number
	score: number
	viewed: boolean
}

export type GetQuestionsResponse = {
	questions: Question[]
	total: number
}

export const enum QuestionSortBy {
	NEWEST = 'createdAt',
	UPDATED = 'updatedAt',

	VIEWS = 'views',
	ANSWERS = 'answersCount',
	VOTES = 'votesCount',
	TRENDING = 'trendingScore',

	HOT = 'hotScore',
	WEEK = 'weeklyScore'
}

export type GetQuestionsReq = Pagination & {
	userId?: number
	tagIds?: number[]
	sortBy?: QuestionSortBy
}

export type Answer = {
	id: number
	content: string
	createdAt: string
	updatedAt: string
	user: User
}
