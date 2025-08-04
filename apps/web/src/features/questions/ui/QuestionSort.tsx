'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { QuestionSortBy } from '@/shared/api/question'
import { cn } from '@/shared/lib'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem
} from '@/shared/shadcn/ui'
import { Tabs, TabsList, TabsTrigger } from '@/shared/shadcn/ui/tabs'
import { useQuestionStore } from '../model'
import { SORT_OPTIONS } from '../model/constants'

export const QuestionSort = () => {
	const { sortBy, setSortBy } = useQuestionStore(
		useShallow(state => ({
			sortBy: state.sortBy,
			setSortBy: state.setSortBy
		}))
	)

	const primaryOptions = SORT_OPTIONS.slice(0, 3)
	const secondaryOptions = SORT_OPTIONS.slice(3)

	const handleChange = (value: string) => {
		setSortBy(value as QuestionSortBy)
	}

	const isSelectedFromSecondary = useMemo(() => {
		return secondaryOptions.some(option => option.value === sortBy)
	}, [sortBy])

	return (
		<Tabs value={sortBy} onValueChange={handleChange}>
			<TabsList>
				{primaryOptions.map(option => (
					<TabsTrigger
						key={option.value}
						value={option.value}
						className='px-3 py-1 text-sm data-[state=active]:shadow-sm'
					>
						{option.label}
					</TabsTrigger>
				))}

				{secondaryOptions.length && (
					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn(
								'text-foreground flex items-center gap-1 rounded-sm px-3 py-1 text-sm font-medium',
								isSelectedFromSecondary &&
									'bg-background shadow-sm'
							)}
						>
							More <ChevronDown className='h-4 w-4' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{secondaryOptions.map(option => (
								<DropdownMenuItem
									key={option.value}
									onClick={() => handleChange(option.value)}
									className={
										sortBy === option.value
											? 'bg-accent font-medium'
											: ''
									}
								>
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</TabsList>
		</Tabs>
	)
}
