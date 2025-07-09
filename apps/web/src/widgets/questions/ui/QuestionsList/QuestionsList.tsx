'use client'

import { motion } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { useGetQuestions } from '@/features/questions/hooks/queries'
import { useQuestionStore } from '@/features/questions/model'
import { Button } from '@/shared/shadcn/ui'
import { ROUTES } from '@/constants'
import { QuestionCard, QuestionCardSkeleton } from '@/entities/questions'

export const QuestionsList = () => {
	const { page, limit, searchQuery, orderBy } = useQuestionStore(
		useShallow(state => ({
			page: state.page,
			limit: state.limit,
			searchQuery: state.searchQuery,
			orderBy: state.orderBy
		}))
	)

	const { data, isLoading } = useGetQuestions({
		page,
		limit,
		search: searchQuery,
		orderBy
	})

	const handleTagClick = () => {
		console.log('handleTagClick')
	}

	if (isLoading) {
		return (
			<div className='grid gap-6'>
				{Array.from({ length: limit }).map((_, index) => (
					<QuestionCardSkeleton key={index} />
				))}
			</div>
		)
	}

	if (!data?.questions?.length) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='flex flex-col items-center justify-center space-y-4 rounded-lg border p-8 text-center'
			>
				<HelpCircle className='text-muted-foreground h-12 w-12' />
				<h3 className='text-lg font-medium'>No questions found</h3>
				<p className='text-muted-foreground text-sm'>
					Be the first to ask a question!
				</p>
				<Button className='mt-4' asChild>
					<Link href={ROUTES.ask}>
						<Plus className='mr-2 h-4 w-4' />
						Ask a Question
					</Link>
				</Button>
			</motion.div>
		)
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='mb-3'
			>
				<div className='text-muted-foreground text-sm'>
					Showing {data?.questions?.length} of {data?.total} questions
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className='grid gap-6'
			>
				{data?.questions?.map((question, index) => (
					<motion.div
						key={question.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<QuestionCard
							variant='compact'
							question={question}
							onTagClick={handleTagClick}
						/>
					</motion.div>
				))}
			</motion.div>
		</>
	)
}
