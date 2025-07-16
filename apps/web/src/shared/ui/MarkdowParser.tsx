'use client'

import '@uiw/react-markdown-preview/markdown.css'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'
import { cn } from '../lib'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
	ssr: false
})

type MarkdownParserProps = {
	markdown: string
	className?: string
}

export const MarkdownParser = ({
	markdown,
	className
}: MarkdownParserProps) => {
	const { theme } = useTheme()

	return (
		<div
			data-color-mode={theme}
			className={cn(
				'prose dark:prose-invert max-w-[80ch] break-words',
				className
			)}
		>
			<MarkdownPreview
				remarkPlugins={[remarkGfm]}
				className='text-sm sm:text-base'
				source={markdown}
			/>
		</div>
	)
}
