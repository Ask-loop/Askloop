'use client'

import { motion } from 'framer-motion'
import { FaShare } from 'react-icons/fa'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui'
import { QuestionStats } from './QuestionStats'
import { SimilarQuestions } from './SimilarQuestions'

export const QuestionRightBar = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className='space-y-4'
		>
			<Button variant={'outline'} className='w-full'>
				<FaShare />
				Share
			</Button>

			<QuestionStats />

			<SimilarQuestions />
		</motion.div>
	)
}
