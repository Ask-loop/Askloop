import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { GetQuestionsReq } from '@/shared/types/question'
import { GetTagsReq } from '@/shared/types/tag'
import { getQuestions, getTags } from '../../api/questons'

export const useGetQuestions = (params: GetQuestionsReq) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.questions(params),
		queryFn: () => getQuestions(params)
	})

	return { data, isLoading }
}

export const useGetTags = (params: GetTagsReq) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.tags(params),
		queryFn: () => getTags(params),
		enabled: !!params.search
	})

	return { data, isLoading }
}
