import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuestionOrderBy } from '@/entities/questions/model/types'

type QuestionState = {
	searchQuery: string
	orderBy: QuestionOrderBy
	tags: string[]
	page: number
	limit: number
}

type QuestionActions = {
	setSearchQuery: (searchQuery: string) => void
	setOrderBy: (orderBy: QuestionOrderBy) => void
	setTags: (tags: string[]) => void
	setPage: (page: number) => void
	setLimit: (limit: number) => void
}

export const useQuestionStore = create<QuestionState & QuestionActions>()(
	persist(
		set => ({
			searchQuery: '',
			orderBy: QuestionOrderBy.NEWEST,
			tags: [],
			page: 1,
			limit: 10,
			setSearchQuery: (searchQuery: string) => set({ searchQuery }),
			setOrderBy: (orderBy: QuestionOrderBy) => set({ orderBy }),
			setTags: (tags: string[]) => set({ tags }),
			setPage: (page: number) => set({ page }),
			setLimit: (limit: number) => set({ limit })
		}),
		{
			name: 'questionStore',
			partialize: state => ({
				orderBy: state.orderBy,
				page: state.page,
				limit: state.limit
			})
		}
	)
)
