import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { Badge } from '@/shared/shadcn/ui'
import { Avatar } from '@/shared/shadcn/ui/avatar'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import { Question } from '@/shared/types/question'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { ROUTES } from '@/constants'

type QuestionCardProps = {
	question: Question
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
		>
			<Card className='overflow-hidden rounded-md'>
				<CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<div className='flex flex-col space-x-3'>
						<Avatar className='"h-9 w-9 sm:h-10 sm:w-10'>
							<AvatarImage src={question.user?.picture} />
							<AvatarFallback>
								{question.user?.email?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className='line-clamp-1 font-medium'>
								{question.user?.email}
							</p>

							<p className='text-muted-foreground text-xs sm:text-sm'>
								{formatDistanceToNow(
									new Date(question.createdAt)
								)}{' '}
								ago
							</p>
						</div>
					</div>
					<Badge
						variant='outline'
						className='mt-2 px-2 py-1 sm:mt-0 sm:px-3'
					>
						{0} answers
					</Badge>
				</CardHeader>
				<CardContent>
					<Link
						href={ROUTES.question.replace(':slug', question.slug)}
						className='line-clamp-1 font-medium'
					>
						{question.title}
					</Link>

					<div className='prose dark:prose-invert line-clamp-2'>
						<MarkdownParser markdown={question.body} />
					</div>

					<div className='mt-3 flex flex-wrap gap-2'>
						{question.tags?.map(tag => (
							<Badge
								key={tag.id}
								variant='secondary'
								className='hover:bg-secondary/80 px-2 text-xs sm:px-3 sm:text-sm'
							>
								{tag.name}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
