import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { GetTagsReq } from '@/shared/types/tag'
import { GetQuestionsReq } from '../api/question'

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
