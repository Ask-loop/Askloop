import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { FaComment } from 'react-icons/fa'
import { Answer } from '@/shared/api/question'
import { Button, CardContent } from '@/shared/shadcn/ui'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

type AnswerCardProps = {
	answer: Answer
}

export const AnswerCard = ({ answer }: AnswerCardProps) => {
	return (
		<div className='flex-1'>
			<CardContent className='pt-6 pb-4'>
				<MarkdownParser markdown={answer.content} />

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className='mt-8 flex items-center justify-between'
				>
					<div className='bg-secondary/30 flex items-center gap-3 rounded-lg px-4 py-2'>
						<UserAvatar
							fallback={answer.user.displayName?.charAt(0)}
							src={answer.user?.picture}
							className='h-8 w-8'
						/>
						<div className='flex flex-col'>
							<span className='text-sm font-medium'>
								{answer.user?.displayName}
							</span>
							<span className='text-muted-foreground text-xs'>
								{formatDistanceToNow(answer.createdAt)} ago
							</span>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Button variant='ghost' size='sm'>
							<FaComment className='mr-2 h-4 w-4' />
							Add reply
						</Button>
					</div>
				</motion.div>
			</CardContent>
		</div>
	)
}
