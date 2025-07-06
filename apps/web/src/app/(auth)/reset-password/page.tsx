import { Metadata } from 'next'
import { ResetPassword } from '@/features/auth/ui/ResetPassword'
import dictionary from '@/dictionary/en'

export const metadata: Metadata = {
	title: dictionary.resetPassword.title,
	description: dictionary.resetPassword.description
}

export default function ResetPasswordPage() {
	return <ResetPassword />
}
