import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'
import { MessageSquare, Eye } from 'lucide-react'
import Link from 'next/link'
import { formatTimeAgo } from '@/shared/lib/utils'
import { Avatar } from '@/shared/shadcn/ui/avatar'
import { Badge } from '@/shared/shadcn/ui/badge'
import { Card } from '@/shared/shadcn/ui/card'
import { Question } from '@/shared/types/question'
import { Tag } from '@/shared/types/tag'
import { MarkdownParser } from '@/shared/ui/MarkdowParser'
import { ROUTES } from '@/constants'

type QuestionCardProps = {
	question: Question
	onTagClick?: (tag: Tag) => void
	variant?: 'default' | 'compact'
}

export const QuestionCard = ({
	question,
	onTagClick,
	variant = 'default'
}: QuestionCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -2 }}
			transition={{ duration: 0.2 }}
		>
			<Card
				className={`bg-card hover:border-primary/30 overflow-hidden rounded-xl border ${variant === 'compact' ? 'p-4' : 'p-6'}`}
			>
				<div className='flex flex-col gap-4'>
					<div className='flex items-start justify-between gap-3'>
						<div className='flex items-center gap-3'>
							<Avatar className='h-8 w-8 sm:h-10 sm:w-10'>
								<AvatarImage
									src={
										question.user?.picture ||
										'/placeholder.svg'
									}
									alt={question.user?.email || 'User'}
								/>
								<AvatarFallback className='bg-primary/10 text-primary font-medium'>
									{question.user?.email
										?.charAt(0)
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>

							<div className='min-w-0 flex-1'>
								<p className='truncate text-sm font-medium'>
									{question.user?.displayName || 'Anonymous'}
								</p>
								<p className='text-muted-foreground text-xs'>
									{formatTimeAgo(question.createdAt)}
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<Badge
								variant='secondary'
								className='gap-1 px-2 py-1 text-xs'
							>
								<MessageSquare className='h-3 w-3' />
								<span>{0}</span>
							</Badge>
							{variant !== 'compact' && (
								<Badge
									variant='outline'
									className='gap-1 px-2 py-1 text-xs'
								>
									<Eye className='h-3 w-3' />
									<span>{0}</span>
								</Badge>
							)}
						</div>
					</div>

					<Link
						href={ROUTES.question.replace(':slug', question.slug)}
						className='group block space-y-2'
					>
						<h3
							className={`text-card-foreground group-hover:text-primary font-semibold transition-colors ${variant === 'compact' ? 'line-clamp-1 text-base' : 'line-clamp-2 text-lg'}`}
						>
							{question.title}
						</h3>

						{variant !== 'compact' && (
							<div className='prose prose-sm dark:prose-invert text-muted-foreground line-clamp-3'>
								<MarkdownParser markdown={question.body} />
							</div>
						)}
					</Link>

					{question.tags?.length > 0 && (
						<div className='flex flex-wrap gap-2'>
							{question.tags.map(tag => (
								<Badge
									key={tag.id}
									variant='destructive'
									onClick={e => {
										e.stopPropagation()
										onTagClick?.(tag)
									}}
								>
									{tag.name}
								</Badge>
							))}
						</div>
					)}
				</div>
			</Card>
		</motion.div>
	)
}
