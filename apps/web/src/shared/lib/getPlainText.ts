export function getPlainText(markdown: string): string {
	if (!markdown) return ''
	let text = markdown.replace(/```[\s\S]*?```/g, '')
	text = text.replace(/`[^`]*`/g, '')
	text = text.replace(/[#>*_\-~[\]()>+`]/g, '')
	return text.trim()
}

export const hasTextBeforeCode = (markdown: string = ''): boolean => {
	if (!markdown) return false
	const codeBlockIndex = markdown.search(/```/)
	const codeBeforeText = getPlainText(
		codeBlockIndex >= 0 ? markdown.slice(0, codeBlockIndex) : markdown
	)
	return codeBeforeText.length >= 150
}
