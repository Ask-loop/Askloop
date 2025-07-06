import { Layout } from '@/widgets/layout'

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <Layout>{children}</Layout>
}
