import { Layout } from '@/processes/Layout/Layout'

export default function PublicLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <Layout>{children}</Layout>
}
