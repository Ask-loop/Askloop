import { z } from 'zod'
import { emailRegex, passwordRegex } from '../regex'

export const authSchema = z.object({
	email: z
		.string()
		.regex(emailRegex, 'Invalid email address')
		.min(1, 'Email is required'),
	password: z
		.string()
		.regex(passwordRegex, 'Invalid password')
		.min(1, 'Password is required')
})

export type AuthSchemaType = z.infer<typeof authSchema>
