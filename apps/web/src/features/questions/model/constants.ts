import { QuestionSortBy } from '@/shared/api/question'
import { SortOption } from '@/shared/types'

export const SORT_OPTIONS: SortOption<QuestionSortBy>[] = [
	{ value: QuestionSortBy.NEWEST, label: 'Newest', defaultOrder: 'DESC' },
	{
		value: QuestionSortBy.UPDATED,
		label: 'Recently Updated',
		defaultOrder: 'DESC'
	},
	{ value: QuestionSortBy.VIEWS, label: 'Most Viewed', defaultOrder: 'DESC' },
	{
		value: QuestionSortBy.ANSWERS,
		label: 'Most Answered',
		defaultOrder: 'DESC'
	},
	{
		value: QuestionSortBy.VOTES,
		label: 'Highest Votes',
		defaultOrder: 'DESC'
	},
	{ value: QuestionSortBy.TRENDING, label: 'Trending', defaultOrder: 'DESC' },
	{ value: QuestionSortBy.HOT, label: 'Hot This Week', defaultOrder: 'DESC' }
]

export const questionTitleText: Record<QuestionSortBy, string> = {
	[QuestionSortBy.NEWEST]: 'Newest Questions',
	[QuestionSortBy.UPDATED]: 'Recently Updated Questions',
	[QuestionSortBy.VIEWS]: 'Most Viewed Questions',
	[QuestionSortBy.ANSWERS]: 'Most Answered Questions',
	[QuestionSortBy.VOTES]: 'Highest Voted Questions',
	[QuestionSortBy.TRENDING]: 'Trending Questions',
	[QuestionSortBy.HOT]: 'Hot Questions This Week',
	[QuestionSortBy.WEEK]: 'Top Questions of the Week'
}
