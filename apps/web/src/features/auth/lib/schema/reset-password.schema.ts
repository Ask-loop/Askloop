import { z } from 'zod'
import { emailRegex } from '../regex'

export const resetPasswordSchema = z.object({
	email: z
		.string()
		.regex(emailRegex, 'Invalid email address')
		.min(1, 'Email is required')
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
