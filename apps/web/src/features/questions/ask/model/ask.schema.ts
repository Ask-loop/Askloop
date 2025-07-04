import { z } from 'zod'

export const askQuestionSchema = z.object({
	title: z
		.string()
		.min(10, 'Title must be at least 10 characters')
		.max(100, 'Title must be less than 100 characters'),
	body: z
		.string()
		.min(20, 'Description must be at least 20 characters')
		.max(1000, 'Description must be less than 1000 characters'),
	tags: z
		.array(z.string())
		.min(1, 'Select at least 1 tag')
		.max(5, 'Select at most 5 tags')
})

export type AskQuestionInput = z.infer<typeof askQuestionSchema>
