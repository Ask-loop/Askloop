'use client'

import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { QuestionSearch } from '@/features/questions/ui/QuestionSearch'
import { QuestionSort } from '@/features/questions/ui/QuestionSort'
import { Button } from '@/shared/shadcn/ui'
import { QuestionOrderBy } from '@/shared/types'
import { Tag } from '@/shared/types/tag'
import { TagList } from '@/shared/ui/TagsList'

export const QuestionsHeader = () => {
	const onSearchChange = (value: string) => {}

	const onSortChange = (value: string) => {}

	const onTagClick = (tag: Tag) => {}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className='mb-3 flex flex-col gap-3'
		>
			<h1 className='text-3xl font-bold tracking-tight'>All Questions</h1>

			<div className='mb-3 flex items-center justify-between'>
				<QuestionSearch />
				<QuestionSort />
			</div>

			<TagList onTagClick={onTagClick} tags={[]} />
		</motion.div>
	)
}
