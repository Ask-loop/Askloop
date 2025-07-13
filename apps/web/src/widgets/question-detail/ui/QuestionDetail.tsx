'use client'

import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import React from 'react'
import { QuestionVote } from '@/features/questions'
import { useGetQuestionBySlug } from '@/features/questions/hooks/queries'
import { Badge, Card, CardContent } from '@/shared/shadcn/ui'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

export const QuestionDetail = () => {
	const { slug } = useParams()
	const { data: question, isLoading } = useGetQuestionBySlug(slug as string)

	if (!question) {
		return 'Hello'
	}

	return (
		<div className='space-y-4'>
			<div>
				<motion.h1
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-2 text-2xl font-bold tracking-tight'
				>
					{question?.title}
				</motion.h1>
				<span>
					Asked
					{formatDistanceToNow(question?.createdAt ?? '')}
					ago
				</span>
				<span>•</span>
				<span>{question?.views} views</span>
			</div>

			<Card>
				<div className='flex gap-4 pl-3'>
					<QuestionVote votesQount={12} />
					<CardContent>
						<div className='max-w-full break-words'>
							<MarkdownParser markdown={question?.body ?? ''} />
						</div>

						<div className='mt-3 flex flex-wrap gap-2'>
							{question?.tags?.map(tag => (
								<Badge
									key={tag.id}
									variant='outline'
									className='hover:bg-secondary/80 cursor-pointer px-3 py-1 text-sm'
								>
									{tag.name}
								</Badge>
							))}
						</div>

						<div className='mt-3 flex w-full items-center gap-2'>
							<UserAvatar
								fallback={question?.user.displayName?.charAt(0)}
								src={question?.user?.picture}
							/>
							<div className='flex flex-col'>
								<span className='font-semibold'>
									{question?.user?.displayName ?? ''}
								</span>
								<span className='text-muted-foreground text-sm'>
									{`Asked ${formatDistanceToNow(question?.createdAt || '')} ago`}
								</span>
							</div>
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	)
}
