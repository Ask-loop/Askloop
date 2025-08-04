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

export const enum QuestionOrderBy {
	NEWEST = 'NEWEST',
	OLDEST = 'OLDEST',
	MOST_VOTES = 'MOST_VOTES',
	MOST_ANSWERS = 'MOST_ANSWERS'
}

export type GetQuestionsReq = Pagination & {
	search?: string
	userId?: number
	tagIds?: number[]
	sortBy?: QuestionSortBy
	orderBy?: QuestionOrderBy
}
