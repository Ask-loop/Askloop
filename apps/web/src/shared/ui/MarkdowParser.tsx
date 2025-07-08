import React from 'react'
import ReactMarkdown from 'react-markdown'

type MarkdownParserProps = {
	markdown: string
}

export const MarkdownParser = ({ markdown }: MarkdownParserProps) => {
	return <ReactMarkdown>{markdown}</ReactMarkdown>
}
