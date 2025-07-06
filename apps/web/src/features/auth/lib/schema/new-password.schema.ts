import { z } from 'zod'

export const newPasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.min(1, 'Password is required')
})

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>
