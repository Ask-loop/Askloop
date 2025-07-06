import { Metadata } from 'next'
import { OAuthSuccess } from '@/features/auth/ui/OAuthSuccess'

export const metadata: Metadata = {
	title: 'OAuth Callback',
	description: 'OAuth Callback',
	robots: {
		index: false,
		follow: false
	}
}

export default function OAuthCallbackPage() {
	return <OAuthSuccess />
}
