import { ViewQuestion } from '@/views/questions'

export const generateMetadata = async ({
	params
}: {
	params: Promise<{ slug: string }>
}) => {
	const { slug } = await params

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/questions/slug/${slug}`
	)

	const { data } = await response.json()

	return {
		title: data?.title,
		description: data?.title
	}
}

export default function QuestionPage() {
	return <ViewQuestion />
}
