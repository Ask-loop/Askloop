import { z } from 'zod'
import { EMAIL_REGEX } from '../regex'

export const resetPasswordSchema = z.object({
	email: z
		.string()
		.regex(EMAIL_REGEX, 'Invalid email address')
		.min(1, 'Email is required')
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
