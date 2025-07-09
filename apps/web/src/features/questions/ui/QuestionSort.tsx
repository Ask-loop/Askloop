'use client'

import { useShallow } from 'zustand/react/shallow'
import { SortSelect } from '@/shared/ui/SortSelect'
import { useQuestionStore } from '../model'
import { SORT_OPTIONS } from '../model/constants'
import { QuestionOrderBy } from '@/entities/questions/model/types'

export const QuestionSort = () => {
	const { orderBy, setOrderBy } = useQuestionStore(
		useShallow(state => ({
			orderBy: state.orderBy,
			setOrderBy: state.setOrderBy
		}))
	)

	const handleChange = (value: string) => {
		setOrderBy(value as QuestionOrderBy)
	}

	return (
		<SortSelect
			value={orderBy}
			onChange={handleChange}
			options={SORT_OPTIONS}
		/>
	)
}
