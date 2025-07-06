import { Metadata } from 'next'
import { NewPassword } from '@/features/auth/ui/NewPassword'
import dictionary from '@/dictionary/en'

export const metadata: Metadata = {
	title: dictionary.newPassword.title,
	description: dictionary.newPassword.description
}

export default function NewPasswordPage() {
	return <NewPassword />
}
