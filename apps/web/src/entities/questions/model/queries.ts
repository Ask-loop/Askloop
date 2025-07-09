import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys'
import { getQuestionBySlug } from '@/shared/api/question'

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
