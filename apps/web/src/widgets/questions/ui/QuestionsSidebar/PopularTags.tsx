'use client'

import { ChevronRight, RotateCw, X, Tag as TagIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useGetTags } from '@/features/questions/hooks/queries'
import { useQuestionStore } from '@/features/questions/model'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import { Tag, TagOrderBy } from '@/shared/types'
import { ROUTES } from '@/constants'
import { TagRow } from '@/entities/tags'

export const PopularTags = () => {
	const router = useRouter()

	const { setSelectedTags, selectedTags, setPage } = useQuestionStore(
		useShallow(state => ({
			selectedTags: state.selectedTags,
			setSelectedTags: state.setSelectedTags,
			setPage: state.setPage
		}))
	)

	const { data, isLoading, isError, refetch, isRefetching } = useGetTags({
		limit: 5,
		orderByTag: TagOrderBy.Popular,
		page: 1
	})

	const handleTagClick = (tag: Tag) => {
		if (selectedTags.some(option => option.value === tag.id)) {
			setSelectedTags(
				selectedTags.filter(option => option.value !== tag.id)
			)

			return
		}

		const tags = [...selectedTags, { label: tag?.name, value: tag?.id }]

		setSelectedTags(tags)
		setPage(1)
	}

	const handleViewAll = () => {
		router.push(ROUTES.tags)
	}

	const renderContent = () => {
		if (isLoading) {
			return (
				<div className='flex flex-col gap-3'>
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className='hover:bg-muted/50 flex items-center gap-3 rounded-md px-3 py-2 transition-colors'
						>
							<Skeleton className='h-5 w-5 rounded-full' />
							<Skeleton className='h-4 flex-1' />
							<Skeleton className='h-4 w-16 rounded-full' />
						</div>
					))}
				</div>
			)
		}

		if (isError) {
			return (
				<div className='flex flex-col items-center justify-center gap-3 py-4 text-center'>
					<div className='bg-destructive/10 rounded-full p-3'>
						<X className='text-destructive h-6 w-6' />
					</div>
					<p className='text-muted-foreground text-sm'>
						Couldn't load popular tags
					</p>
					<Button
						variant='outline'
						size='sm'
						onClick={() => refetch()}
						disabled={isRefetching}
						className='gap-2'
					>
						<RotateCw
							size={14}
							className={cn(
								'transition-transform',
								isRefetching && 'animate-spin'
							)}
						/>
						{isRefetching ? 'Refreshing...' : 'Try Again'}
					</Button>
				</div>
			)
		}

		if (!data?.tags || !data.tags.length) {
			return (
				<div className='flex flex-col items-center justify-center gap-3 py-6 text-center'>
					<div className='bg-muted rounded-full p-3'>
						<TagIcon className='text-muted-foreground h-6 w-6' />
					</div>
					<p className='text-muted-foreground text-sm'>
						No popular tags available
					</p>
				</div>
			)
		}

		return (
			<div className='flex flex-col gap-1'>
				{data.tags.map(item => (
					<TagRow
						key={item.id}
						tag={item}
						onClick={handleTagClick}
						isSelected={selectedTags.some(
							option => option.value === item.id
						)}
					/>
				))}
			</div>
		)
	}

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-base sm:text-lg'>
						Popular Tags
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent>{renderContent()}</CardContent>
			<CardFooter className='pt-0'>
				<Button
					variant='ghost'
					className='group w-full justify-between'
					onClick={handleViewAll}
					disabled={isLoading}
					size='lg'
				>
					<span>Browse all tags</span>
					<ChevronRight
						size={16}
						className='opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100'
					/>
				</Button>
			</CardFooter>
		</Card>
	)
}
