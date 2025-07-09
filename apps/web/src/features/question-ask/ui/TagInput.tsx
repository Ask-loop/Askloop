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
	maxTags?: number
}

export function TagInput({
	value,
	options,
	onChange,
	onSearchChange,
	maxTags = 5
}: TagInputProps) {
	const [inputValue, setInputValue] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const selectedTags = useMemo(() => {
		return value
			.map(tagId => {
				const found = options.find(
					option => option.value.toString() === tagId
				)
				return found ? found : { label: tagId, value: tagId }
			})
			.filter(Boolean) as TagOption[]
	}, [value, options])

	const availableOptions = useMemo(() => {
		return options.filter(
			option => !value.includes(option.value.toString())
		)
	}, [options, value])

	const filteredOptions = useMemo(() => {
		return inputValue
			? availableOptions.filter(option =>
					option.label
						.toLowerCase()
						.includes(inputValue.toLowerCase())
				)
			: availableOptions
	}, [inputValue, availableOptions])

	const addTag = (tag: TagOption) => {
		if (value.length >= maxTags) return
		onChange([...value, tag.value.toString()])
		setActiveIndex(0)
		setInputValue('')
		onSearchChange('')
		inputRef.current?.focus()
	}

	const removeTag = (tagId: string) => {
		onChange(value.filter(id => id !== tagId))
		setActiveIndex(0)
		inputRef.current?.focus()
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const count = filteredOptions.length
		const isArrowKey = ['ArrowDown', 'ArrowUp'].includes(e.key)
		const isEnterKey = ['Enter', 'Tab', ','].includes(e.key)

		if (isEnterKey) {
			e.preventDefault()

			if (!inputValue.trim() && count > 0) {
				const tag = filteredOptions[activeIndex]
				if (tag) addTag(tag)
				return
			}

			if (count > 0 && filteredOptions[activeIndex]) {
				const tag = filteredOptions[activeIndex]
				if (tag) addTag(tag)
				return
			}

			const exactMatch = filteredOptions.find(
				option =>
					option.label.toLowerCase() === inputValue.toLowerCase()
			)
			if (exactMatch) {
				addTag(exactMatch)
				return
			}

			const partialMatch = filteredOptions.find(option =>
				option.label.toLowerCase().includes(inputValue.toLowerCase())
			)

			if (partialMatch) {
				addTag(partialMatch)

				return
			}

			if (inputValue.trim()) {
				addTag({ label: inputValue.trim(), value: inputValue.trim() })
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
			removeTag(value[value.length - 1]!.toString())
		}
	}

	return (
		<div
			className={cn(
				'bg-background flex min-h-[2.25rem] w-full flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm',
				'focus-within:ring-ring/50 focus-within:ring-offset-ring focus-within:ring-[3px]',
				'border-input'
			)}
			onClick={() => inputRef.current?.focus()}
		>
			{selectedTags.map(tag => (
				<Badge
					key={tag.value}
					variant='outline'
					className='flex items-center gap-1 rounded-md p-0 pl-1 text-sm'
				>
					{tag.label}
					<button
						type='button'
						className='hover:bg-muted cursor-pointer p-1'
						onClick={e => {
							e.stopPropagation()
							removeTag(tag.value.toString())
						}}
					>
						<X className='text-muted-foreground h-3 w-3' />
					</button>
				</Badge>
			))}

			{value.length < maxTags && (
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
						className='w-full border-0 bg-transparent outline-none'
						placeholder={
							value.length
								? 'Add another...'
								: 'Type and press Enter...'
						}
					/>

					{inputValue && (
						<div className='bg-popover absolute top-full left-0 z-10 mt-1 w-full rounded-md border shadow-md'>
							<Command>
								<CommandList>
									{!filteredOptions.length ? (
										<CommandEmpty>
											No tags found
										</CommandEmpty>
									) : (
										<CommandGroup>
											{filteredOptions.map((tag, i) => (
												<CommandItem
													key={tag.value}
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
			)}
		</div>
	)
}
