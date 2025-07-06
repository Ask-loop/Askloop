export async function generateMetadata({
	params
}: {
	params: { id: string; slug: string }
}) {
	const { slug } = params

	return {
		title: `User ${slug}`,
		description: `User ${slug} profile`
	}
}

export default function UserProfilePage({
	params
}: {
	params: { id: string; slug: string }
}) {
	const { id, slug } = params

	return (
		<div>
			User Profile {id} {slug}
		</div>
	)
}
