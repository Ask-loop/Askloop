import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'
import Link from 'next/link'
import { FaArrowUp, FaComment, FaEye } from 'react-icons/fa'
import { Question } from '@/shared/api/question'
import { getPlainText } from '@/shared/lib/getPlainText'
import { cn, formatTimeAgo } from '@/shared/lib/utils'
import { Card, CardContent, CardFooter } from '@/shared/shadcn/ui/card'
import { Tag } from '@/shared/types/tag'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { ROUTES } from '@/constants'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

type QuestionCardProps = {
	question: Question
	onTagClick?: (tag: Tag) => void
	selectedTagIds?: number[]
}

export const QuestionCard = ({
	question,
	onTagClick,
	selectedTagIds
}: QuestionCardProps) => {
	const isTagSelected = (tag: Tag) => selectedTagIds?.includes(tag.id)

	return (
		<Card
			className={cn(
				'overflow-hidden rounded-sm transition-shadow duration-200 hover:shadow-md',
				question.viewed && 'border-border/50'
			)}
		>
			<CardContent className='grid gap-3'>
				<div className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-start'>
					<Link
						href={ROUTES.question.replace(':slug', question.slug)}
						className='group block'
					>
						<h3
							className={cn(
								'group-hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg',
								question.viewed && 'text-primary/70'
							)}
						>
							{question?.title}
						</h3>
					</Link>

					<div className='text-muted-foreground flex items-center gap-1 text-xs sm:text-sm'>
						<FaEye className='size-3 sm:size-4' />
						<span>{question?.views}</span>
					</div>
				</div>

				<MarkdownParser
					className='line-clamp-2 max-w-prose'
					markdown={getPlainText(question?.body)}
				/>

				<div className='flex flex-wrap gap-2'>
					{question?.tags?.map(tag => (
						<motion.button
							key={tag.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								onTagClick?.(tag)
							}}
							className={cn(
								'inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs transition-all',
								'border-muted-foreground/20 hover:border-primary/30',
								isTagSelected(tag)
									? 'bg-primary/10 text-primary border-primary/30'
									: 'bg-muted/50 hover:bg-muted',
								onTagClick && 'cursor-pointer'
							)}
						>
							<Hash className='size-3 flex-shrink-0' />
							<span className='line-clamp-1'>
								{tag?.name || ''}
							</span>
						</motion.button>
					))}
				</div>
			</CardContent>

			<CardFooter className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-center'>
				<div className='text-muted-foreground flex items-center gap-2 text-xs sm:text-sm'>
					<UserAvatar
						src={question?.user.picture}
						className='size-6 sm:size-8'
						fallback={question?.user?.displayName?.charAt(0)}
					/>
					<span className='line-clamp-1'>
						{question?.user?.displayName}
						&nbsp;•&nbsp;asked&nbsp;
						{formatTimeAgo(question?.createdAt)}
					</span>
				</div>

				<div className='flex items-center gap-3'>
					<div className='text-muted-foreground flex items-center gap-1 text-xs sm:text-sm'>
						<FaComment className='size-3 sm:size-4' />
						<span>{question?.answersCount}</span>
					</div>

					<div className='text-muted-foreground flex items-center gap-1 text-xs sm:text-sm'>
						<FaArrowUp className='size-3 sm:size-4' />
						<span>{question?.score}</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
