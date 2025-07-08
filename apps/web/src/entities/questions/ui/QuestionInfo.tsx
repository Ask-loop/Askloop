'use client'

import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import React from 'react'
import { BsFlag, BsPencil, BsShare } from 'react-icons/bs'
import {
	AvatarImage,
	AvatarFallback,
	Avatar,
	Button,
	Card,
	CardContent,
	CardFooter,
	Badge
} from '@/shared/shadcn/ui'
import { Question } from '@/shared/types/question'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { useQuestion } from '../model/queries'

type QuestionInfoProps = {
	question: Question
}

export const QuestionInfo = () => {
	const { slug } = useParams()
	const { question, isLoading } = useQuestion(slug as string)

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='space-y-4'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<motion.h1
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className='mb-2 text-2xl font-bold tracking-tight'
					>
						{question?.title}
					</motion.h1>
					<div className='text-muted-foreground flex items-center gap-2 text-sm'>
						<span>
							Asked
							{formatDistanceToNow(
								new Date(question?.createdAt ?? '')
							)}
							ago
						</span>
						<span>•</span>
						{/* TODO: add views */}
						<span>{0} views</span>
					</div>
				</div>
				<Button variant='outline' className='gap-2'>
					<BsShare className='h-4 w-4' />
					Share
				</Button>
			</div>

			<Card>
				<CardContent className='p-6'>
					<div className='max-w-full break-words'>
						<MarkdownParser markdown={question?.body ?? ''} />
					</div>

					<div className='mt-6 flex flex-wrap gap-2'>
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
				</CardContent>

				<CardFooter className='flex justify-between p-6 pt-0'>
					<div className='text-muted-foreground flex gap-4 text-sm'>
						<Button variant='ghost' size='sm' className='gap-2'>
							<BsPencil className='h-4 w-4' />
							Edit
						</Button>
						<Button variant='ghost' size='sm' className='gap-2'>
							<BsFlag className='h-4 w-4' />
							Flag
						</Button>
					</div>

					<div className='bg-muted/50 rounded-md px-4 py-2'>
						<div className='flex items-center gap-2'>
							<Avatar className='h-8 w-8'>
								<AvatarImage src={question?.user?.picture} />
								<AvatarFallback>
									{question?.user?.email?.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className='text-sm font-medium'>
									{question?.user?.email}
								</p>
								<p className='text-muted-foreground text-xs'>
									{0} reputation
								</p>
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
