'use client'

import { motion } from 'framer-motion'
import { useQuestionStore } from '@/features/questions/model'
import { questionTitleText } from '@/features/questions/model/constants'

export const QuestionsHeader = () => {
	const sortBy = useQuestionStore(state => state.sortBy)

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<h1 className='line-clamp-2 text-2xl font-bold tracking-tight sm:text-3xl'>
				{questionTitleText[sortBy]}
			</h1>
		</motion.div>
	)
}
