'use client'

import { motion } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { useGetQuestions } from '@/features/questions/hooks/queries'
import { useQuestionStore } from '@/features/questions/model'
import { Button } from '@/shared/shadcn/ui/button'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { ROUTES } from '@/constants'
import { QuestionCard, QuestionCardSkeleton } from '@/entities/questions'

export const QuestionsList = () => {
	const { page, limit, searchQuery, orderBy, setPage, setLimit } =
		useQuestionStore(
			useShallow(state => ({
				page: state.page,
				limit: state.limit,
				searchQuery: state.searchQuery,
				orderBy: state.orderBy,
				setPage: state.setPage,
				setLimit: state.setLimit
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

	const handlePaginationChange = (page: number, limit: number) => {
		setPage(page)
		setLimit(limit)
	}

	if (isLoading) {
		return (
			<div className='grid gap-4 sm:gap-6'>
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
				className='bg-card flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 text-center sm:p-8'
			>
				<HelpCircle className='text-muted-foreground h-10 w-10 sm:h-12 sm:w-12' />
				<h3 className='text-base font-medium sm:text-lg'>
					No questions found
				</h3>
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
		<div className='grid gap-4 sm:gap-6'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='mb-4'
			>
				<div className='text-muted-foreground text-sm'>
					Showing {data?.questions?.length} of {data?.total} questions
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className='grid gap-4 sm:gap-6'
			>
				{data?.questions?.map((question, index) => (
					<motion.div
						key={question.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<QuestionCard
							question={question}
							onTagClick={handleTagClick}
						/>
					</motion.div>
				))}
			</motion.div>

			<Pagination
				currentPage={page}
				pageSize={limit}
				total={data?.total}
				onChange={handlePaginationChange}
				isShowPerPage
			/>
		</div>
	)
}
