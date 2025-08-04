'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useGetQuestions } from '@/features/questions/hooks/queries'
import { useQuestionStore } from '@/features/questions/model'
import { QuestionSort } from '@/features/questions/ui/QuestionSort'
import { Badge } from '@/shared/shadcn/ui'
import { SortOption, Tag } from '@/shared/types'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { QuestionContainer } from './QuestionContainer'

export const QuestionsList = () => {
	const {
		page,
		limit,
		selectedTags,
		setPage,
		setLimit,
		setSelectedTags,
		sortBy
	} = useQuestionStore(
		useShallow(state => ({
			page: state.page,
			limit: state.limit,
			selectedTags: state.selectedTags,
			sortBy: state.sortBy,
			setSortBy: state.setSortBy,
			setPage: state.setPage,
			setLimit: state.setLimit,
			setSelectedTags: state.setSelectedTags
		}))
	)

	const selectedTagIds = useMemo(
		() => selectedTags.map(t => t.value),
		[selectedTags]
	)

	const { data, isLoading } = useGetQuestions({
		page,
		limit,
		tagIds: selectedTagIds.length > 0 ? selectedTagIds : undefined,
		sortBy
	})

	const handleTagClick = (tag: Tag) => {
		if (!selectedTagIds.includes(tag.id)) {
			setSelectedTags([
				...selectedTags,
				{ label: tag.name, value: tag.id }
			])
			setPage(1)
		}
	}

	const handlePaginationChange = (page: number, limit: number) => {
		setPage(page)
		setLimit(limit)
	}

	const handleTagRemove = (option: SortOption<number>) => {
		setSelectedTags(selectedTags.filter(tag => tag.value !== option.value))
	}

	return (
		<div className='grid gap-2 py-5 sm:gap-3'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='flex items-center justify-between'
			>
				<span className='text-muted-foreground text-sm'>
					Showing {data?.questions?.length || 0} of {data?.total || 0}{' '}
					questions
				</span>

				<QuestionSort />
			</motion.div>

			{!!selectedTags.length && (
				<div className='mb-2 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<span className='text-muted-foreground text-sm whitespace-nowrap'>
						Tagged with:
					</span>
					<div className='flex flex-wrap gap-2'>
						{selectedTags.map(tag => (
							<Badge
								variant='secondary'
								key={tag.value}
								className={
									'hover:bg-secondary/80 flex cursor-pointer items-center gap-1 text-xs transition-colors'
								}
								onClick={handleTagRemove.bind(null, tag)}
							>
								{tag.label}
								<X size={12} />
							</Badge>
						))}
					</div>
				</div>
			)}

			<QuestionContainer
				questions={data?.questions}
				selectedTagIds={selectedTagIds}
				onTagClick={handleTagClick}
				isLoading={isLoading}
			/>

			<Pagination
				currentPage={page}
				pageSize={limit}
				total={data?.total}
				onChange={handlePaginationChange}
				isShowPerPage
			/>
		</div>
	)
}
