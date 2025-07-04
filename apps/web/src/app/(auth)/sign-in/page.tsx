import { Metadata } from 'next'
import { LoginForm } from '@/features/auth/ui/LoginForm'

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign In'
}	

export default function SignInPage() {
	return <LoginForm />
}
