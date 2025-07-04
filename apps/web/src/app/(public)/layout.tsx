import { Layout } from '@/widgets/layout'

export default function PublicLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <Layout>{children}</Layout>
}
