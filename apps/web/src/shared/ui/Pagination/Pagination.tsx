'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Pagination as ShadcnPagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
	PaginationLink
} from '@/shared/shadcn/ui/pagination'

interface PaginationProps {
	currentPage?: number
	pageSize?: number
	total?: number
	onChange?: (page: number, pageSize: number) => void
	perPageOptions?: number[]
	isShowPerPage?: boolean
}

const DEFAULT_PER_PAGE_OPTIONS: [number, number, number] = [10, 20, 50]

const pageItemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
	active: { scale: 1.1, backgroundColor: 'hsl(var(--primary))' }
}

export const Pagination = ({
	currentPage = 1,
	pageSize = DEFAULT_PER_PAGE_OPTIONS[0],
	total = 0,
	onChange,
	perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
	isShowPerPage
}: PaginationProps) => {
	const totalPages = Math.ceil(total / pageSize)

	const getPageNumbers = () => {
		const pages: (number | string)[] = []

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 4) {
				pages.push(1, 2, 3, 4, 5, '...', totalPages)
			} else if (currentPage >= totalPages - 3) {
				pages.push(
					1,
					'...',
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages
				)
			} else {
				pages.push(
					1,
					'...',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'...',
					totalPages
				)
			}
		}
		return pages
	}

	const pages = useMemo(() => getPageNumbers(), [currentPage, totalPages])

	const handlePageChange = (page: number) => {
		onChange?.(page, pageSize)
	}

	const handlePageSizeChange = (size: number) => {
		onChange?.(1, size)
	}

	return (
		<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
			<ShadcnPagination className={cn(isShowPerPage && 'justify-start')}>
				<PaginationContent>
					<AnimatePresence initial={false}>
						{currentPage > 1 && (
							<motion.div
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={pageItemVariants}
								transition={{ duration: 0.2 }}
							>
								<PaginationItem>
									<PaginationPrevious
										onClick={() =>
											handlePageChange(currentPage - 1)
										}
									/>
								</PaginationItem>
							</motion.div>
						)}
					</AnimatePresence>

					<AnimatePresence mode='wait'>
						{pages.map((p, index) => (
							<motion.div
								key={`${p}-${index}`}
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={pageItemVariants}
								transition={{ duration: 0.2 }}
							>
								<PaginationItem>
									{p === '...' ? (
										<PaginationEllipsis />
									) : (
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<PaginationLink
												isActive={currentPage === p}
												onClick={handlePageChange?.bind(
													null,
													Number(p)
												)}
												className='rounded-md'
											>
												{p}
											</PaginationLink>
										</motion.div>
									)}
								</PaginationItem>
							</motion.div>
						))}
					</AnimatePresence>

					<AnimatePresence initial={false}>
						{currentPage < totalPages && (
							<motion.div
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={pageItemVariants}
								transition={{ duration: 0.2 }}
							>
								<PaginationItem>
									<PaginationNext
										onClick={() =>
											handlePageChange(currentPage + 1)
										}
									/>
								</PaginationItem>
							</motion.div>
						)}
					</AnimatePresence>
				</PaginationContent>
			</ShadcnPagination>

			{isShowPerPage && (
				<motion.div
					className='flex items-center justify-end gap-2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
				>
					<div className='flex gap-2'>
						{perPageOptions.map(size => (
							<motion.div
								key={size}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									size={'sm'}
									variant={
										size === pageSize
											? 'default'
											: 'outline'
									}
									onClick={() => handlePageSizeChange(size)}
								>
									{size}
								</Button>
							</motion.div>
						))}
					</div>
				</motion.div>
			)}
		</div>
	)
}
