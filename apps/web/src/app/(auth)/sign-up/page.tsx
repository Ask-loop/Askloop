import { Metadata } from 'next'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Sign Up'
}

export default function SignUpPage() {
	return <RegisterForm />
}
