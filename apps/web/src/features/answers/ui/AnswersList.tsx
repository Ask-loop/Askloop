import { motion } from 'framer-motion'
import { Card, Spinner } from '@/shared/shadcn/ui'
import { useAnswers } from '../hooks/queries'
import { AnswerForm } from './AnswerForm'
import { AnswerVote } from './AnswerVote'
import { AnswerCard } from '@/entities/answers'

type AnswersListProps = {
	questionId: number
}

export const AnswersList = ({ questionId }: AnswersListProps) => {
	const { answers, isLoading } = useAnswers(questionId)

	return (
		<div className='space-y-4'>
			{isLoading ? (
				<Spinner />
			) : !!answers?.length ? (
				answers?.map(answer => (
					<motion.div
						key={answer.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Card className='overflow-hidden'>
							<div className='flex gap-4'>
								<div className='bg-secondary/20 flex flex-col items-center p-4'>
									<AnswerVote />
								</div>

								<div className='flex-1'>
									<AnswerCard answer={answer} />
								</div>
							</div>
						</Card>
					</motion.div>
				))
			) : (
				<div className='flex items-center justify-center'>
					<p className='text-muted-foreground'>
						Be the first to answer this question
					</p>
				</div>
			)}

			<AnswerForm questionId={questionId} />
		</div>
	)
}
