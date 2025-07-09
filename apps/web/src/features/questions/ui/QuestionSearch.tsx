'use client'

import { useDebounceCallback } from 'usehooks-ts'
import { useShallow } from 'zustand/react/shallow'
import { SearchInput } from '@/shared/ui/SearchInput'
import { useQuestionStore } from '../model'

export const QuestionSearch = () => {
	const { searchQuery, setSearchQuery } = useQuestionStore(
		useShallow(state => ({
			searchQuery: state.searchQuery,
			setSearchQuery: state.setSearchQuery
		}))
	)

	const handleChange = useDebounceCallback((value: string) => {
		setSearchQuery(value)
	}, 500)

	return (
		<SearchInput
			className='w-[300px]'
			onChange={handleChange}
			placeholder='Search questions...'
		/>
	)
}
