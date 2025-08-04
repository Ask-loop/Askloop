import { motion } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { Question } from '@/shared/api/question'
import { Button } from '@/shared/shadcn/ui'
import { Tag } from '@/shared/types'
import { ROUTES } from '@/constants'
import { QuestionCard, QuestionCardSkeleton } from '@/entities/questions'

type QuestionContainerProps = {
	questions?: Question[]
	selectedTagIds: number[]
	onTagClick?: (tag: Tag) => void
	isLoading?: boolean
}

export const QuestionContainer = ({
	questions,
	selectedTagIds,
	onTagClick,
	isLoading
}: QuestionContainerProps) => {
	if (isLoading) {
		return (
			<div className='grid gap-2 py-5 sm:gap-3'>
				{Array.from({ length: 8 }).map((_, index) => (
					<QuestionCardSkeleton key={index} />
				))}
			</div>
		)
	}

	if (!questions?.length) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='bg-card my-5 flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 text-center sm:my-8 sm:p-8'
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2 }}
			className='grid gap-4 sm:gap-6'
		>
			{questions?.map((question, index) => (
				<motion.div
					key={question.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<QuestionCard
						question={question}
						onTagClick={onTagClick}
						selectedTagIds={selectedTagIds}
					/>
				</motion.div>
			))}
		</motion.div>
	)
}
