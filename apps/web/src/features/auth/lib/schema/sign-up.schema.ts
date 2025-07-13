import { z } from 'zod'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../regex'

export const signUpSchema = z
	.object({
		displayName: z.string().min(1, 'Display name is required'),

		email: z
			.string()
			.regex(EMAIL_REGEX, 'Invalid email address')
			.min(1, 'Email is required'),

		password: z
			.string()
			.regex(PASSWORD_REGEX, 'Invalid password')
			.min(1, 'Password is required'),

		confirmPassword: z
			.string()
			.regex(PASSWORD_REGEX, 'Invalid password')
			.min(1, 'Password is required')
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
