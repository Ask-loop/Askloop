import { z } from 'zod'
import { PASSWORD_REGEX } from '../regex'

export const newPasswordSchema = z.object({
	newPassword: z
		.string()
		.regex(PASSWORD_REGEX, 'Invalid password')
		.min(1, 'Password is required')
})

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>
