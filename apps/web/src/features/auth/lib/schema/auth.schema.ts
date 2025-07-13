import { z } from 'zod'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../regex'

export const authSchema = z.object({
	email: z
		.string()
		.regex(EMAIL_REGEX, 'Invalid email address')
		.min(1, 'Email is required'),
	password: z
		.string()
		.regex(PASSWORD_REGEX, 'Invalid password')
		.min(1, 'Password is required')
})

export type AuthSchemaType = z.infer<typeof authSchema>
