import { z } from 'zod'
import { getPlainText, hasTextBeforeCode } from '@/shared/lib/getPlainText'

export const askQuestionSchema = z.object({
	title: z
		.string()
		.min(10, 'Title must be at least 10 characters')
		.max(100, 'Title must be less than 100 characters'),
	body: z
		.string()
		.refine(value => {
			const plainText = getPlainText(value)
			return plainText.length >= 150
		}, 'Body must be at least 150 characters')
		.refine(
			value => hasTextBeforeCode(value),
			'Body must contain text before code blocks'
		),
	tagIds: z
		.array(z.string())
		.min(1, 'Select at least 1 tag')
		.max(5, 'Select at most 5 tags')
})

export type AskQuestionInput = z.infer<typeof askQuestionSchema>
