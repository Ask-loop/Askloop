import { motion } from 'framer-motion'
import { Skeleton } from '@/shared/shadcn/ui/skeleton'

export const QuestionDetailSkeleton = () => {
	return (
		<div className='space-y-6'>
			<div className='space-y-3'>
				<Skeleton className='h-9 w-3/4' />
				<Skeleton className='h-4 w-48' />
			</div>

			<div className='bg-card border-border flex gap-4 rounded-sm p-3'>
				<div className='flex flex-col items-center gap-4 p-4'>
					<Skeleton className='h-6 w-6 rounded-full' />
					<Skeleton className='h-4 w-4' />
					<Skeleton className='h-6 w-6 rounded-full' />
				</div>

				<div className='flex-1 space-y-4'>
					<div className='space-y-2'>
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: i * 0.1 }}
							>
								<Skeleton
									className='h-4 w-full'
									style={{ width: `${100 - i * 10}%` }}
								/>
							</motion.div>
						))}
					</div>

					<div className='flex gap-2'>
						{[...Array(3)].map((_, i) => (
							<Skeleton
								key={i}
								className='h-6 w-16 rounded-full'
							/>
						))}
					</div>

					<div className='flex justify-between pt-4'>
						<Skeleton className='h-8 w-24 rounded-md' />
						<div className='flex items-center gap-2'>
							<Skeleton className='h-8 w-8 rounded-full' />
							<div className='space-y-1'>
								<Skeleton className='h-3 w-16' />
								<Skeleton className='h-3 w-24' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
