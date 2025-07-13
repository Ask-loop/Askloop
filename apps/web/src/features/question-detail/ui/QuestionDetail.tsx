'use client'

import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FaComment } from 'react-icons/fa'
import { QuestionVote } from '@/features/questions'
import { useGetQuestionBySlug } from '@/features/questions/hooks/queries'
import { Badge, Card, CardContent } from '@/shared/shadcn/ui'
import { Button } from '@/shared/shadcn/ui/button'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { QuestionDetailError } from './QuestionDetailError'
import { QuestionDetailSkeleton } from './QuestionDetailSkeleton'
import { QuestionRightBar } from './QuestionRightBar'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

export const QuestionDetail = () => {
	const { slug } = useParams()
	const {
		data: question,
		isLoading,
		isError
	} = useGetQuestionBySlug(slug as string)

	if (isLoading) return <QuestionDetailSkeleton />
	if (isError || !question) return <QuestionDetailError />

	return (
		<>
			<motion.h1
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='tracking-tigh text-3xl font-bold'
			>
				{question.title}
			</motion.h1>

			<div className='grid grid-cols-[75%_25%] gap-6'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className='space-y-6'
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='text-muted-foreground flex items-center gap-2 text-sm'
					>
						<span>
							Asked {formatDistanceToNow(question.createdAt)} ago
						</span>
						<span>•</span>
						<span>{question.views} views</span>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Card className='overflow-hidden'>
							<div className='flex gap-4'>
								<div className='bg-secondary/20 flex flex-col items-center p-4'>
									<QuestionVote votesQount={0} />
								</div>

								<div className='flex-1'>
									<CardContent className='pt-6 pb-4'>
										<div className='prose dark:prose-invert max-w-full break-words'>
											<MarkdownParser
												markdown={question.body}
											/>
										</div>

										{question.tags?.length > 0 && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.4 }}
												className='mt-6 flex flex-wrap gap-2'
											>
												{question.tags.map(tag => (
													<Badge
														key={tag.id}
														variant='secondary'
														className='hover:bg-secondary/80 cursor-pointer px-3 py-1 text-sm transition-colors'
													>
														{tag.name}
													</Badge>
												))}
											</motion.div>
										)}

										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.5 }}
											className='mt-8 flex items-center justify-between'
										>
											<div className='bg-secondary/30 flex items-center gap-3 rounded-lg px-4 py-2'>
												<UserAvatar
													fallback={question.user.displayName?.charAt(
														0
													)}
													src={question.user?.picture}
													className='h-8 w-8'
												/>
												<div className='flex flex-col'>
													<span className='text-sm font-medium'>
														{
															question.user
																?.displayName
														}
													</span>
													<span className='text-muted-foreground text-xs'>
														Asked{' '}
														{formatDistanceToNow(
															question.createdAt
														)}{' '}
														ago
													</span>
												</div>
											</div>

											<div className='flex items-center gap-3'>
												<Button
													variant='ghost'
													size='sm'
												>
													<FaComment className='mr-2 h-4 w-4' />
													Add comment
												</Button>
											</div>
										</motion.div>
									</CardContent>
								</div>
							</div>
						</Card>
					</motion.div>
				</motion.div>

				<QuestionRightBar />
			</div>
		</>
	)
}
