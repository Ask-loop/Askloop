import { QuestionOrderBy, QuestionSortBy } from '@/shared/types'

export const SORT_OPTIONS: {
	label: string
	value: QuestionOrderBy
}[] = [
	{ label: 'Newest', value: QuestionOrderBy.NEWEST },
	{ label: 'Oldest', value: QuestionOrderBy.OLDEST },
	{ label: 'Most Votes', value: QuestionOrderBy.MOST_VOTES },
	{ label: 'Most Answers', value: QuestionOrderBy.MOST_ANSWERS }
]
