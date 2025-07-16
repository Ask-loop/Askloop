import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys'
import { getQuestionBySlug } from '@/shared/api/question/question'
import { QuestionDetail } from '../model/types'

export const useGetQuestionBySlug = (slug: string) => {
	const { data, isLoading, error, isError } = useQuery<QuestionDetail>({
		queryKey: queryKeys.questionBySlug(slug),
		queryFn: () => getQuestionBySlug(slug),
		enabled: !!slug
	})

	return {
		question: data,
		isLoading,
		error,
		isError
	}
}
