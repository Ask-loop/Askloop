import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/shadcn/ui'
import { SortOption } from '@/shared/types'

type SortSelectProps<T> = {
	value: T
	onChange: (value: T) => void
	options: SortOption[]
	className?: string
}

export const SortSelect = <T extends string>({
	onChange,
	options,
	value,
	className
}: SortSelectProps<T>) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className={className}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map(option => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
