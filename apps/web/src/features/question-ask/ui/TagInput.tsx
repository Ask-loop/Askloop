'use client'

import { X } from 'lucide-react'
import { useState, useRef, KeyboardEvent, useMemo } from 'react'
import { cn } from '@/shared/lib/utils'
import { FormControl, FormMessage } from '@/shared/shadcn/ui'
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
	error?: string
}

export function TagInput({
	value,
	options,
	onChange,
	onSearchChange,
	maxTags = 5,
	error
}: TagInputProps) {
	const [inputValue, setInputValue] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const [selectedOptions, setSelectedOptions] = useState<TagOption[]>([])

	const selectedTags = useMemo(() => {
		return value.map(tagId => {
			const tag = selectedOptions.find(
				tag => tag.value.toString() === tagId
			)
			return tag || { label: tagId, value: tagId }
		})
	}, [value, selectedOptions])

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
		const tagId = tag.value.toString()

		if (value.includes(tagId) || value.length >= maxTags) return

		onChange([...value, tagId])

		setSelectedOptions(prev => {
			const exists = prev.some(opt => opt.value.toString() === tagId)
			return exists ? prev : [...prev, tag]
		})
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
		<div>
			<FormControl>
				<div
					className={cn(
						'bg-secondary dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
						'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground file:text-foreground',
						'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
						'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
						error && 'aria-invalid'
					)}
					onClick={() => inputRef.current?.focus()}
				>
					<div className='flex flex-wrap gap-1'>
						{selectedTags.map(tag => (
							<Badge
								key={tag.value}
								variant='outline'
								className='flex items-center gap-1 rounded-md p-0 pl-1 text-sm'
							>
								{tag.label}
								<button
									type='button'
									className='hover:bg-accent text-muted-foreground cursor-pointer rounded-md p-1'
									onClick={e => {
										e.stopPropagation()
										removeTag(tag.value.toString())
									}}
								>
									<X className='text-muted-foreground h-3 w-3' />
								</button>
							</Badge>
						))}
					</div>

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
													{filteredOptions.map(
														(tag, i) => (
															<CommandItem
																key={tag.value}
																onSelect={() =>
																	addTag(tag)
																}
																className={cn(
																	'cursor-pointer',
																	i ===
																		activeIndex &&
																		'bg-accent text-accent-foreground'
																)}
															>
																{tag.label}
															</CommandItem>
														)
													)}
												</CommandGroup>
											)}
										</CommandList>
									</Command>
								</div>
							)}
						</div>
					)}
				</div>
			</FormControl>

			{error && <FormMessage>{error}</FormMessage>}
		</div>
	)
}
