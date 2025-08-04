import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuestionSortBy } from '@/shared/api/question'
import { SortOption } from '@/shared/types'

type QuestionState = {
	selectedTags: SortOption<number>[]
	sortBy: QuestionSortBy
	page: number
	limit: number
}

type QuestionActions = {
	setSelectedTags: (tags: SortOption<number>[]) => void
	setPage: (page: number) => void
	setLimit: (limit: number) => void
	setSortBy: (sortBy: QuestionSortBy) => void
}

export const useQuestionStore = create<QuestionState & QuestionActions>()(
	persist(
		set => ({
			selectedTags: [],
			page: 1,
			limit: 10,
			sortBy: QuestionSortBy.NEWEST,
			setSortBy: sortBy => set({ sortBy }),
			setSelectedTags: tags => set({ selectedTags: tags }),
			setPage: page => set({ page }),
			setLimit: limit => set({ limit })
		}),
		{
			name: 'questionStore',
			partialize: state => ({
				selectedTags: state.selectedTags,
				sortBy: state.sortBy,
				page: state.page,
				limit: state.limit
			})
		}
	)
)
