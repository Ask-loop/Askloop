import { z } from 'zod'
import { passwordRegex } from '../regex'

export const newPasswordSchema = z.object({
	newPassword: z
		.string()
		.regex(passwordRegex, 'Invalid password')
		.min(1, 'Password is required')
})

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>
