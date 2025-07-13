import Link from 'next/link'
import { FaArrowUp, FaEye } from 'react-icons/fa'
import { getPlainText } from '@/shared/lib/getPlainText'
import { formatTimeAgo } from '@/shared/lib/utils'
import { Button } from '@/shared/shadcn/ui'
import { Card, CardContent, CardFooter } from '@/shared/shadcn/ui/card'
import { Question } from '@/shared/types/question'
import { Tag } from '@/shared/types/tag'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { ROUTES } from '@/constants'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

type QuestionCardProps = {
	question: Question
	onTagClick?: (tag: Tag) => void
}

export const QuestionCard = ({ question, onTagClick }: QuestionCardProps) => {
	return (
		<Card className='overflow-hidden rounded-sm transition-shadow duration-200 hover:shadow-md'>
			<CardContent className='grid gap-3'>
				<div className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-start'>
					<Link
						href={ROUTES.question.replace(':slug', question.slug)}
						className='group block'
					>
						<h3 className='group-hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg'>
							{question.title}
						</h3>
					</Link>

					<div className='text-muted-foreground flex items-center gap-1 text-xs sm:text-sm'>
						<FaEye className='size-3 sm:size-4' />
						<span>{question.views}</span>
					</div>
				</div>

				<MarkdownParser
					className='line-clamp-2 max-w-prose'
					markdown={getPlainText(question.body)}
				/>

				<div className='flex flex-wrap gap-1 sm:gap-2'>
					{question.tags.map(tag => (
						<Button
							key={tag.id}
							variant='outline'
							size='sm'
							className='hover:border-primary hover:bg-primary/10 h-5 bg-transparent px-2 text-xs sm:h-6'
							onClick={() => onTagClick?.(tag)}
						>
							{tag.name}
						</Button>
					))}
				</div>
			</CardContent>

			<CardFooter className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-center'>
				<div className='text-muted-foreground flex items-center gap-2 text-xs sm:text-sm'>
					<UserAvatar
						src={question.user.picture}
						className='size-6 sm:size-8'
						fallback={
							question.user.displayName?.charAt(0) ??
							question.user.email?.charAt(0)
						}
					/>
					<span className='line-clamp-1'>
						{question.user.displayName ?? question.user.email}
						&nbsp;•&nbsp;asked&nbsp;
						{formatTimeAgo(question.createdAt)}
					</span>
				</div>

				<div className='text-muted-foreground flex items-center gap-1 text-xs sm:text-sm'>
					<FaArrowUp className='size-3 sm:size-4' />
					<span>{question.answersCount}</span>
				</div>
			</CardFooter>
		</Card>
	)
}
