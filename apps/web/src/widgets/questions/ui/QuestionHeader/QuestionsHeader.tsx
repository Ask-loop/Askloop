'use client'

import { motion } from 'framer-motion'
import { QuestionSearch } from '@/features/questions/ui/QuestionSearch'
import { QuestionSort } from '@/features/questions/ui/QuestionSort'
import { Tag } from '@/shared/types/tag'
import { TagList } from '@/shared/ui/TagsList'

export const QuestionsHeader = () => {
	const onTagClick = (tag: Tag) => {}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className='grid gap-3'
		>
			<h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
				All Questions
			</h1>

			<div className='flex w-full flex-wrap items-center justify-between gap-2'>
				<QuestionSearch />
				<QuestionSort />
			</div>

			<TagList onTagClick={onTagClick} tags={[]} />
		</motion.div>
	)
}
