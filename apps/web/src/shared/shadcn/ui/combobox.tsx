'use client'

import { X, Check, Plus } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/shared/lib/utils'
import { Badge } from './badge'
import { Button } from './button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from './command'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface TagInputProps {
	name: string
	options: { value: string; label: string }[]
	placeholder?: string
	maxTags?: number
	className?: string
	disabled?: boolean
}

export const TagInput = ({
	name,
	options,
	placeholder = 'Select tags...',
	maxTags = 5,
	className = '',
	disabled = false
}: TagInputProps) => {
	const { setValue, watch } = useFormContext()
	const tags = (watch(name) as string[]) || []
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const filteredOptions = options.filter(
		option =>
			option.label.toLowerCase().includes(searchValue.toLowerCase()) &&
			!tags.includes(option.value)
	)

	const addTag = (tagValue: string) => {
		if (tags.length >= maxTags) return
		if (!tags.includes(tagValue)) {
			setValue(name, [...tags, tagValue])
		}
		setSearchValue('')
		setOpen(false)
	}

	const removeTag = (tagValue: string) => {
		setValue(
			name,
			tags.filter(t => t !== tagValue)
		)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Backspace' && !searchValue && tags.length > 0) {
			const lastTag = tags[tags.length - 1]
			if (lastTag) removeTag(lastTag)
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className='border-input bg-background ring-offset-background flex w-full flex-1 flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm ring-offset-2'>
				{tags.map(tagValue => {
					const tagLabel =
						options.find(opt => opt.value === tagValue)?.label ||
						tagValue
					return (
						<Badge
							key={tagValue}
							variant='outline'
							className='flex items-center gap-1 pr-1'
						>
							{tagLabel}
							<button
								type='button'
								onClick={() => removeTag(tagValue)}
								className='hover:bg-accent ml-1 rounded-full'
								disabled={disabled}
								aria-label={`Remove tag ${tagLabel}`}
							>
								<X className='h-3 w-3' />
							</button>
						</Badge>
					)
				})}

				{tags.length < maxTags && (
					<PopoverTrigger asChild>
						<input
							placeholder='Search tags...'
							className='border-input bg-background ring-offset-background w-full flex-1 rounded-md border px-3 py-2 text-sm ring-offset-2'
						/>
					</PopoverTrigger>
				)}
			</div>

			<PopoverContent
				className='w-[var(--radix-popover-trigger-width)] p-0'
				align='start'
			>
				<Command shouldFilter={false}>
					<CommandList>
						<CommandEmpty>No tags found</CommandEmpty>
						<CommandGroup>
							{filteredOptions.map(option => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={() => addTag(option.value)}
									className='cursor-pointer'
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											tags.includes(option.value)
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
