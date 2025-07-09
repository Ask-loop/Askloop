import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { GetQuestionsReq } from '@/shared/types/question'
import { GetTagsReq } from '@/shared/types/tag'

export const useInvalidateQueries = () => {
	const queryClient = useQueryClient()

	const invalidateQuestions = (params: GetQuestionsReq) => {
		queryClient.invalidateQueries({ queryKey: queryKeys.questions(params) })
	}

	const invalidateTags = (params: GetTagsReq) => {
		queryClient.invalidateQueries({ queryKey: queryKeys.tags(params) })
	}

	return { invalidateQuestions, invalidateTags }
}
