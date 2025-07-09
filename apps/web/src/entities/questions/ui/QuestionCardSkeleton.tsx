import { motion } from 'framer-motion'
import { Skeleton } from '@/shared/shadcn/ui'

export const QuestionCardSkeleton = () => {
	return (
		<motion.div className='space-y-4 rounded-sm border bg-white p-6'>
			<Skeleton className='h-5 w-3/4' />
			<Skeleton className='h-4 w-full' />
			<div className='flex gap-2'>
				{Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={i} className='h-6 w-16 rounded-full' />
				))}
			</div>

			<div className='flex items-center space-x-4'>
				<Skeleton className='h-10 w-10 rounded-full' />
				<Skeleton className='h-4 w-[200px]' />
				<Skeleton className='h-3 w-[150px]' />
			</div>
		</motion.div>
	)
}
