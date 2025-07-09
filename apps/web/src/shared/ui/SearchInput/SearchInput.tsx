'use client'

import { Search } from 'lucide-react'
import { Input } from '@/shared/shadcn/ui'

interface SearchInputProps {
	value?: string
	onChange: (value: string) => void
	placeholder?: string
	className?: string
}

export const SearchInput = ({
	value,
	onChange,
	placeholder = 'Search...',
	className
}: SearchInputProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<Input
			className={className}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			icon={<Search />}
			iconPosition='left'
		/>
	)
}
