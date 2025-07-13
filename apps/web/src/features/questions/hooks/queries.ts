import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import {
	getQuestions,
	getTags,
	getQuestionBySlug,
	type GetQuestionsReq
} from '@/shared/api/question'
import { GetTagsReq } from '@/shared/types'

export const useGetQuestions = (params: GetQuestionsReq) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.questions(params),
		queryFn: () => getQuestions(params)
	})

	return { data, isLoading }
}

export const useGetQuestionBySlug = (slug: string) => {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: queryKeys.questionBySlug(slug),
		queryFn: () => getQuestionBySlug(slug),
		enabled: !!slug
	})

	return { data, isLoading, error, isError }
}

export const useGetTags = (params: GetTagsReq) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.tags(params),
		queryFn: () => getTags(params),
		enabled: !!params.search
	})

	return { data, isLoading }
}
