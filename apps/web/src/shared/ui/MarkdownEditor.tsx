'use client'

import '@uiw/react-markdown-preview/markdown.css'
import MDEditor, { ContextStore, commands } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import { useTheme } from 'next-themes'
import { ChangeEvent } from 'react'
import { cn } from '../lib'
import { FormControl, FormMessage } from '../shadcn/ui'

type MarkdownEditorProps = {
	value: string
	onChange: (
		value?: string,
		event?: ChangeEvent<HTMLTextAreaElement>,
		state?: ContextStore
	) => void
	placeholder?: string
	className?: string
	error?: string
}

export const MarkdownEditor = ({
	value,
	onChange,
	placeholder,
	className,
	error
}: MarkdownEditorProps) => {
	const { theme } = useTheme()

	return (
		<div>
			<FormControl>
				<div
					className={cn(
						'bg-secondary dark:bg-input/30 border-input overflow-hidden rounded-md border text-base shadow-xs transition-[color,box-shadow] outline-none',
						'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground file:text-foreground',
						'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
						'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
						error && 'aria-invalid',
						className
					)}
				>
					<MDEditor
						value={value}
						onChange={onChange}
						height={300}
						preview='edit'
						visibleDragbar={false}
						className={cn(
							'bg-input! w-full rounded-md! border-none!',
							className
						)}
						tabSize={2}
						data-color-mode={theme === 'dark' ? 'dark' : 'light'}
						textareaProps={{
							placeholder
						}}
						commands={[
							commands.bold,
							commands.italic,
							commands.strikethrough,
							commands.hr,
							commands.divider,
							commands.quote,
							commands.codeBlock,
							commands.code,
							commands.link,
							commands.image,
							commands.table,
							commands.divider,
							commands.unorderedListCommand,
							commands.orderedListCommand
						]}
						extraCommands={[
							commands.codePreview,
							commands.codeEdit
						]}
					/>
				</div>
			</FormControl>

			{error && <FormMessage>{error}</FormMessage>}
		</div>
	)
}
