'use client'

import { X } from 'lucide-react'
import { useState, useRef, KeyboardEvent, useMemo } from 'react'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/shadcn/ui/badge'
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandEmpty
} from '@/shared/shadcn/ui/command'

type TagOption = { label: string; value: number | string }

export type TagInputProps = {
	value: string[]
	options: TagOption[]
	onChange: (tags: string[]) => void
	onSearchChange: (search: string) => void
}

export function TagInput({
	value,
	options,
	onChange,
	onSearchChange
}: TagInputProps) {
	const [inputValue, setInputValue] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const filteredOptions = useMemo(
		() =>
			options.filter(
				option =>
					option.label
						.toLowerCase()
						.includes(inputValue.toLowerCase()) &&
					!value.some(v => v === option.value)
			),
		[inputValue, options, value]
	)

	const addTag = (tag: TagOption) => {
		if (!tag.label.trim() || value.some(v => v === tag.value)) return
		onChange([...value, tag.value.toString()])
		setInputValue('')
		setActiveIndex(0)
	}

	const removeTag = (tag: string) => {
		onChange(value.filter(t => t !== tag))
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const count = filteredOptions.length
		const isArrowKey = ['ArrowDown', 'ArrowUp'].includes(e.key)
		const isEnterKey = ['Enter', 'Tab', ','].includes(e.key)

		if (isEnterKey) {
			e.preventDefault()

			if (!inputValue.trim()) return

			const matchedOption = filteredOptions.find(option =>
				option.label.toLowerCase().includes(inputValue.toLowerCase())
			)

			if (matchedOption) {
				addTag(matchedOption)
			} else {
				addTag({ label: inputValue, value: inputValue })
			}

			return
		}

		if (isArrowKey && count > 0) {
			e.preventDefault()
			setActiveIndex(prev =>
				e.key === 'ArrowDown'
					? (prev + 1) % count
					: (prev - 1 + count) % count
			)
			return
		}

		if (e.key === 'Backspace' && !inputValue && value.length > 0) {
			removeTag(value[value.length - 1]!)
		}
	}

	const addedTags = useMemo(() => {
		return options.filter(option => value.includes(option.value.toString()))
	}, [options, value])

	return (
		<div
			className={cn(
				'bg-background flex min-h-[2.25rem] w-full flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm',
				'focus-within:ring-ring/50 focus-within:ring-offset-ring focus-within:ring-[3px]',
				'border-input'
			)}
		>
			{addedTags.map(tag => (
				<Badge
					key={tag.value}
					variant='outline'
					className='flex items-center gap-1 rounded-md p-0 pl-1 text-sm'
				>
					{tag.label}
					<button
						type='button'
						className='hover:bg-muted cursor-pointer p-1'
						onClick={removeTag.bind(null, tag.value.toString())}
					>
						<X className='text-muted-foreground h-3 w-3' />
					</button>
				</Badge>
			))}

			<div className='relative min-w-[120px] flex-1'>
				<input
					ref={inputRef}
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
						setActiveIndex(0)
						onSearchChange(e.target.value)
					}}
					onKeyDown={handleKeyDown}
					className='border-0 outline-none'
					placeholder={'Type and press Enter…'}
				/>

				{inputValue && (
					<div className='bg-popover absolute z-10 mt-1 w-full rounded-md border shadow-md'>
						<Command>
							<CommandList>
								{!filteredOptions.length ? (
									<CommandEmpty>No suggestions</CommandEmpty>
								) : (
									<CommandGroup>
										{filteredOptions.map((tag, i) => (
											<CommandItem
												key={tag.label}
												onSelect={() => addTag(tag)}
												className={cn(
													'cursor-pointer',
													i === activeIndex &&
														'bg-accent text-accent-foreground'
												)}
											>
												{tag.label}
											</CommandItem>
										))}
									</CommandGroup>
								)}
							</CommandList>
						</Command>
					</div>
				)}
			</div>
		</div>
	)
}
