'use client'

import { motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { Tabs, TabsList, TabsTrigger } from '@/shared/shadcn/ui/tabs'
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
		<Tabs value={orderBy} onValueChange={handleChange}>
			<TabsList className='grid w-full grid-cols-4 gap-2'>
				{SORT_OPTIONS.map(option => (
					<TabsTrigger
						className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
						key={option.value}
						value={option.value}
					>
						{option.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
