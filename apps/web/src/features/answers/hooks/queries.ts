import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys'
import { getAnswersByQuestion } from '@/shared/api/question/question'

export const useAnswers = (questionId: number) => {
	const {
		data: answers,
		isLoading,
		refetch
	} = useQuery({
		queryKey: queryKeys.answersByQuestion(questionId),
		queryFn: () => getAnswersByQuestion(questionId)
	})

	return { answers, isLoading, refetch }
}
