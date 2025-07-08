import { useQuery } from '@tanstack/react-query'
import { getQuestionBySlug } from '@/features/questions/api'
import { queryKeys } from '@/shared/api/queryKeys'

export const useQuestion = (slug: string) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.question(slug),
		queryFn: () => getQuestionBySlug(slug)
	})

	return {
		question: data,
		isLoading
	}
}
