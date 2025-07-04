import { Icon } from '@radix-ui/react-select'
import MDEditor, { ContextStore, commands } from '@uiw/react-md-editor'
import { ChangeEvent } from 'react'

type MarkdownEditorProps = {
	value: string
	onChange: (
		value?: string,
		event?: ChangeEvent<HTMLTextAreaElement>,
		state?: ContextStore
	) => void
	placeholder?: string
}

export const MarkdownEditor = ({
	value,
	onChange,
	placeholder
}: MarkdownEditorProps) => {
	return (
		<MDEditor
			className='border-input border'
			value={value}
			onChange={onChange}
			height={300}
			tabSize={2}
			data-color-mode='light'
			preview='edit'
			visibleDragbar={false}
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
			extraCommands={[commands.codePreview, commands.codeEdit]}
			textareaProps={{
				placeholder
			}}
		/>
	)
}
